from kavenegar import KavenegarAPI
from django.conf import settings

def send_admin_sms(title):
    try:
        api = KavenegarAPI(settings.KAVENEGAR_API_KEY)
        api.verify_lookup({
            'receptor': settings.ADMIN_PHONE_NUMBER,
            'template': 'blog-notif',
            'token': title,
            'type': 'sms'
        })
    except Exception as e:
        print("SMS Error:", e)
