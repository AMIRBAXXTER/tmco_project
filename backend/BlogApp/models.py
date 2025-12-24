from autoslug import AutoSlugField
from django.utils.text import slugify
import re
from django.db import models
from tasks import send_new_blog_sms

def slugify_farsi(value):
    value = re.sub(r'[^ا-ی0-9A-Za-z\s-]', '', value)
    return slugify(value, allow_unicode=True)

class ApprovedBlogManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_approved=True)


class Blog(models.Model):

    title = models.CharField(max_length=200, verbose_name="عنوان")
    content = models.TextField(verbose_name="محتوا")
    slug = AutoSlugField(populate_from='title', unique=True, slugify=slugify_farsi, verbose_name="اسلاگ")
    image = models.ImageField(upload_to='images/', verbose_name="تصویر")
    category = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True, verbose_name="دسته بندی")
    reading_time = models.IntegerField(verbose_name="زمان خواندن")
    is_approved = models.BooleanField(
        default=False,
        verbose_name="تأیید شده"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ایجاد")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="تاریخ بروزرسانی")


    class Meta:
        verbose_name = "مقاله"
        verbose_name_plural = "مقالات"

    def __str__(self):
        return self.title

    objects = models.Manager()
    approved = ApprovedBlogManager()

    def save_model(self, request, obj, form, change):
        is_new = obj.pk is None

        super().save_model(request, obj, form, change)

        if is_new and not obj.is_approved:
            send_new_blog_sms.delay(obj.title)

class Category(models.Model):
    name = models.CharField(max_length=200, verbose_name="نام دسته بندی")

    class Meta:
        verbose_name = "دسته بندی"
        verbose_name_plural = "دسته بندی ها"

    def __str__(self):
        return self.name
