from django.db import models
from rest_framework.viewsets import ModelViewSet
from .models import Category, Blog
from .serializers import CategorySerializer, BlogSerializer


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class BlogViewSet(ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

    def get_queryset(self):
        queryset = Blog.objects.all()

        category = self.request.query_params.get('category')  # یا category_id
        search = self.request.query_params.get('search')

        if category:
            queryset = queryset.filter(category__name__icontains=category)

        if search:
            queryset = queryset.filter(
                models.Q(title__icontains=search) |
                models.Q(content__icontains=search)
            )

        return queryset.order_by('-created_at')
