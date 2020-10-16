function initial_cards(n) {
    arrayRandom = new Array(n).fill().map((_e,i,_a) => Math.floor(i/2)+1);
    arrayRandom.forEach((_e, i, a) => { 
        let p = Math.floor(Math.random()*(n)); 
        [a[p], a[i]] = [a[i], a[p]];
    });
    return arrayRandom;
}

function MemoryGame(){
    var flipped="fas fa-question-circle";
    var icons= ["fab fa-amazon","fab fa-android","fab fa-apple","fab fa-google","fab fa-microsoft","fab fa-facebook-square"];
    var rand_icons = initial_cards(icons.length*2);

    for(let i=0; i<rand_icons.length; i++){
        $("#"+i).removeAttr("class");
        $("#"+i).addClass(flipped);
        document.getElementById(i).addEventListener('click', function(){
            $("#"+i).removeAttr("class");
            $("#"+i).addClass(icons[rand_icons[i]-1]);
        });
    }
}


/*let rand_icons = [3,3,2,2,1,1,4,4,5,5,6,6];
for(let i=0; i<12; i++){
    $("#"+i).removeAttr("class");
    $("#"+i).addClass(icons[rand_icons[i]-1]);
}*/