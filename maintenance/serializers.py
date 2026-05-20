from rest_framework import serializers
from .models import MaintenanceRequest, Feedback

class MaintenanceRequestSerializer(serializers.ModelSerializer):
	created_by_username = serializers.CharField(source='created_by.username', read_only=True)
	assigned_to_username = serializers.CharField(source='assigned_to.username', read_only=True)
	asset_name = serializers.CharField(source='asset.name', read_only=True)

	class Meta:
		model = MaintenanceRequest
		fields = '__all__'
		read_only_fields = ['created_by', 'status', 'created_at', 'updated_at']

class FeedbackSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Feedback
        fields = ['id', 'user', 'username', 'category', 'rating', 'comment', 'created_at']
        read_only_fields = ['user', 'created_at']
