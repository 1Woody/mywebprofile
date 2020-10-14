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
    let card = document.getElementsByClassName("fab");
    let cards = [...card];
    let random_pos = initial_cards(cards.length);
    for (let i=0; i<cards.length; i++){
        cards[i].setAttribute("class",icons[random_pos[i]-1]);
    }
}