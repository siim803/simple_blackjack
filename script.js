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

    let dealerCardImg = document.createElement("img");
    let dealerCard = deck.pop();
    dealerCardImg.src = "./cards/" + dealerCard + ".png";
    dealerCardImg.className = "card-image";
    dealerSum += getValue(dealerCard);
    dealerAcecount += checkAce(dealerCard);
    document.getElementById("dealer-cards").append(dealerCardImg);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        cardImg.className = "card-image";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }

    console.log(yourSum);
    document.getElementById("dealer-sum").style.display = "none";
    document.getElementById("your-sum").innerText = reduceAce(yourSum, yourAceCount);
    
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stand").addEventListener("click", stay);
    document.getElementById("split").addEventListener("click", split);
    document.getElementById("restart").addEventListener("click", function () {
        location.reload();
    });
}

function updateHandDisplay() {
    let displayDealerSum = reduceAce(dealerSum, dealerAcecount);
    let displayYourSum = reduceAce(yourSum, yourAceCount);
    
    document.getElementById("dealer-sum").innerText = displayDealerSum;
    document.getElementById("your-sum").innerText = displayYourSum;
}

function hit() {
    if (!canHit) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png"
    cardImg.className = "card-image";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);

    updateHandDisplay();

    if (reduceAce(yourSum, yourAceCount) > 21) {
        canHit = false
    }
}

function stay() {
    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";

    while (reduceAce(dealerSum, dealerAcecount) < 17) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png"
        cardImg.className = "card-image";
        dealerSum += getValue(card);
        dealerAcecount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }

    dealerSum = reduceAce(dealerSum, dealerAcecount);
    yourSum = reduceAce(yourSum, yourAceCount);

    document.getElementById("dealer-sum").style.display = "block";
    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;

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

    updateHandDisplay();
    document.getElementById("results").innerText = message;
}

function split() {
    console.log("Split function called");
}

function checkSplitOption() {
    if (playerHand.length === 2 && playerHand[0].value === playerHand[1].value) {
        splitButton.disabled = false;
    } else {
        splitButton.disabled = true;
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

function reduceAce(sum, aceCount) {
    while (sum > 21 && aceCount > 0) {
        sum -= 10;
        aceCount -= 1;
    }
    return sum;
}
