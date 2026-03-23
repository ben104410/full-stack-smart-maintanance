from rest_framework import permissions


class IsAdmin(permissions.BasePermission):
    """
    Permission to check if user is an admin
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'admin'
