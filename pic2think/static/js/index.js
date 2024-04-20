window.onload = function () {
  autoplay();
  changePreview();
};

function autoplay() {
  setTimeout(() => {
    document.getElementById("myAudio").play();
  }, 500);
}

function changePreview() {
  document.getElementById("id_image").addEventListener("change", function () {
    // Get the selected file
    var file = this.files[0];

    if (file) {
      var imageUrl = URL.createObjectURL(file);
      document.getElementById("uploaded-image").setAttribute("src", imageUrl);
    }
  });
}
