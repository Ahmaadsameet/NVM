from email.message import EmailMessage
import logging
import smtplib

from .settings import get_setting


logger = logging.getLogger(__name__)


class NotificationError(RuntimeError):
    """Raised when a form submission cannot be delivered by email."""


def send_notification(subject: str, body: str, reply_to: str) -> None:
    notification_recipient = get_setting("NWM_NOTIFICATION_EMAIL")
    smtp_host = get_setting("NWM_SMTP_HOST")
    smtp_username = get_setting("NWM_SMTP_USERNAME")
    smtp_password = get_setting("NWM_SMTP_PASSWORD")
    sender = get_setting("NWM_SMTP_SENDER") or smtp_username

    if not all((notification_recipient, smtp_host, smtp_username, smtp_password)):
        raise NotificationError(
            "Email delivery is not configured. Configure NWM_SMTP_HOST, "
            "NWM_SMTP_USERNAME, NWM_SMTP_PASSWORD, and NWM_NOTIFICATION_EMAIL."
        )

    try:
        smtp_port = int(get_setting("NWM_SMTP_PORT", "587"))
    except ValueError as error:
        raise NotificationError("NWM_SMTP_PORT must be a valid port number.") from error

    message = EmailMessage()
    message["Subject"] = subject
    message["From"] = sender
    message["To"] = notification_recipient
    message["Reply-To"] = reply_to
    message.set_content(body)

    try:
        with smtplib.SMTP(smtp_host, smtp_port, timeout=15) as smtp:
            smtp.starttls()
            smtp.login(smtp_username, smtp_password)
            smtp.send_message(message)
    except (OSError, smtplib.SMTPException) as error:
        logger.exception("Email notification failed for %s.", notification_recipient)
        raise NotificationError("The submission email could not be delivered.") from error
