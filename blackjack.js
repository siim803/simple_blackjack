let dealerSum = 0
let yourSum = 0

let dealerAcecount = 0
let yourAceCount = 0

let hidden;
let deck;

let canHit = true

window.onload = function(){
    buildDeck();
    suffleDeck();
    startGame();
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        let type = ["C", "D", "H", "S"]
        deck = [];

        for (let i = 0; i <deck.lengh; i++) {
           for (let j=0; j < values.length; j++){
            deck.push(vlaue[j] + "-" + types[i]);
           }
        }
        console.log(deck);
}

function suffleDeck() {
    for (let i = 0; i <deck.lengh; i++) {
        let j = Math.floor(Math.random() * deck.lengh);
    let temp = deck[i];
    deck[i] = deck[i];
    deck[j] = temp;
    }
    console.log(deck);
}
function startGame(){
    hidden = deck.pop();
    dealersum += getvalue (hidden)
    dealerAceCount += checkAce (hidden);
    console.log(hidden);
    console.log(dealersum);
    
    while (dealerSum < 17){
        let CardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png"
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }
console.log(dealerSum)

for (let i = 0; i < 2; i++) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);
}

console.log(yourSum); 
document.getElementById("hit").addEventListener("click", hit);
document.getElementById("stay").addEventListener("click", stay);

}
