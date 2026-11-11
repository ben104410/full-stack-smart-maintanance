from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from maintenance.models import MaintenanceRequest
from assets.models import Asset
from notifications.models import Notification
from utils.email_service import send_notification
from users.permissions import IsAdmin # Import custom IsAdmin permission

User = get_user_model()

@api_view(['GET'])
@permission_classes([IsAdmin]) # Use custom IsAdmin permission
def dashboard_stats(request):
    """
    Aggregates high-level metrics for the administrator dashboard.
    """
    total_users = User.objects.count()
    technicians_count = User.objects.filter(role="technician").count()
    total_tasks = MaintenanceRequest.objects.count()
    pending_requests = MaintenanceRequest.objects.filter(status='pending').count()
    in_progress = MaintenanceRequest.objects.filter(status='in_progress').count()
    completed_tasks = MaintenanceRequest.objects.filter(status='completed').count()
    assigned = MaintenanceRequest.objects.filter(status='assigned').count()

    return Response({
        "total_users": total_users,
        "technicians": technicians_count,
        "total_technicians": technicians_count, # Support both key naming conventions
        "total_tasks": total_tasks,
        "total_requests": total_tasks,
        "pending_requests": pending_requests,
        "pending": pending_requests,
        "in_progress": in_progress,
        "completed_tasks": completed_tasks,
        "completed": completed_tasks,
        "assigned": assigned,
    })

@api_view(['GET'])
@permission_classes([IsAdmin]) # Use custom IsAdmin permission
def recent_tasks(request):
    """
    Retrieves a list of the 10 most recent maintenance activities.
    """
    tasks = MaintenanceRequest.objects.all().order_by('-created_at')[:10]

    data = [
        {
            "id": t.id,
            "title": t.title,
            "assigned_to": t.assigned_to.username if t.assigned_to else "Unassigned",
            "status": t.status or "pending",
            "created_at": t.created_at.strftime("%Y-%m-%d"),
        }
        for t in tasks
    ]

    return Response(data)

@api_view(['GET'])
@permission_classes([IsAdmin])
def admin_requests(request):
    """
    Returns all maintenance requests for the admin to manage.
    """
    requests = MaintenanceRequest.objects.all().order_by('-created_at')
    data = [
        {
            "id": r.id,
            "title": r.title,
            "description": r.description,
            "status": r.status or "pending",
            "priority": r.priority,
            "created_at": r.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "user": {"username": r.created_by.username},
            "asset": {"name": r.asset.name} if r.asset else None,
        }
        for r in requests
    ]
    return Response(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def assets_list(request):
    """
    Returns a list of all assets for selection in maintenance requests.
    """
    assets = Asset.objects.all()
    data = [
        {"id": a.id, "name": a.name, "category": a.category, "location": a.location}
        for a in assets
    ]
    return Response(data)

@api_view(['POST'])
@permission_classes([IsAdmin])
def create_asset(request):
    """
    Creates a new physical asset.
    """
    asset = Asset.objects.create(
        name=request.data.get('name'),
        category=request.data.get('category'),
        location=request.data.get('location'),
        condition=request.data.get('condition', 'Good')
    )
    return Response({"id": asset.id, "message": "Asset created successfully"}, status=201)

@api_view(['DELETE'])
@permission_classes([IsAdmin])
def delete_asset(request, pk):
    """
    Removes an asset from the system.
    """
    try:
        asset = Asset.objects.get(pk=pk)
        asset.delete()
        return Response({"message": "Asset deleted successfully"}, status=204)
    except Asset.DoesNotExist:
        return Response({"error": "Asset not found"}, status=404)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_requests(request):
    """
    Returns maintenance requests reported by the current user.
    """
    STATUS_COLORS = {
        "pending": "amber",
        "assigned": "blue",
        "in_progress": "indigo",
        "completed": "emerald",
        "rejected": "rose",
    }

    requests = MaintenanceRequest.objects.filter(created_by=request.user).order_by('-created_at')
    data = [
        {
            "id": r.id,
            "title": r.title,
            "description": r.description,
            "status": r.status,
            "priority": r.priority,
            "location": r.location,
            "status_color": STATUS_COLORS.get(r.status, "slate"),
            "created_at": r.created_at.strftime("%Y-%m-%d"),
            "asset_name": r.asset.name if r.asset else "General",
            "picture": r.image.url if r.image else None,
            "image": r.image.url if r.image else None,
        }
        for r in requests
    ]
    return Response(data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_request(request):
    """
    Creates a new maintenance request. Assets are now optional.
    """
    image_file = request.FILES.get('image') or None
    new_request = MaintenanceRequest.objects.create(
        title=request.data.get('title'),
        description=request.data.get('description'),
        asset_id=request.data.get('asset_id') or None,
        location=request.data.get('location', 'Unspecified'),
        created_by=request.user,
        priority=request.data.get('priority', 'Medium'),
        image=image_file,
        status='pending'
    )

    # Notify admins about the new pending request
    admins = User.objects.filter(role='admin')
    for admin in admins:
        Notification.objects.create(
            user=admin,
            message=f"New request submitted: {new_request.title}"
        )
        try:
            send_notification(
                admin.email,
                "New Maintenance Request",
                f"A new maintenance request '{new_request.title}' has been submitted at {new_request.location}."
            )
        except Exception as e:
            print(f"Email notification failed: {e}")

    return Response({"id": new_request.id, "message": "Request created successfully"}, status=201)

@api_view(['GET'])
@permission_classes([IsAdmin])
def users_list(request):
    """
    Returns all registered users and their primary assigned roles/groups.
    """
    is_admin_user = (
        getattr(request.user, "role", None) == "admin"
        or getattr(request.user, "is_staff", False)
        or getattr(request.user, "is_superuser", False)
    )
    if not is_admin_user:
        return Response({"error": "Not allowed"}, status=403)

    users = User.objects.all()
    data = [
        {
            "id": u.id,
            "username": u.username,
            "first_name": u.first_name,
            "last_name": u.last_name,
            "email": u.email,
            "role": u.role, # Use the custom role field
            "phone": getattr(u, "phone", "") or "",
            "department": getattr(u, "department", "") or "",
        }
        for u in users
    ]

    return Response(data)

    return Response(data)