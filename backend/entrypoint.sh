#!/bin/sh
set -e  # stop on error

if [ "$1" != "" ]; then
  echo "[$(date)] Running custom command: $@"
  exec "$@"
  exit 0
fi

echo "[$(date)] Apply migrations"
python manage.py makemigrations --no-input
python manage.py migrate

echo "[$(date)] Collect static files"
python manage.py collectstatic --no-input
python manage.py check

if [ "$PHASE_ENV" = "production" ]; then
    echo "[$(date)] Starting Gunicorn (Production Mode)"
    exec gunicorn config.wsgi:application \
      --bind 0.0.0.0:8000 \
      --workers 17 \
      --threads 2 \
      --timeout 120 \
      --max-requests 1000 \
      --max-requests-jitter 100
else
    echo "[$(date)] Starting Django Dev Server"
    exec python manage.py runserver 0.0.0.0:8000
fi
