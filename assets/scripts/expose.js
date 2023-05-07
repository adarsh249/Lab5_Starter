// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO
  const hornSelector = document.getElementById("horn-select");
  const hornImageSelector = document.querySelector("img");
  const audioSelector = document.querySelector(".hidden");
  const audioButton = document.querySelector("button");
  const volumeSlider = document.getElementById("volume");
  const volumeIconSelector = document.getElementsByTagName("img")[1];
  const canvas = document.getElementById("main");
  const jsConfetti = new JSConfetti({ canvas });

  hornSelector.addEventListener("change", () => {
    hornImageSelector.src = "./assets/images/" + hornSelector.value + ".svg";
    audioSelector.src = "./assets/audio/" + hornSelector.value + ".mp3";
  });
  
  audioButton.addEventListener("click", () => {
    const audioPlay = new Audio(audioSelector.src);
    audioPlay.volume = volumeSlider.value / 100;
    audioPlay.play();
    if(hornSelector.value == "party-horn"){
      setTimeout(jsConfetti.addConfetti(), 400);
    }
  });

  volumeSlider.addEventListener("input", () => {
    let volumeLevel = volumeSlider.value;
    if(volumeLevel == 0){
      volumeIconSelector.src = "assets/icons/volume-level-0.svg";
    }
    else if (volumeLevel >= 1 && volumeLevel < 33){
      volumeIconSelector.src = "assets/icons/volume-level-1.svg";
    }
    else if (volumeLevel >= 33 && volumeLevel < 67){
      volumeIconSelector.src = "assets/icons/volume-level-2.svg";
    }
    else if (volumeLevel > 67){
      volumeIconSelector.src = "assets/icons/volume-level-3.svg";
    }
  });

  
}