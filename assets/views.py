from django.shortcuts import render
from rest_framework import generics, permissions, filters
from .models import Asset
from .serializers import AssetSerializer
from activity.models import ActivityLog
import qrcode
from django.core.files.base import ContentFile
from io import BytesIO

# Create asset (Admin only)
class CreateAssetView(generics.CreateAPIView):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        asset = serializer.save(created_by=self.request.user)
        generate_qr(asset)

        # Log activity
        ActivityLog.objects.create(
            user=self.request.user,
            action="Created Asset",
            details=f"Asset name: {serializer.validated_data.get('name')}"
        )


# List all assets
class ListAssetsView(generics.ListAPIView):
    queryset = Asset.objects.all().order_by('-created_at')
    serializer_class = AssetSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created_at', 'name']


# Update asset info (Admin only)
class UpdateAssetView(generics.UpdateAPIView):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        updated_asset = serializer.save()
        generate_qr(updated_asset)
        ActivityLog.objects.create(
            user=self.request.user,
            action="Updated Asset",
            details=f"Updated asset: {updated_asset.name}"
        )


def generate_qr(asset):
    qr = qrcode.make(f"https://your-domain.com/api/assets/{asset.id}/")
    stream = BytesIO()
    qr.save(stream, format="PNG")
    asset.qr_code.save(f"asset_{asset.id}_qr.png", ContentFile(stream.getvalue()))
