#!/bin/sh

echo "[$(date)] Apply migrations"
python manage.py makemigrations --no-input
python manage.py migrate

echo "[$(date)] Collect static files"
python manage.py collectstatic --no-input

echo "[$(date)] Django check"
python manage.py check


echo "[$(date)] Starting Development Server..."
exec python manage.py runserver 0.0.0.0:8000
