from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    UserProfileView,
    ListUsersView,
    UpdateUserRoleView,
    DeleteUserView,
    request_password_reset,
    reset_password
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('request-password-reset/', request_password_reset, name='request-password-reset'),
    path('reset-password/', reset_password, name='reset-password'),

    # Admin only routes
    path('all/', ListUsersView.as_view(), name='all-users'),
    path('update-role/<int:pk>/', UpdateUserRoleView.as_view(), name='update-role'),
    path('delete/<int:pk>/', DeleteUserView.as_view(), name='delete-user'),
]
