from celery import shared_task
from .utils import send_admin_sms


@shared_task(bind=True, queue='sms_handler', autoretry_for=(Exception,), retry_backoff=5, retry_kwargs={'max_retries': 3})
def send_new_blog_sms(self, id):
    send_admin_sms(id)