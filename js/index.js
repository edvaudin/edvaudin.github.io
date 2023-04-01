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
var slideRate = 2000;

function cycleBackgroundImages(images, targetElement) {
    let index = 0;
  
    function updateBackgroundImage() {
      index = (index + 1) % images.length;
      const imageUrl = images[index];
      targetElement.style.backgroundImage = `url(${imageUrl})`;
    }
  
    updateBackgroundImage();
  
    setInterval(updateBackgroundImage, (Math.random() + 1) * slideRate);
}

function fadeToNextImage(target){
    return new Promise(function (resolve, reject) {
        var delta = 0.01;
        var id = setInterval(changeOpacity, 10);
        function changeOpacity(){
            target.style.opacity -= delta;
            if (target.style.opacity <= 0){
                clearInterval(id);
                resolve();
            }
        }
    })
}

document.addEventListener("DOMContentLoaded", function() {
    const musicPanel = document.querySelector(".music-panel");
    const gamesPanel = document.querySelector(".games-panel");
    const softwarePanel = document.querySelector(".software-panel");
    cycleBackgroundImages(musicImages, musicPanel);
    cycleBackgroundImages(gamesImages, gamesPanel);
    cycleBackgroundImages(softwareImages, softwarePanel);
});

