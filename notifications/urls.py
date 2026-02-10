from django.urls import path

def _user_notifications_view(request, *args, **kwargs):
    from .views import UserNotificationsView
    return UserNotificationsView.as_view()(request, *args, **kwargs)

def _mark_as_read_view(request, pk, *args, **kwargs):
    from .views import mark_as_read
    return mark_as_read(request, pk, *args, **kwargs)

urlpatterns = [
    path('my/', _user_notifications_view),
    path('mark-read/<int:pk>/', _mark_as_read_view),
]
