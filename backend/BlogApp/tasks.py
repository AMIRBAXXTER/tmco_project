from celery import shared_task
from utils import send_admin_sms


@shared_task(bind=True, autoretry_for=(Exception,), retry_backoff=5, retry_kwargs={'max_retries': 3})
def send_new_blog_sms(self, title):
    text = f"مقاله جدید ثبت شد:\n{title}\nمنتظر تأیید"
    send_admin_sms(text)