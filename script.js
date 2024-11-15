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
    dealerSum += getValue (hidden)
    dealerAcecount += checkAce (hidden);
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

function hit() {
    if(!canHit) {
        return;
    }

    let CardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png"
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);

    if(reduceAce(yourSum, yourAceCount)>21) {
        canHit = false
    }
}

function stay() {
    dealerSum = reduceAce(dealerSum, dealerAcecount);
    yourSum = reduceAce (yourSum, yourAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";
}

let message = "";
    if (yourSum > 21) {
        message = "You lose!";
}

    else if (yourSum < 21) {
        message = "You win!";
    }

    else if (yourSum == dealerSum) {
        message = "Tie!";
    }


    else if (yourSum > dealerSum) {
        message = "You win!";
    }


    else if (yourSum < dealerSum) {
        message = "You lose!";
    }

document.getElementById("dealer-sum").innerText = dealerSum;
document.getElementById("your-sum").innerText = yourSum;
document.getElementById("results").innerText = results;

function getValue(card) {
    let data = card.split("-");
    let vlaue = data[0];

    if (isNaN(value)) {
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card){
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(yourSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}
