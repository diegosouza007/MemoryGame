const flipSound = document.getElementById('flip-sound');
const matchSound = document.getElementById('match-sound');
const FRONT_PATH = './assets/images/cards';
const BACK_PATH = './assets/images/back-card.webp';
let firstCard = null;
let secondCard = null;
let lockedMode = true;
let cards;

document.addEventListener('DOMContentLoaded', () => {
    cards = generateCardsData();
    startGame();
    setTimeout(() => addEventListennersToCards(), 30);
})

function startGame() {

    const gameBoard = document.getElementById('game-container');

    for (let card of cards) {

        // Card Element container

        cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add("cards");

        // Front Card Element

        frontCardElement = document.createElement('div');
        frontCardElement.classList.add("front-card");
        frontCardElement.classList.add("card-square");
        frontCardElement.dataset.icon = card.dataicon;

        imageFrontCard = document.createElement('img');
        imageFrontCard.src = `${FRONT_PATH}/${card.dataicon}.webp`;

        // Back Card Element

        backCardElement = document.createElement('div');
        backCardElement.classList.add("back-card");
        backCardElement.classList.add("card-square");

        imageBackCard = document.createElement('img');
        imageBackCard.src = BACK_PATH;

        // Adding Elements to HTML page

        frontCardElement.appendChild(imageFrontCard);
        backCardElement.appendChild(imageBackCard);
        cardElement.appendChild(frontCardElement);
        cardElement.appendChild(backCardElement);
        gameBoard.appendChild(cardElement);
    }
}

function addEventListennersToCards() {

    let cards = document.querySelectorAll('.cards');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            flipCard(card);
        });
    });
}

function flipCard(card) {

    cards.filter(element => {
        if (element.id === card.id) {
            element.flipped = true;
        }
    })

    if (firstCard && secondCard !== null) {
        firstCard = null;
        secondCard = null;
    }

    firstCard === null ? firstCard = card : secondCard = card;



    card.classList.add('flip');
    flipSound.play();

    if (isMatchCardPair()) {
        console.log("temos um par");
        matchSound.play();
    } else if (firstCard && secondCard !== null) {
        setTimeout(() => {
            unFlipCard(firstCard);
            unFlipCard(secondCard);
        }, 1000);
    }
}

function unFlipCard(card) {

    card.classList.remove('flip');

    cards.filter(element => {
        if (element.id === card.id) {
            element.flipped = false;
        }
    })
}

function isMatchCardPair() {

    if (firstCard && secondCard !== null) {
        if (firstCard.firstChild.getAttribute('data-icon') === secondCard.firstChild.getAttribute('data-icon')) {
            return true;
        } else {
            return false;
        }
    }
}