setTimeout(function(){
    var elem = document.getElementById("animation");
    elem.style.marginTop = "40vh";
}, 1000);

function getRndInteger(min, max) {
    var min = document.getElementById("min").value;
    var max = document.getElementById("max").value;
    var result = Math.floor(Math.random()*(max - min + 1) + min);
    var displayResult = document.getElementsByClassName("result")[0];
    displayResult.innerHTML = result;
}
