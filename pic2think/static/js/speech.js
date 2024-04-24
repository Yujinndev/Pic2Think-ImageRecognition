document.addEventListener("DOMContentLoaded", () => {
  const texts = document.querySelector(".texts");
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;

  let newLine = document.createElement("p");
  const synth = window.speechSynthesis;

  recognition.addEventListener("result", (e) => {
    texts.appendChild(newLine);
    const text = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");

    newLine.innerText = text;

    if (e.results[0].isFinal) {
      let utterance;

      if (text.includes("how are you")) {
        var answer = "I am fine, Thanks for your concern!";
        var responseLine = document.createElement("p");

        responseLine.classList.add("replay");
        responseLine.innerText = answer;
        texts.appendChild(responseLine);

        utterance = new SpeechSynthesisUtterance(answer);
        synth.speak(utterance);
      } else if (text.includes("what's your name")) {
        var answer = "I'm an AI assistant created by Master Mark Eugene";
        var responseLine = document.createElement("p");

        responseLine.classList.add("replay");
        responseLine.innerText = answer;
        texts.appendChild(responseLine);

        utterance = new SpeechSynthesisUtterance(answer);
        synth.speak(utterance);
      }
      newLine = document.createElement("p");
    }
  });

  recognition.addEventListener("end", () => {
    recognition.start();
  });

  recognition.start();
  document.getElementById("recordingStatus").textContent =
    "Conversation Started";
});
