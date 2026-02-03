from django.db import models
from django.conf import settings

class Asset(models.Model):
    STATUS_CHOICES = [
        ('working', 'Working'),
        ('damaged', 'Damaged'),
        ('under_repair', 'Under Repair'),
        ('retired', 'Retired')
    ]

    name = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    condition = models.CharField(max_length=50, choices=STATUS_CHOICES, default='working')
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to='assets/', null=True, blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='assets_created')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


