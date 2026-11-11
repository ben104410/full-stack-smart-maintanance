from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from users.views import LoginView # Import the custom login view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/', LoginView.as_view(), name='token_obtain_pair'), # Use custom login view
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Removed duplicate dashboard path, it's handled under api/maintenance/
    # path('api/dashboard/', dashboard_stats),
    path('api/users/', include('users.urls')),
    path('api/maintenance/', include('maintenance.urls')),
    path('api/assets/', include('assets.urls')),
    path('api/notifications/', include('notifications.urls')),
    path('api/activity/', include('activity.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
