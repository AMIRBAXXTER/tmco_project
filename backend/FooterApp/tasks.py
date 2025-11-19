from datetime import date, timedelta
from celery import shared_task
from django.core.cache import cache

from .models import DailyView


@shared_task(queue="views_handler")
def update_daily_views():
    daily_views = cache.get("daily_views") or 0
    yesterday = date.today() - timedelta(days=1)
    DailyView.objects.create(date=yesterday, count=daily_views)
    cache.set("daily_views", 0)
