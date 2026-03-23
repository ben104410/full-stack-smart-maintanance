from django.urls import path
from .views import CreateRequestView, ListRequestsView, assign_technician, update_status, export_requests_csv, technician_analytics, monthly_analytics, chart_data
from .pdf_views import export_requests_pdf

urlpatterns = [
    path('create/', CreateRequestView.as_view()),
    path('all/', ListRequestsView.as_view()),
    path('assign/<int:pk>/', assign_technician),
    path('update-status/<int:pk>/', update_status),
    path('export/csv/', export_requests_csv),
    path('export/pdf/', export_requests_pdf),
    path('analytics/technicians/', technician_analytics),
    path('analytics/monthly/', monthly_analytics),
    path('analytics/charts/', chart_data),
]
