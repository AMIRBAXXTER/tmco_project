from django.urls import path, include
from rest_framework import routers
from .views import DailyViewsViewSet, AddViewsToRedis, track_package

router = routers.DefaultRouter()
router.register(r'daily-views', DailyViewsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('add-views/', AddViewsToRedis.as_view(), name='add-views'),
    path('track/<str:code>/', track_package, name='track-package'),
]
