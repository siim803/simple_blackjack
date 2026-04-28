let dealerSum = 0
let yourSum = 0

let dealerAcecount = 0
let yourAceCount = 0

let hidden;
let deck;

let canHit = true

window.onload = function () {
    buildDeck();
    suffleDeck();
    startGame();
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (const val of values) {
        for (const type of types) {
            deck.push(val + '-' + type)
        }
    }
    console.log(deck);
}

function suffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAcecount += checkAce(hidden);
    console.log(hidden);
    console.log(dealerSum);

    while (dealerSum < 17) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png"
        dealerSum += getValue(card);
        dealerAcecount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
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
    document.getElementById("stand").addEventListener("click", stay);
    document.getElementById("split").addEventListener("click", split);
    document.getElementById("restart").addEventListener("click", function () {
        location.reload();
    });
}

function hit() {
    if (!canHit) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png"
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);

    if (reduceAce(yourSum, yourAceCount) > 21) {
        canHit = false
    }
}

function stay() {

    dealerSum = reduceAce(dealerSum, dealerAcecount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";


    let message = "";

    if (yourSum > 21) {
        message = "You lose!";
    }

    else if (dealerSum > 21) {
        message = "You win!"
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
    document.getElementById("results").innerText = message;
}

function checkSplitOption() {
if (playerHand.length === 2 && playerHand[0].value === playerHand[1].value) {
    splitButton.disabled = false;
} else {
    splitButton.disabled = true;
}

}


function splitHand() {
    if (playerHand[0].value === playerHand[1].value) {
        const splitHand1 = [playerHand[0],deck.pop()];
        const splitHand2 = [playerHand[1],deck.pop()];

        playerHand = splitHand1;
        const playerSplitHand = splitHand2

        renderHands();
        alert("You split your hand!");
    }
}

function getValue(card) {

    let data = card.split("-");
    let value = data[0];

    if (isNaN(value)) {
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}

function reduceAce(dealerSum, dealerAceCount) {
    while (dealerSum > 21 && dealerAceCount > 0) {
        dealerSum -= 10;
        dealerAceCount -= 1;
    }
    return dealerSum;
}
