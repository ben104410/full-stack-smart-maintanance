from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import ActivityLog
from .serializers import ActivityLogSerializer
from users.models import User
from maintenance.models import MaintenanceRequest
from assets.models import Asset

class ActivityLogView(generics.ListAPIView):
    serializer_class = ActivityLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only admins should see logs
        if self.request.user.role == "admin":
            return ActivityLog.objects.all().order_by('-timestamp')
        return ActivityLog.objects.none()


# Dashboard stats (Admin only)
@api_view(['GET'])
@permission_classes([permissions.IsAdminUser])
def dashboard_stats(request):
    data = {
        "total_requests": MaintenanceRequest.objects.count(),
        "pending_requests": MaintenanceRequest.objects.filter(status='pending').count(),
        "in_progress": MaintenanceRequest.objects.filter(status='in_progress').count(),
        "completed": MaintenanceRequest.objects.filter(status='completed').count(),
        "total_assets": Asset.objects.count(),
        "total_technicians": User.objects.filter(role='technician').count(),
        "total_users": User.objects.count(),
    }
    return Response(data)
