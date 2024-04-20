import io
import json
import os
import base64
import time
import numpy as np
import tensorflow as tf
from pic2think import forms
from django.conf import settings
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.base import ContentFile

current_image = os.path.join(settings.STATICFILES_DIRS[1], "captured_image.png")
model_path = os.path.join(settings.STATICFILES_DIRS[0], "classification.keras")
model = tf.keras.models.load_model(model_path)

class_labels = ["chicken", "tiger"]


def index(request):
    return render(request, "home.html", {})


def classify_image(image_name):
    static_dir = settings.STATICFILES_DIRS[0]
    image_path = os.path.join(static_dir, image_name)

    time.sleep(2)
    # Read the content of the uploaded file
    image_content = image_path.read()
    # Create an in-memory file-like object from the content
    image_stream = io.BytesIO(image_content)
    img = tf.keras.preprocessing.image.load_img(image_stream, target_size=(150, 150))
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0

    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions)

    result = class_labels[predicted_class]

    return result


def recognized(request):
    result = classify_image(current_image)

    return render(
        request, "result.html", {"class_result": result, "image": current_image}
    )


def file_upload(request):
    if request.method == "POST":
        form = forms.ImageUploadForm(request.POST, request.FILES)
        if form.is_valid():
            uploaded_image = form.save()

            global current_image
            current_image = uploaded_image.image.name

            return redirect("textOcr")

    else:
        form = forms.ImageUploadForm()
    return render(request, "upload_image.html", {"form": form})


def live_cam(request):
    return render(request, "webcam.html")


@csrf_exempt
def handle_video(request):
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
        image_data = data.get("image_data", "")

        # Decode base64 image data
        format, imgstr = image_data.split(";base64,")
        ext = format.split("/")[-1]
        image_data = ContentFile(base64.b64decode(imgstr), name=f"captured_image.{ext}")

        # Save the image to a specific folder
        static_dir = settings.STATICFILES_DIRS[1]
        save_path = os.path.join(static_dir, f"captured_image.{ext}")

        global current_image
        current_image = save_path

        with open(save_path, "wb") as f:
            f.write(image_data.read())

        return JsonResponse({"status": "success"})
    else:
        return JsonResponse({"status": "error", "message": "Invalid request method"})
