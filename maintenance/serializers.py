from rest_framework import serializers
from .models import MaintenanceRequest

class MaintenanceRequestSerializer(serializers.ModelSerializer):
	created_by_username = serializers.CharField(source='created_by.username', read_only=True)
	assigned_to_username = serializers.CharField(source='assigned_to.username', read_only=True)

	class Meta:
		model = MaintenanceRequest
		fields = '__all__'
		read_only_fields = ['created_by', 'status', 'created_at', 'updated_at']
