from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import ActivityLog
from .serializers import ActivityLogSerializer
from users.models import User
from maintenance.models import MaintenanceRequest
from assets.models import Asset
from users.permissions import IsAdmin

class ActivityLogView(generics.ListAPIView):
    serializer_class = ActivityLogSerializer
    permission_classes = [IsAdmin]

    def get_queryset(self):
        return ActivityLog.objects.all().order_by('-timestamp')


# Dashboard stats (Admin only)
@api_view(['GET'])
@permission_classes([IsAdmin])
def dashboard_stats(request):
    total_tasks = MaintenanceRequest.objects.count()
    completed_tasks = MaintenanceRequest.objects.filter(status='completed').count()
    data = {
        "total_requests": total_tasks,
        "total_tasks": total_tasks,
        "pending_requests": MaintenanceRequest.objects.filter(status='pending').count(),
        "in_progress": MaintenanceRequest.objects.filter(status='in_progress').count(),
        "completed": completed_tasks,
        "completed_tasks": completed_tasks,
        "total_assets": Asset.objects.count(),
        "total_technicians": User.objects.filter(role='technician').count(),
        "technicians": User.objects.filter(role='technician').count(),
        "total_users": User.objects.count(),
        "completion_rate": round((completed_tasks / total_tasks * 100), 2) if total_tasks > 0 else 0
    }
    return Response(data)
