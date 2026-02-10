from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/maintenance/', include('maintenance.urls')),
    path("assets/", include("assets.urls")),
    path('api/notifications/', include('notifications.urls')),
    path('api/activity/', include('activity.urls')),
    path("activity/", include("activity.urls")),
]
