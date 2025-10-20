from django.urls import path
from .views import *

urlpatterns = [
    path('origins/', OriginListView.as_view(), name="origins"),
    path('destinations/', DestinationListView.as_view(), name="destinations"),
    path('calculate/', TariffCalculateView.as_view(), name='tariff-calculate'),

]
