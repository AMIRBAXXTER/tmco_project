from django.db import models
from datetime import date

class DailyView(models.Model):
    count = models.IntegerField(default=0)
    date = models.DateField(default=date.today)

    def __str__(self):
        return f"{self.date} - {self.count}"

    class Meta:
        verbose_name = "بازدید روزانه"
        verbose_name_plural = "بازدیدهای روزانه"