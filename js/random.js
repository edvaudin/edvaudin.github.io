setTimeout(function(){
    var elem = document.getElementById("animation");
    elem.style.marginTop = "40vh";
}, 1000);
var min = document.getElementsByClassName("min")[0];
var max = documnet.getElementsByClassName("max")[0];
function getRndInteger(min, max) {
    return Math.floor(Math.random()*(max - min + 1) + min);
}
function result(){
    var displayResult = document.getElementsByClassName("result")[0];
    var result = getRndInteger(min, max);
    displayResult.textContent = result;
}