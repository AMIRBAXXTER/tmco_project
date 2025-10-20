from rest_framework import serializers
from .models import TariffFile

class TariffFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TariffFile
        fields = ["id", "file", "uploaded_at"]
