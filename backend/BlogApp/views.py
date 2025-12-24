from django.db import models
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Category, Blog
from .serializers import CategorySerializer, BlogSerializer
from .pagination import BlogPagination


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class BlogViewSet(ModelViewSet):
    queryset = Blog.approved.all()
    serializer_class = BlogSerializer
    pagination_class = BlogPagination

    def get_queryset(self):
        queryset = Blog.objects.all()

        category = self.request.query_params.get('category')
        search = self.request.query_params.get('search')

        if category:
            queryset = queryset.filter(category__name__icontains=category)

        if search:
            queryset = queryset.filter(
                models.Q(title__icontains=search) |
                models.Q(content__icontains=search)
            )

        return queryset.order_by('-created_at')

    @action(detail=False, methods=['get'], url_path='(?P<slug>[^/.]+)')
    def get_by_slug(self, request, slug=None):
        blog = get_object_or_404(Blog, slug=slug)
        serializer = self.get_serializer(blog)
        return Response(serializer.data)