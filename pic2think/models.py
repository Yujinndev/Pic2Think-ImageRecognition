from django.db import models
from django.conf import settings


# Create your models here.
class UploadedImage(models.Model):
    image = models.ImageField(upload_to=settings.STATICFILES_DIRS[1])
    uploaded_at = models.DateTimeField(auto_now_add=True)
