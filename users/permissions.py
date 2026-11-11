from rest_framework import permissions


class IsAdmin(permissions.BasePermission):
    """
    Permission to check if user is an admin
    """
    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and (
                getattr(request.user, "role", None) == "admin"
                or getattr(request.user, "is_staff", False)
                or getattr(request.user, "is_superuser", False)
            )
        )


def is_admin(user):
    return user.role == "admin"


def is_technician(user):
    return user.role == "technician"


def is_staff(user):
    return user.role == "staff"
