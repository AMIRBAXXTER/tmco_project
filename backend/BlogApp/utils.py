import logging
from kavenegar import KavenegarAPI
from django.conf import settings

logger = logging.getLogger(__name__)

def send_admin_sms(title: str):
    if not settings.KAVENEGAR_API_KEY:
        raise RuntimeError("KAVENEGAR_API_KEY is not set")

    if not settings.ADMIN_PHONE_NUMBER:
        raise RuntimeError("ADMIN_PHONE_NUMBER is not set")
    new_title = title[:7] + "..."
    logger.warning("DEBUG TOKEN_LEN=%s TOKEN=%r", len(new_title), new_title)

    api = KavenegarAPI(settings.KAVENEGAR_API_KEY)

    params = {
        "receptor": settings.ADMIN_PHONE_NUMBER,
        "template": "blog-notif",
        "token": new_title,
        "type": "sms",
    }

    try:
        res = api.verify_lookup(params)
        logger.warning("Kavenegar verify_lookup response: %s", res)
        return res
    except Exception as e:
        logger.exception("Kavenegar verify_lookup failed. params=%s error=%r", params, e)
        raise
