from autoslug import AutoSlugField
from django.utils.text import slugify
import re
from django.db import models

def slugify_farsi(value):
    # حروف و فاصله‌ها و اعداد رو نگه می‌داره
    value = re.sub(r'[^ا-ی0-9A-Za-z\s-]', '', value)
    return slugify(value, allow_unicode=True)

class Blog(models.Model):

    title = models.CharField(max_length=200, verbose_name="عنوان")
    content = models.TextField(verbose_name="محتوا")
    slug = AutoSlugField(populate_from='title', unique=True, slugify=slugify_farsi, verbose_name="اسلاگ")
    image = models.ImageField(upload_to='images/', verbose_name="تصویر")
    category = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True, verbose_name="دسته بندی")
    reading_time = models.IntegerField(verbose_name="زمان خواندن")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ایجاد")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="تاریخ بروزرسانی")

    class Meta:
        verbose_name = "مقاله"
        verbose_name_plural = "مقالات"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.slug = slugify_farsi(self.title)
        super().save(*args, **kwargs)

class Category(models.Model):
    name = models.CharField(max_length=200, verbose_name="نام دسته بندی")

    class Meta:
        verbose_name = "دسته بندی"
        verbose_name_plural = "دسته بندی ها"

    def __str__(self):
        return self.name
