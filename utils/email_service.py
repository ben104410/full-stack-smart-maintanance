from django.core.mail import send_mail
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


def send_notification(email, subject, message):
    try:
        from_email = getattr(settings, 'EMAIL_HOST_USER', None) or 'noreply@pwani.ac.ke'
        send_mail(
            subject,
            message,
            from_email,
            [email],
            fail_silently=True,
        )
    except Exception as e:
        logger.warning(f"Failed to send email to {email}: {e}")
