from django.urls import path
from .views import ListAssetsView, CreateAssetView, UpdateAssetView

urlpatterns = [
    path("", ListAssetsView.as_view(), name="assets-index"),
    path("all/", ListAssetsView.as_view(), name="list-assets"),
    path("create/", CreateAssetView.as_view(), name="create-asset"),
    path("update/<int:pk>/", UpdateAssetView.as_view(), name="update-asset"),
]
