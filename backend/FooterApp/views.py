from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.cache import cache

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
