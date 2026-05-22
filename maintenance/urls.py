from django.urls import path
from . import views
from .api_dashboard import (
    dashboard_stats, 
    recent_tasks, 
    users_list,
    assets_list as api_assets_list,
    my_requests as api_my_requests
)
from .views import (
    CreateRequestView, 
    ListRequestsView,
    ListMyRequestsView,
    assign_technician, 
    update_status, 
    export_requests_csv, 
    technician_analytics, 
    monthly_analytics, 
    chart_data,
    my_tasks, # Import the new view
    CreateFeedbackView,
)
from .pdf_views import export_requests_pdf

urlpatterns = [
    path('create/', CreateRequestView.as_view()),
    path('all/', ListRequestsView.as_view()),
    path('my-tasks/', my_tasks, name='my-tasks'), # New endpoint for role-based tasks
    path('my-requests/', ListMyRequestsView.as_view()),
    path('assign/<int:pk>/', assign_technician),
    path('update-status/<int:pk>/', update_status),
    path('export/csv/', export_requests_csv),
    path('export/pdf/', export_requests_pdf),
    path('analytics/technicians/', technician_analytics),
    path('analytics/monthly/', monthly_analytics),
    path('analytics/charts/', chart_data),
    path('feedback/', CreateFeedbackView.as_view()),
    path('dashboard/', dashboard_stats, name='dashboard-stats'),
    path('tasks/recent/', recent_tasks, name='recent-tasks'),
    path('users/', users_list, name='users-list'),
    path("assets/", api_assets_list, name='api-assets-list'),
    path("requests/my/", api_my_requests, name='api-my-requests'),
]
