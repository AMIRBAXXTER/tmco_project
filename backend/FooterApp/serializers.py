import jdatetime
from rest_framework import serializers
from .models import DailyView


class DailyViewsSerializer(serializers.ModelSerializer):
    persian_date = serializers.SerializerMethodField()

    class Meta:
        model = DailyView
        fields = ["count", "persian_date"]

    def get_persian_date(self, obj):
        jd = jdatetime.date.fromgregorian(date=obj.date)
        return jd.isoformat()
