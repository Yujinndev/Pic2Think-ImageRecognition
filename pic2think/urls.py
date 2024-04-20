from django.urls import path
from pic2think import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", views.index, name="index"),
    path("result/", views.recognized, name="result"),
    path("upload/", views.file_upload, name="upload"),
    path("webcam/", views.live_cam, name="live"),
    path("capture/", views.handle_video, name="capture"),
]

if settings.DEBUG:
    urlpatterns += static("/images/", document_root=settings.STATICFILES_DIRS[0])
