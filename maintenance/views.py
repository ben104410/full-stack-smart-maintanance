from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import MaintenanceRequest
from .serializers import MaintenanceRequestSerializer
from django.contrib.auth import get_user_model
from notifications.models import Notification


User = get_user_model()

# 1. Submit Request (Staff or Student)
class CreateRequestView(generics.CreateAPIView):
    serializer_class = MaintenanceRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        request_obj = serializer.save(created_by=self.request.user)

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

    # Notify the assigned technician
    Notification.objects.create(
        user=technician,
        message=f"You have been assigned a maintenance task: {maintenance.title}"
    )

    return Response({"message": "Technician assigned successfully"})


# 4. Technician Updates Task
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def update_status(request, pk):
    try:
        task = MaintenanceRequest.objects.get(id=pk)
    except MaintenanceRequest.DoesNotExist:
        return Response({"error": "Task not found"}, status=404)

    # only assigned technician or admin can update status
    if request.user != task.assigned_to and not request.user.is_staff:
        return Response({"error": "Not authorized to update this task"}, status=403)

    new_status = request.data.get("status")

    if new_status not in ['in_progress', 'completed']:
        return Response({"error": "Invalid status"}, status=400)

    task.status = new_status
    task.save()

    # notify the requester about status change
    Notification.objects.create(
        user=task.created_by,
        message=f"Your maintenance request '{task.title}' is now {new_status.replace('_', ' ')}"
    )

    return Response({"message": "Status updated successfully"})


