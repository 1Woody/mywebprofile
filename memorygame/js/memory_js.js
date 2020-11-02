//Global var
var icons = ["fab fa-amazon","fab fa-android","fab fa-apple","fab fa-google",
            "fab fa-microsoft","fab fa-facebook-square", "fab fa-bitcoin", 
            "fab fa-css3-alt", "fab fa-firefox", "fab fa-internet-explorer"];
var flipped_icon="fas fa-question-circle";
var cardMatrix = [];
var flip = [];
var wincount = 0;
var moves = 0;
var time =  0;
var time_id = 0;
var mode = 6;

//inicialitza el vector de parelles random
function initial_cards(n) {
    arrayRandom = new Array(n).fill().map((_e,i,_a) => Math.floor(i/2)+1);
    arrayRandom.forEach((_e, i, a) => { 
        let p = Math.floor(Math.random()*(n)); 
        [a[p], a[i]] = [a[i], a[p]];
    });
    return arrayRandom;
}


//Modifica el valor del element de la taula per 
//mostrar el icone real, a més de comprovar els acerts
function DisplayCard(i){
    if (!$("#"+i).hasClass("done")){
        if (flip.length < 2){
            $("#"+i).removeAttr("class") && $("#"+i).addClass(cardMatrix[i]) && $("#"+i).addClass("listener");
            flip.push(i);
            if (flip.length == 2) {
                moves = moves + 1;
                $('#moves').text("Moves: " + moves);
                setTimeout(function(){check();}, 500);
            }
        }
    }
}

// Comprova el acerts quan es trucada per la funció DisplayCard
function check(){
    if (cardMatrix[flip[0]] != cardMatrix[flip[1]] || flip[0] == flip[1]){
        for (let i in flip){ 
            $("#"+flip[i]).removeAttr("class") && $("#"+flip[i]).addClass(flipped_icon) && $("#"+flip[i]).addClass("listener");
        }
    } else{
        wincount++;
        for (let i in flip){ 
            $("#"+flip[i]).addClass("done");
        }
        $('#pairs').text("Pairs: " + wincount);
        if (wincount == mode){
            alert("Congrats!! You've won!!");
            ChosenMode(mode);
        }
    }
    flip = [];
}

// Inicialitzar les variables del joc, i l'interval de temps
function resetVar(){
    $("#time").text("Time: 0h 0m 0s");
    if (time_id != 0) clearInterval(time_id);
    time_id = setInterval(Gametime,1000);
    cardMatrix = [];
    flip = []; 
    wincount = 0;
    $('#pairs').text("Pairs: " + wincount);
    moves = 0;
    $('#moves').text("Moves: " + moves);
    time =  0;
}

// Funció principal que afegeix els event listeners als elements de la taula
function MemoryGame(mode = 6){
    resetVar();
    let rand_icons = initial_cards(mode*2);
    for(let i in rand_icons){
        cardMatrix.push(icons[rand_icons[i]-1]);
    }
    for(let i in cardMatrix){
        if(!$("#"+i).hasClass("listener")){
            document.getElementById(i).addEventListener('click', function(){
            DisplayCard(this.id);
            });
        }
        $("#"+i).removeAttr("class") && $("#"+i).addClass(flipped_icon) && $("#"+i).addClass("listener");
    }
}

// Reinicia la partida en el mode actual
function restart(){
    ChosenMode(mode);
}
// Modifica el tauler en funció del mode de joc
function ChosenMode(n){
    mode = n;
    if(mode == 8){
        $("#medium").css("display","");
        $("#hard").css("display","none");
    }else if(mode == 10){
        $("#hard").css("display","");
    }
    else{
        $("#medium").css("display","none");
        $("#hard").css("display","none");
    }
    MemoryGame(mode);
}

// Funció auxiliar del interval de temps que calcula el clock
function Gametime(){
    time++;
    let h, m, s;
    h=Math.floor(time/3600);
    m=Math.floor((time%3600)/60);
    s=time-h*3600-m*60;
    let text="Time: " + h + "h " + m + "m " + s +"s";
    $("#time").text(text);
}