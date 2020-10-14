/* jshint esversion: 6 */

const random = n => {
    return(Math.floor(Math.random()*(n)));
};

function clock(n) {
    let h, m, s;
    h = (n/60/60).toFixed();
    m = (n/60 % 60).toFixed();
    s = (n % 60).toFixed();
    console.log(h, "h", m, "min", s,"s");
}

function array_action(array){
    array.push("Jane", "George");
    array.shift();
    array.sort();
    array = array.slice(2,array.length);
    //let pos = array.indexOf("John", array);
    console.log(array);
}

function concat_sort(a1,...a){
    concat = a1.concat(...a);
    concat.sort();
    console.log(concat);
}

function days_of_month(month){
    let d = 31;
    if (month == 2) return 28;
    else if (month % 2) return 30;
    else return 31;
}

function days_of_month_switch(month){
    switch(month) {
        case 2:
            return 28;
        case month % 2:
            return 30;
        default:
            return 31;
       }
}

function average(v){
    sum = 0;
    let i = 0;
    while (i < v.length) {
    sum += v[i];
    i++;
    }
    return sum/2;
}

function initial_cards(n) {
    let cards = new Array(n).fill().map((_e,i,_a) => Math.floor(i/2)+1);
    cards.forEach((_e, i, a) => {
        let p = random(12);
        console.log(p);
        [a[p], a[i]] = [a[i], a[p]];
    });
    console.log(cards);
    console.log(cards.length);
}

/*
array = ["John", "Mary", "Frank", "Nicole", "Joseph"];
concat_sort([7], [3,2], [5,6,4], [1])

clock(10000);
console.log(array_action(array));
console.log("Month_ifelse:",days_of_month(2));
console.log("Month_switch:",days_of_month_switch(3));
console.log("Average:",average([5,4,3]));
console.log("-------")
console.log("value:",random(12));
for(let i=0; i<1000; i++){
    let rand = random(12);
    if ( rand == 13){
        break;
    } else console.log(rand);
}
*/
initial_cards(12);

