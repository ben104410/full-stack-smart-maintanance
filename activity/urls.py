from django.urls import path
from .views import ActivityLogView, dashboard_stats

urlpatterns = [
    path('', ActivityLogView.as_view()),
    path('dashboard-stats/', dashboard_stats),
]