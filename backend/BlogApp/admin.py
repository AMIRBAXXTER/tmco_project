from django.contrib import admin
from .models import Blog, Category

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'category')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('title', 'content')
    ordering = ('-created_at',)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', )
    search_fields = ('name',)

