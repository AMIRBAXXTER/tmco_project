from django.db import models

# Create your models here.

class Customer(models.Model):
    company_name = models.CharField(max_length=200, verbose_name="نام شرکت")
    logo = models.ImageField(upload_to='logos/', verbose_name="لوگو")

    class Meta:
        verbose_name = "مشتری"
        verbose_name_plural = "مشتریان"

    def __str__(self):
        return self.company_name

class View(models.Model):
    ip_address = models.CharField(max_length=200, verbose_name="آدرس IP")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ایجاد")

    class Meta:
        verbose_name = "بازدید"
        verbose_name_plural = "بازدید ها"