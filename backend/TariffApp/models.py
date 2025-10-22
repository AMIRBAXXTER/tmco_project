import os

import pandas as pd
from django.core.cache import cache
from django.db import models


class TariffFile(models.Model):
    file = models.FileField(upload_to="tariffs/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-uploaded_at"]
        verbose_name = "تعرفه"
        verbose_name_plural = "تعرفه ها"

    def __str__(self):
        return f"TariffFile - {self.uploaded_at.strftime('%Y-%m-%d %H:%M')}"

    def delete(self, *args, **kwargs):
        self.file.delete()
        super().delete(*args, **kwargs)

    def save(self, *args, **kwargs):
        # مرحله ۱: ابتدا شیء ذخیره شود تا مسیر فایل ذخیره گردد
        super().save(*args, **kwargs)

        # مرحله ۲: مسیر فایل را بگیر و دیتا را بخوان
        path = self.file.path
        if not os.path.exists(path):
            return

        stat = os.stat(path)
        signature = f"{path}:{stat.st_mtime_ns}:{stat.st_size}"
        cache_key = f"tariff_excel_cache:{signature}"

        try:
            df = pd.read_excel(path)
            cache.set(cache_key, df, timeout=None)
            cache.set("tariff_excel_latest_key", cache_key, timeout=None)
        except Exception as e:
            return
