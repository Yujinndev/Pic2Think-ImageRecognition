document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("video");
  const captureButton = document.getElementById("captureButton");
  const previewImage = document.getElementById("previewImage");
  const newCaptureButton = document.getElementById("newCaptureButton");
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const submitCapture = document.getElementById("submit-capture");

  function startVideo() {
    navigator.getUserMedia(
      { video: {} },
      (stream) => (video.srcObject = stream),
      (err) => console.error(err)
    );
  }

  startVideo();

  captureButton.addEventListener("click", () => {
    video.style.display = "none";
    previewImage.style.display = "block";
    captureButton.style.display = "none";
    newCaptureButton.style.display = "block";
    submitCapture.style.display = "block";

    captureAndPreview();
  });

  newCaptureButton.addEventListener("click", () => {
    video.style.display = "block";
    previewImage.style.display = "none";
    captureButton.style.display = "block";
    newCaptureButton.style.display = "none";
    submitCapture.style.display = "none";

    startVideo();
  });

  submitCapture.addEventListener("click", () => {
    send();
  });

  let imageData;
  function captureAndPreview() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    imageData = canvas.toDataURL("image/jpeg");
    // Display the captured image
    previewImage.src = imageData;
  }

  function send() {
    sendDataToDjango(imageData);
    window.location.href = "/result/";
  }

  function sendDataToDjango(imageDataURL) {
    fetch("/capture/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image_data: imageDataURL }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }
});
