from django.db import models

# Create your models here.

class ContactInfo(models.Model):
    title = models.CharField(max_length=200, verbose_name="عنوان")
    phone = models.CharField(max_length=200, verbose_name="شماره تماس")
    email = models.EmailField(verbose_name="ایمیل")
    address = models.CharField(max_length=200, verbose_name="آدرس")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ایجاد")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="تاریخ بروزرسانی")

    class Meta:
        verbose_name = "اطلاعات تماس"
        verbose_name_plural = "اطلاعات تماس"

    def __str__(self):
        return self.title

class Suggestion(models.Model):
    subjects = (
        ('suggestion', 'پیشنهاد'),
        ('complaint', 'انتقاد'),
        ('technical_support', 'پشتیبانی فنی'),
        ('question', 'سوال'),
        ('other', 'سایر'),

    )
    full_name = models.CharField(max_length=200, verbose_name="نام و نام خانوادگی")
    email = models.EmailField(verbose_name="ایمیل")
    subject = models.CharField(max_length=200, choices=subjects, verbose_name="موضوع")
    message = models.TextField(verbose_name="توضیحات")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ایجاد")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="تاریخ بروزرسانی")

    class Meta:
        verbose_name = "پیشنهاد"
        verbose_name_plural = "پیشنهادات"

    def __str__(self):
        return f"{self.full_name} - {self.subject}"