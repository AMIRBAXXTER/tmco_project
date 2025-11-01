from django.urls import path, include
from rest_framework import routers
from .views import SuggestionViewSet

router = routers.DefaultRouter()
router.register(r'suggestions', SuggestionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
