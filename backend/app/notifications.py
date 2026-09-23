from email.message import EmailMessage
import logging
import smtplib

from .settings import get_setting


logger = logging.getLogger(__name__)


def notifications_enabled() -> bool:
    return get_setting("NWM_NOTIFICATIONS_ENABLED", "false").lower() in {
        "1",
        "true",
        "yes",
        "on",
    }


def send_notification(subject: str, body: str) -> None:
    if not notifications_enabled():
        logger.info("Email notification skipped: notifications are disabled.")
        return

    notification_recipient = get_setting("NWM_NOTIFICATION_EMAIL")
    smtp_host = get_setting("NWM_SMTP_HOST")
    smtp_port = int(get_setting("NWM_SMTP_PORT", "587"))
    smtp_username = get_setting("NWM_SMTP_USERNAME")
    smtp_password = get_setting("NWM_SMTP_PASSWORD")
    sender = get_setting("NWM_SMTP_SENDER") or smtp_username

    if not all((notification_recipient, smtp_host, smtp_username, smtp_password)):
        logger.warning(
            "Email notification skipped: configure NWM_SMTP_HOST, "
            "NWM_SMTP_USERNAME, NWM_SMTP_PASSWORD, and "
            "NWM_NOTIFICATION_EMAIL."
        )
        return

    message = EmailMessage()
    message["Subject"] = subject
    message["From"] = sender
    message["To"] = notification_recipient
    message.set_content(body)

    try:
        with smtplib.SMTP(smtp_host, smtp_port, timeout=15) as smtp:
            smtp.starttls()
            smtp.login(smtp_username, smtp_password)
            smtp.send_message(message)
    except (OSError, smtplib.SMTPException):
        logger.exception("Email notification failed for %s.", notification_recipient)
