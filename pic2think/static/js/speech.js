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

      const textConditions = [
        {
          keyword: "hello",
          response: "Hi!",
        },
        {
          keyword: "hi",
          response: "Hello!",
        },
        { keyword: "bye", response: "Goodbye! Have a great day!" },
        {
          keyword: "weather",
          response:
            "The weather is very bad in La Union, it reaches about 43 degree heat index!",
        },
        {
          keyword: "source",
          response: "It is based on the Google Weather System",
        },
        {
          keyword: "how are you",
          response: "I am fine, Thanks for your concern!",
        },
        {
          keyword: "your name",
          response:
            "I'm an AI bot chat assistant created by Master Mark Eugene",
        },
        {
          keyword: "you do",
          response: "I can be your talk buddy for now",
        },
        {
          keyword: "joke",
          response:
            "Why do programmers prefer dark mode? Because light attracts bugs! HEHEHE",
        },
        // Add more conditions as needed
      ];

      for (let i = 0; i < textConditions.length; i++) {
        let condition = textConditions[i];
        if (text.includes(condition.keyword)) {
          let answer = condition.response;
          let responseLine = document.createElement("p");

          responseLine.classList.add("reply");
          responseLine.innerText = answer;
          texts.appendChild(responseLine);

          utterance = new SpeechSynthesisUtterance(answer);
          synth.speak(utterance);
          break;
        }
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
