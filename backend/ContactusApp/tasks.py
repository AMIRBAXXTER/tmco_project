from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings


@shared_task(bind=True, queue='email_handler', autoretry_for=(Exception,), retry_backoff=30, retry_kwargs={"max_retries": 3})
def send_suggestion_email(self, data):
    subject = f"پیشنهاد جدید - {data['subject_label']}"

    message = f"""
پیشنهاد جدید ثبت شد:

نام و نام خانوادگی: {data['full_name']}
ایمیل: {data['email']}
شماره تماس: {data['phone_number']}
موضوع: {data['subject_label']}

متن پیام:
{data['message']}
"""

    send_mail(
        subject=subject,
        message=message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=["info@tmcopars.ir"],
        fail_silently=False,
    )
