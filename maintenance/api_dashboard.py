from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from maintenance.models import MaintenanceRequest
from assets.models import Asset
from users.permissions import IsAdmin # Import custom IsAdmin permission

User = get_user_model()

@api_view(['GET'])
@permission_classes([IsAdmin]) # Use custom IsAdmin permission
def dashboard_stats(request):
    """
    Aggregates high-level metrics for the administrator dashboard.
    """
    total_users = User.objects.count()
    technicians = User.objects.filter(role="technician").count()
    total_tasks = MaintenanceRequest.objects.count()
    completed_tasks = MaintenanceRequest.objects.filter(status="completed").count()

    return Response({
        "total_users": total_users,
        "technicians": technicians,
        "total_tasks": total_tasks,
        "completed_tasks": completed_tasks,
    })

@api_view(['GET'])
@permission_classes([IsAdmin]) # Use custom IsAdmin permission
def recent_tasks(request):
    """
    Retrieves a list of the 10 most recent maintenance activities.
    """
    tasks = MaintenanceRequest.objects.order_by('-created_at')[:10]

    data = [
        {
            "title": t.title,
            "assigned_to": t.assigned_to.username if t.assigned_to else "Unassigned",
            "status": t.status,
            "created_at": t.created_at.strftime("%Y-%m-%d"),
        }
        for t in tasks
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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_requests(request):
    """
    Returns maintenance requests reported by the current user.
    """
    # Mapping professional colors to statuses
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
            "status": r.status,
            "status_color": STATUS_COLORS.get(r.status, "slate"),
            "created_at": r.created_at.strftime("%Y-%m-%d"),
            "asset_name": r.asset.name if r.asset else "General",
            "picture": r.picture if hasattr(r, 'picture') and r.picture else None
        }
        for r in requests
    ]
    return Response(data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_request(request):
    """
    Creates a new maintenance request from a staff member.
    """
    new_request = MaintenanceRequest.objects.create(
        title=request.data.get('title'),
        description=request.data.get('description'),
        asset_id=request.data.get('asset_id'),
        location=request.data.get('location', 'Unspecified'),
        created_by=request.user,
        priority=request.data.get('priority', 'Medium'),
        picture=request.data.get('picture')
    )
    return Response({"id": new_request.id, "message": "Request created successfully"}, status=201)

@api_view(['GET'])
@permission_classes([IsAuthenticated]) # Authenticated users can access, but role check inside
def users_list(request):
    """
    Returns all registered users and their primary assigned roles/groups.
    """
    if request.user.role != "admin":
        return Response({"error": "Not allowed"}, status=403)

    users = User.objects.all()
    data = [
        {
            "username": u.username,
            "email": u.email,
            "role": u.role, # Use the custom role field
        }
        for u in users
    ]

    return Response(data)