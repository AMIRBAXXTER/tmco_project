from .models import TariffFile
import pandas as pd

def read_latest_tariff_excel():
    latest = TariffFile.objects.last()
    if latest:
        return pd.read_excel(latest.file.path)
    return None

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