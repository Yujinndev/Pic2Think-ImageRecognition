# forms.py
from django import forms
from pic2think import models


class ImageUploadForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for visible in self.visible_fields():
            visible.field.widget.attrs["class"] = "form-control"

    class Meta:
        model = models.UploadedImage
        fields = ["image"]

    def clean_image(self):
        image = self.cleaned_data.get("image")
        if image:
            # Check if the file is an image
            allowed_types = ["image/jpeg", "image/png", "image/gif"]
            if image.content_type not in allowed_types:
                raise forms.ValidationError(
                    "File type is not supported. Please upload a valid image."
                )
        return image

    image = forms.ImageField(
        label="",
    )
