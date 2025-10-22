import os
import pandas as pd
from django.core.cache import cache
from .models import TariffFile


def read_latest_tariff_excel():
    latest_cache_key = cache.get("tariff_excel_latest_key")

    if latest_cache_key:
        df = cache.get(latest_cache_key)
        if df is not None:
            return df

    # fallback: فایل آخر را از DB بخوان و بکَش کن
    latest = TariffFile.objects.last()
    if not latest:
        return None

    path = latest.file.path
    if not os.path.exists(path):
        return None

    stat = os.stat(path)
    signature = f"{path}:{stat.st_mtime_ns}:{stat.st_size}"
    cache_key = f"tariff_excel_cache:{signature}"

    df = pd.read_excel(path)
    cache.set(cache_key, df, timeout=None)
    cache.set("tariff_excel_latest_key", cache_key, timeout=None)
    print("📁 خوانده شده از فایل و ذخیره در Cache:", cache_key)

    return df


WEIGHT_CLASSES = [
    (400, "پراید وانت"),
    (500, "پیکان وانت"),
    (600, "آریسان"),
    (800, "نیسان"),
    (1000, "کلاس 1"),
    (1500, "کلاس 2"),
    (2000, "کلاس 3"),
    (3000, "کلاس 6"),
    (4000, "کلاس 7"),
    (5000, "کلاس 8"),
    (6000, "کلاس 9"),
    (7000, "کلاس 10"),
    (10000, "کلاس 11"),
]
