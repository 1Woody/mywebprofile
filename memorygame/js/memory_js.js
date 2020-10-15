function initial_cards(n) {
    arrayRandom = new Array(n).fill().map((_e,i,_a) => Math.floor(i/2)+1);
    arrayRandom.forEach((_e, i, a) => { 
        let p = Math.floor(Math.random()*(n)); 
        [a[p], a[i]] = [a[i], a[p]];
    });
    return arrayRandom;
}

function MemoryGame(){
    var icons= ["fab fa-amazon","fab fa-android","fab fa-apple","fab fa-google","fab fa-microsoft","fab fa-facebook-square"];
    let random_pos = initial_cards(icons.length*2);
    for(let i=0; i<12; i++){
        $("#"+i).removeAttr("class");
        $("#"+i).addClass(icons[random_pos[i]-1]);
    }
}
