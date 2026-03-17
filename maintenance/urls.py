from django.urls import path
from .views import CreateRequestView, ListRequestsView, assign_technician, update_status, export_requests_csv

urlpatterns = [
    path('create/', CreateRequestView.as_view()),
    path('all/', ListRequestsView.as_view()),
    path('assign/<int:pk>/', assign_technician),
    path('update-status/<int:pk>/', update_status),
    path('export/csv/', export_requests_csv),
]
