from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/maintenance/', include('maintenance.urls')),
#    path('api/assets/', include('assets.urls')),  # Temporarily disabled due to circular-import error
    path('api/notifications/', include('notifications.urls')),

]
