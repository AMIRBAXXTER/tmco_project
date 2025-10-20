from django.db import models

class TariffFile(models.Model):
    file = models.FileField(upload_to="tariffs/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-uploaded_at"]
        verbose_name = "تعرفه"
        verbose_name_plural = "تعرفه ها"

    def __str__(self):
        return f"TariffFile - {self.uploaded_at.strftime('%Y-%m-%d %H:%M')}"

    def delete(self, *args, **kwargs):
        self.file.delete()
        super().delete(*args, **kwargs)
