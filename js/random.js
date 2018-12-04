setTimeout(function(){
    var elem = document.getElementById("animation");
    elem.style.marginTop = "30vh";
}, 500);

function getRndInteger(min, max) {
    var min = parseInt(document.getElementById("min").value);
    var max = parseInt(document.getElementById("max").value);
    console.log(min);
    var displayResult = document.getElementsByClassName("result")[0];
    if (isNaN(min) || isNaN(max)){
        displayResult.innerHTML = "Enter a number in both fields."
    } else {
        var result = Math.floor(Math.random()*((max - min) + 1) + min);
        displayResult.innerHTML = result;
    }

}
