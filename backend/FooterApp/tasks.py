import jdatetime
from celery import shared_task
from django.core.cache import cache

from .models import DailyView


@shared_task(queue="views_handler")
def update_daily_views():
    daily_views = cache.get("daily_views") or 0
    date = jdatetime.date.today() - jdatetime.timedelta(days=1)
    DailyView.objects.create(date=date, count=daily_views)
    cache.set("daily_views", 0)
