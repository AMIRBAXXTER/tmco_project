import jdatetime
from django.contrib import admin
from .models import DailyView


@admin.register(DailyView)
class DailyViewsAdmin(admin.ModelAdmin):
    list_display = ("persian_date", "count")

    def persian_date(self, obj):
        jd = jdatetime.date.fromgregorian(date=obj.date)
        return jd.strftime("%Y/%m/%d")  # اگر خواستی isoformat()

    persian_date.short_description = "تاریخ (شمسی)"
