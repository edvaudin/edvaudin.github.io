

setTimeout(function(){
    document.getElementById("link1").style.marginLeft = "0";
    setTimeout(function(){
        document.getElementById("link2").style.marginLeft = "0";
    },100);
},300);

function init(){
    var he = document.getElementById("anim");
    he.classList.remove("anim");
}