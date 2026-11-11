from django.urls import path
from .views import ListAssetsView, CreateAssetView, UpdateAssetView, DeleteAssetView, DetailAssetView

urlpatterns = [
    path("", ListAssetsView.as_view(), name="assets-index"),
    path("all/", ListAssetsView.as_view(), name="list-assets"),
    path("create/", CreateAssetView.as_view(), name="create-asset"),
    path("<int:pk>/", DetailAssetView.as_view(), name="detail-asset"),
    path("update/<int:pk>/", UpdateAssetView.as_view(), name="update-asset"),
    path("delete/<int:pk>/", DeleteAssetView.as_view(), name="delete-asset"),
]
