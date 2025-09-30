from django.db import models

# Create your models here.

class Blog(models.Model):
    types = (
        ('achievement', 'دستاورد'),
        ('article', 'مقاله'),
    )
    title = models.CharField(max_length=200, verbose_name="عنوان")
    content = models.TextField(verbose_name="محتوا")
    image = models.ImageField(upload_to='images/', verbose_name="تصویر")
    category = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True, verbose_name="دسته بندی")
    reading_time = models.IntegerField(verbose_name="زمان خواندن")
    type = models.CharField(max_length=11, choices=types, verbose_name="نوع")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ایجاد")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="تاریخ بروزرسانی")

    class Meta:
        verbose_name = "مقاله"
        verbose_name_plural = "مقالات"

    def __str__(self):
        return self.title

class Category(models.Model):
    name = models.CharField(max_length=200, verbose_name="نام دسته بندی")

    class Meta:
        verbose_name = "دسته بندی"
        verbose_name_plural = "دسته بندی ها"

    def __str__(self):
        return self.name
