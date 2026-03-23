from reportlab.pdfgen import canvas
from django.http import HttpResponse
from .models import MaintenanceRequest
from users.permissions import IsAdmin
from rest_framework.decorators import api_view, permission_classes

@api_view(['GET'])
@permission_classes([IsAdmin])
def export_requests_pdf(request):
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="maintenance_report.pdf"'

    p = canvas.Canvas(response)

    p.setFont("Helvetica", 14)
    p.drawString(50, 800, "Maintenance Requests Report")

    p.setFont("Helvetica", 10)
    y = 770

    for req in MaintenanceRequest.objects.all():
        if y < 50:
            p.showPage()
            y = 800

        p.drawString(50, y, f"Title: {req.title}")
        p.drawString(50, y - 15, f"Status: {req.status}")
        p.drawString(50, y - 30, f"Asset: {req.asset.name if req.asset else 'N/A'}")
        p.drawString(50, y - 45, f"Created By: {req.created_by.username}")
        p.drawString(50, y - 60, f"Created At: {req.created_at.strftime('%Y-%m-%d')}")

        y -= 90

    p.showPage()
    p.save()
    return response