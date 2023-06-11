var musicImages = [
    "img/music-images/singed-reflection.png",
    "img/music-images/sirens.png",
    "img/music-images/nbi.jpg"
];
var gamesImages = [
    "img/games-images/artificial.png",
    "img/games-images/narcoscape.png",
    "img/games-images/sr.png"
];
var softwareImages = [
    "img/software-images/focusanger.jpg",
    "img/software-images/taskbot.png"
];
var slideRate = 5000;

function cycleBackgroundImages(images, targetElement) {
    let index = 0;
  
    function updateBackgroundImage() {
        fadeOutBackground(targetElement, 1000);
        index = (index + 1) % images.length;
        const imageUrl = images[index];
        targetElement.style.backgroundImage = `url(${imageUrl})`;
       fadeInBackground(targetElement, 1000);
    }
  
    updateBackgroundImage();
  
    setInterval(updateBackgroundImage, (Math.random() + 2) * slideRate);
}

// These do work but I need to put the background image underneath somehow.
function fadeOutBackground(targetElement, duration) {
    var opacity = 1;
    var intervalDuration = duration / 100;
    var interval = setInterval(function() {
      opacity -= 0.01;
      targetElement.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
      if (opacity <= 0) {
        clearInterval(interval);
      }
    }, intervalDuration);
  }
  
  function fadeInBackground(targetElement, duration) {
    var opacity = 1;
    var intervalDuration = duration / 100;
    var interval = setInterval(function() {
      opacity += 0.01;
      targetElement.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
      if (opacity >= 1) {
        clearInterval(interval);
      }
    }, intervalDuration);
  }

document.addEventListener("DOMContentLoaded", function() {
    const musicPanel = document.querySelector(".music-panel");
    const gamesPanel = document.querySelector(".games-panel");
    const softwarePanel = document.querySelector(".software-panel");
    cycleBackgroundImages(musicImages, musicPanel);
    cycleBackgroundImages(gamesImages, gamesPanel);
    cycleBackgroundImages(softwareImages, softwarePanel);
});

