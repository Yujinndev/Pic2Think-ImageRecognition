from django.urls import path
from pic2think import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", views.index, name="index"),
    path("result/", views.recognized, name="result"),
    path("upload/", views.file_upload, name="upload"),
    path("livecam/", views.live_cam, name="live"),
    path("liveclassification/", views.live_classification, name="live"),
    path("webcam/", views.webcam, name="webcam"),
    path("capture/", views.handle_video, name="capture"),
    path("mic/", views.open_mic, name="mic"),
]

if settings.DEBUG:
    urlpatterns += static("/audio/", document_root=settings.STATICFILES_DIRS[2])
