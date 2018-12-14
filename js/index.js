



function body_onload(){
    var he = document.getElementById("anim");
    he.classList.remove("anim");
    setTimeout(function(){
        document.getElementById("link1").style.marginLeft = "0";
        setTimeout(function(){
            document.getElementById("link2").style.marginLeft = "0";
            setTimeout(function(){
                document.getElementById("link3").style.marginLeft = "0";
            },50);
        },100);
    },300);
    
    snowStorm.init();
}

