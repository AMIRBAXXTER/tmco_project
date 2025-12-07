from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.cache import cache
import requests
from django.http import JsonResponse

from .models import DailyView
from .serializers import DailyViewsSerializer

class DailyViewsViewSet(viewsets.ModelViewSet):
    queryset = DailyView.objects.all()
    serializer_class = DailyViewsSerializer


class AddViewsToRedis(APIView):
    def post(self, request):
        daily_key = "daily_views"
        total_key = "total_views"

        if cache.get(daily_key) is None:
            cache.set(daily_key, 0)
        if cache.get(total_key) is None:
            cache.set(total_key, 0)

        cache.incr(daily_key)
        cache.incr(total_key)

        return Response({"message": "Views added to Redis"})

    def get(self, request):
        daily_key = "daily_views"
        total_key = "total_views"

        daily_views = cache.get(daily_key) or 0
        total_views = cache.get(total_key) or 0

        return Response({"daily_views": daily_views, "total_views": total_views})


def track_package(request, code):
    url = f"https://core.tmcopars.ir/core/task/{code}"

    try:
        response = requests.get(url, timeout=20)

        try:
            data = response.json()
        except:
            return JsonResponse({"error": "Invalid JSON from remote API"}, status=500)

        return JsonResponse(data, safe=False, status=response.status_code)

    except requests.exceptions.RequestException:
        return JsonResponse({"error": "Failed to connect to tracking server"}, status=500)
