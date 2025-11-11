import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
app = Celery('tmco-project')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.conf.beat_schedule = {
    "daily-db-backup": {
        "task": "UserApp.tasks.backup_postgres_db",
        "schedule": crontab(hour="4", minute="0"),
    },
}

app.autodiscover_tasks()