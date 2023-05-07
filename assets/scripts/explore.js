// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {

  const voiceSelector = document.getElementById("voice-select");
  const talkButton = document.querySelector("button");
  const textToSpeak = document.getElementById("text-to-speak");
  const smileyFace = document.querySelector("img");
  function populateVoiceList() {
    if(typeof speechSynthesis === "undefined"){
      return;
    }

    const voices = speechSynthesis.getVoices();
    for(let i = 0; i < voices.length; i++){
      const option = document.createElement("option");
      option.textContent = voices[i].name + " (" + voices[i].lang + ")";
      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      option.value = voices[i].name;
      voiceSelector.appendChild(option);
    }
  }
  populateVoiceList();
  if(typeof speechSynthesis !== "undefined" && 
    speechSynthesis.onvoiceschanged !== undefined){
      speechSynthesis.onvoiceschanged = populateVoiceList;
  }
  talkButton.addEventListener("click", () => {
    const voices = speechSynthesis.getVoices();
    const utterThis = new SpeechSynthesisUtterance(textToSpeak.value);
    const selectedOption = voiceSelector.selectedOptions[0].getAttribute("data-name");
    for(let i = 0; i < voices.length; i++){
      if(voices[i].name === selectedOption){
        utterThis.voice = voices[i];
      }
    }
    utterThis.addEventListener("start", () => {
      smileyFace.src = "assets/images/smiling-open.png";
    });
    utterThis.addEventListener("end", () => {
      smileyFace.src = "assets/images/smiling.png";
    });

    speechSynthesis.speak(utterThis);
  });

}