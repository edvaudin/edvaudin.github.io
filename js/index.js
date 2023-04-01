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
var slideRate = 3000;

function cycleBackgroundImages(images, targetElement) {
    let index = 0;
  
    function updateBackgroundImage() {
      const imageUrl = images[index];
      targetElement.style.backgroundImage = "url(" + imageUrl + ")";
      index = (index + 1) % images.length;
    }
  
    updateBackgroundImage(); // Set initial background image
  
    setInterval(updateBackgroundImage, slideRate);
}

document.addEventListener("DOMContentLoaded", function() {
    const musicPanel = document.querySelector(".music-panel");
const gamesPanel = document.querySelector(".games-panel");
const softwarePanel = document.querySelector(".software-panel");
console.log(musicPanel);
    cycleBackgroundImages(musicImages, musicPanel);
    cycleBackgroundImages(gamesImages, gamesPanel);
    cycleBackgroundImages(softwareImages, softwarePanel);
});

