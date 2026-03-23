import csv
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.utils import timezone
from rest_framework import generics, permissions, filters
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.db.models import Count, Q
from django.db.models.functions import TruncMonth
from .models import MaintenanceRequest
from .serializers import MaintenanceRequestSerializer
from django.contrib.auth import get_user_model
from notifications.models import Notification
from activity.models import ActivityLog
from utils.email_service import send_notification
from users.permissions import IsAdmin
from datetime import timedelta


User = get_user_model()

# 1. Submit Request (Staff or Student)
class CreateRequestView(generics.CreateAPIView):
    serializer_class = MaintenanceRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        asset_id = self.request.data.get("asset")

        request_obj = serializer.save(
            created_by=self.request.user,
            asset_id=asset_id
        )

        # Log activity
        ActivityLog.objects.create(
            user=self.request.user,
            action="Created Maintenance Request",
            details=f"Request title: {request_obj.title}"
        )

        # Notify admin(s)
        admins = User.objects.filter(role='admin')
        for admin in admins:
            Notification.objects.create(
                user=admin,
                message=f"New maintenance request submitted: {request_obj.title}"
            )


# 2. List All Requests
class ListRequestsView(generics.ListAPIView):
    queryset = MaintenanceRequest.objects.all().order_by('-created_at')
    serializer_class = MaintenanceRequestSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created_at', 'status']


# 3. Assign Technician (Admin only)
@api_view(['POST'])
@permission_classes([permissions.IsAdminUser])
def assign_technician(request, pk):
    try:
        maintenance = MaintenanceRequest.objects.get(id=pk)
    except MaintenanceRequest.DoesNotExist:
        return Response({"error": "Request not found"}, status=404)

    tech_id = request.data.get("technician_id")
    technician = User.objects.filter(id=tech_id, role='technician').first()

    if not technician:
        return Response({"error": "Technician not found"}, status=404)

    maintenance.assigned_to = technician
    maintenance.status = 'assigned'
    maintenance.save()

    # Log activity
    ActivityLog.objects.create(
        user=request.user,
        action="Assigned Technician",
        details=f"Task: {maintenance.title} assigned to {technician.username}"
    )

    # Notify the assigned technician
    Notification.objects.create(
        user=technician,
        message=f"You have been assigned a maintenance task: {maintenance.title}"
    )

    # Send email notification
    send_notification(
        technician.email,
        "New Maintenance Task Assigned",
        f"You have been assigned a new task: {maintenance.title}"
    )

    return Response({"message": "Technician assigned successfully"})


# 4. Technician Updates Task
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def update_status(request, pk):
    task = get_object_or_404(MaintenanceRequest, pk=pk)

    # only assigned technician or admin can update status
    if request.user != task.assigned_to and not request.user.is_staff:
        return Response({"error": "Not authorized to update this task"}, status=403)

    new_status = request.data.get("status")

    if new_status not in ['in_progress', 'completed']:
        return Response({"error": "Invalid status"}, status=400)

    task.status = new_status

    # record timestamp when completed
    if new_status == "completed":
        task.completed_at = timezone.now()

    task.save()

    # Log activity
    ActivityLog.objects.create(
        user=request.user,
        action="Updated Task Status",
        details=f"Task: {task.title} status changed to {new_status.replace('_', ' ')}"
    )

    # notify the requester about status change
    Notification.objects.create(
        user=task.created_by,
        message=f"Your maintenance request '{task.title}' is now {new_status.replace('_', ' ')}"
    )

    return Response({"message": "Status updated successfully"})


# 5. Export maintenance requests to CSV (Admin only)
@api_view(['GET'])
@permission_classes([permissions.IsAdminUser])
def export_requests_csv(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="maintenance_requests.csv"'

    writer = csv.writer(response)
    writer.writerow(['Title', 'Status', 'Created By', 'Technician', 'Asset', 'Created At'])

    for req in MaintenanceRequest.objects.all():
        writer.writerow([
            req.title,
            req.status,
            req.created_by.username,
            req.assigned_to.username if req.assigned_to else '',
            req.asset.name if req.asset else '',
            req.created_at.strftime('%Y-%m-%d'),
        ])

    return response


def generate_technician_stats():
    technicians = User.objects.filter(role="technician").annotate(
        total_assigned=Count("assigned_tasks", distinct=True),
        completed=Count(
            "assigned_tasks",
            filter=Q(assigned_tasks__status="completed"),
            distinct=True,
        ),
        in_progress=Count(
            "assigned_tasks",
            filter=Q(assigned_tasks__status="in_progress"),
            distinct=True,
        ),
        pending=Count(
            "assigned_tasks",
            filter=Q(assigned_tasks__status="pending"),
            distinct=True,
        ),
    )

    results = []

    for tech in technicians:
        completed_tasks = MaintenanceRequest.objects.filter(
            assigned_to=tech,
            status="completed",
            completed_at__isnull=False,
        ).only("created_at", "completed_at")

        total_time = timedelta()
        completed_tasks_count = completed_tasks.count()

        for task in completed_tasks:
            total_time += (task.completed_at - task.created_at)

        completion_rate = (
            (tech.completed / tech.total_assigned) * 100
            if tech.total_assigned > 0
            else 0
        )

        avg_hours = (
            round(total_time.total_seconds() / 3600 / completed_tasks_count, 2)
            if completed_tasks_count > 0
            else None
        )

        results.append({
            "technician_id": tech.id,
            "technician_name": tech.username,
            "email": tech.email,
            "total_assigned": tech.total_assigned,
            "completed": tech.completed,
            "pending": tech.pending,
            "in_progress": tech.in_progress,
            "completion_rate": round(completion_rate, 1),
            "average_completion_time_hours": avg_hours,
        })

    # Ranking algorithm
    results.sort(
        key=lambda x: (
            -x["completion_rate"],
            x["average_completion_time_hours"] or 9999,
            -x["completed"],
        )
    )

    return results


# 6. Technician Analytics (Admin only)
@api_view(['GET'])
@permission_classes([IsAdmin])
def technician_analytics(request):
    return Response(generate_technician_stats())


# 7. Monthly Maintenance Request Analytics (Admin only)
@api_view(['GET'])
@permission_classes([IsAdmin])
def monthly_analytics(request):
    monthly_data = (
        MaintenanceRequest.objects
        .annotate(month=TruncMonth("created_at"))
        .values("month")
        .annotate(total=Count("id"))
        .order_by("month")
    )

    formatted = [
        {
            "month": item["month"].strftime("%Y-%m"),
            "total_requests": item["total"]
        }
        for item in monthly_data
    ]

    return Response(formatted)


# 8. Dashboard Chart Data (Admin only)
@api_view(['GET'])
@permission_classes([IsAdmin])
def chart_data(request):
    data = {}

    data["status_counts"] = {
        "pending": MaintenanceRequest.objects.filter(status="pending").count(),
        "in_progress": MaintenanceRequest.objects.filter(status="in_progress").count(),
        "completed": MaintenanceRequest.objects.filter(status="completed").count(),
    }

    asset_counts = {}
    for req in MaintenanceRequest.objects.filter(asset__isnull=False):
        asset_name = req.asset.name
        asset_counts[asset_name] = asset_counts.get(asset_name, 0) + 1

    data["requests_per_asset"] = asset_counts

    tech_load = {}
    for req in MaintenanceRequest.objects.filter(assigned_to__isnull=False):
        name = req.assigned_to.username
        tech_load[name] = tech_load.get(name, 0) + 1

    data["technician_load"] = tech_load

    return Response(data)
