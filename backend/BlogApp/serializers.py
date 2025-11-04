from rest_framework.serializers import ModelSerializer
from .models import Category, Blog


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class BlogSerializer(ModelSerializer):
    category = CategorySerializer()
    class Meta:
        model = Blog
        fields = '__all__'