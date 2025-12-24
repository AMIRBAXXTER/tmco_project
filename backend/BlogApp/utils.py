from kavenegar import KavenegarAPI
from django.conf import settings

def send_admin_sms(text):
    try:
        api = KavenegarAPI(settings.KAVENEGAR_API_KEY)
        api.sms_send({
            'receptor': settings.ADMIN_PHONE_NUMBER,
            'message': text,
        })
    except Exception as e:
        print("SMS Error:", e)
