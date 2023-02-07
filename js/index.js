function body_onload(){
    setTimeout(function(){
        document.getElementById("link1").style.marginLeft = "0";
        setTimeout(function(){
            document.getElementById("link2").style.marginLeft = "0";
            setTimeout(function(){
                document.getElementById("link3").style.marginLeft = "0";
            },50);
        },100);
    },300);

}

