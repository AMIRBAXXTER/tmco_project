import logging
import re
from kavenegar import KavenegarAPI
from django.conf import settings

logger = logging.getLogger(__name__)

def send_admin_sms(title: str):
    if not settings.KAVENEGAR_API_KEY:
        raise RuntimeError("KAVENEGAR_API_KEY is not set")

    if not settings.ADMIN_PHONE_NUMBER:
        raise RuntimeError("ADMIN_PHONE_NUMBER is not set")
    title = re.sub(r"\s+", " ", title)
    title = title.replace(" ", "\u200c")
    if len(title) > 10:
        title = title[:7] + "..."
    logger.warning("DEBUG TOKEN_LEN=%s TOKEN=%r", len(title), title)

    api = KavenegarAPI(settings.KAVENEGAR_API_KEY)

    params = {
        "receptor": settings.ADMIN_PHONE_NUMBER,
        "template": "blog-notif",
        "token": title,
        "type": "sms",
    }

    try:
        res = api.verify_lookup(params)
        logger.warning("Kavenegar verify_lookup response: %s", res)
        return res
    except Exception as e:
        logger.exception("Kavenegar verify_lookup failed. params=%s error=%r", params, e)
        raise
