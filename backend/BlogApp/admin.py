from django.contrib import admin
from .models import Blog, Category

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'is_approved', 'created_at', 'updated_at')
    list_filter = ('is_approved', 'created_at', 'updated_at')
    search_fields = ('title', 'content')
    ordering = ('-created_at',)

    def get_readonly_fields(self, request, obj=None):
        if not request.user.is_superuser:
            return ('is_approved',)
        return ()

    def save_model(self, request, obj, form, change):
        if not request.user.is_superuser:
            obj.is_approved = False
        super().save_model(request, obj, form, change)
