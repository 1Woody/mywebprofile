//Global var
var icons = ["fab fa-amazon","fab fa-android","fab fa-apple","fab fa-google","fab fa-microsoft","fab fa-facebook-square"];
var flipped_icon="fas fa-question-circle";
var cardMatrix = [];
var flip = [];
var wincount = 0;
var moves = 0;
var time =  0;

function initial_cards(n) {
    arrayRandom = new Array(n).fill().map((_e,i,_a) => Math.floor(i/2)+1);
    arrayRandom.forEach((_e, i, a) => { 
        let p = Math.floor(Math.random()*(n)); 
        [a[p], a[i]] = [a[i], a[p]];
    });
    return arrayRandom;
}

function DisplayCard(i){
    if (flip.length < 2){
        $("#"+i).removeAttr("class") && $("#"+i).addClass(cardMatrix[i]);
        flip.push(i);
        if (flip.length == 2) {
            moves = moves + 1;
            $('#moves').text("Moves: " + moves);
            setTimeout(function(){check();}, 500);
        }
    }
}

function check(){
    if (cardMatrix[flip[0]] != cardMatrix[flip[1]] || flip[0] == flip[1]){
        for (let i in flip){ 
            $("#"+flip[i]).removeAttr("class") && $("#"+flip[i]).addClass(flipped_icon);
        }
    } else{
        wincount++;
        $('#pairs').text("Pairs: " + wincount);
        if (wincount == 6){
            alert("Congrats!! You've won!!");
            location.reload();
        }
    }
    flip = [];
}

function MemoryGame(){
    Time();
    let rand_icons = initial_cards(icons.length*2);
    cardMatrix = [];
    flip = [];
    wincount = 0;
    for(let i in rand_icons){
        cardMatrix.push(icons[rand_icons[i]-1]);
    }
    for(let i in cardMatrix){
        $("#"+i).removeAttr("class") && $("#"+i).addClass(flipped_icon);
        document.getElementById(i).addEventListener('click', function(){
            DisplayCard(this.id);
        });
    }
}

function Time(){
    setInterval(function(){
        time++;
        let h, m, s;
        h=Math.floor(time/3600);
        m=Math.floor((time%3600)/60);
        s=time-h*3600-m*60;
        let text="Time: " + h + "h " + m + "m " + s +"s";
        $('#time').text(text);
      }, 1000)
}