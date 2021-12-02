const flipSound = document.getElementById('flip-sound');
const matchSound = document.getElementById('match-sound');
const gameBoard = document.getElementById('game-board');
const playAgain = document.getElementById('play-again');
const winModal = document.getElementById('win-modal');
const music = document.getElementById('music-theme');

const FRONT_PATH = './assets/images/cards';
const BACK_PATH = './assets/images/back-card.webp';
let firstCard = null;
let secondCard = null;
let lockMode = false;
let cards;

document.addEventListener('DOMContentLoaded', () => {
    startGame();
})

function startGame() {

    cards = generateCardsData();

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
    addEventListennersToCards();
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

    if (setCard(card.id)) {

        card.classList.add('flip');
        flipSound.play();

        if (isMatchCardPair()) {
            matchSound.play();
            clearCards();
            if (checkWinner()) {
                winModal.classList.add('active');
                playAgain.addEventListener('click', () => restartGame());
                music.play();
                music.loop = true;
            }
        } else if (firstCard && secondCard !== null) {
            setTimeout(() => {
                unFlipCard(firstCard);
                unFlipCard(secondCard);
                clearCards();
            }, 1000);
        }
    }
}

function clearCards() {
    firstCard = null;
    secondCard = null;
    lockMode = false;
}

function setCard(cardId) {

    let card = cards.filter(card => card.id === cardId)[0];

    if (card.flipped || lockMode) {
        return false;
    }

    if (!firstCard) {
        firstCard = card;
        firstCard.flipped = true;
        return true;
    } else {
        secondCard = card;
        secondCard.flipped = true;
        lockMode = true;
        return true;
    }
}

function unFlipCard(cardObject) {

    let cardsElement = document.querySelectorAll('.cards');

    cardsElement.forEach(card => {
        if (card.getAttribute('id') === cardObject.id) {
            card.classList.remove('flip');
        }
    });

    cards.filter(card => {
        if (card.id === cardObject.id) {
            card.flipped = false;
        }
    })
}

function isMatchCardPair() {

    if (firstCard && secondCard !== null) {

        if (firstCard.dataicon === secondCard.dataicon) {
            return true;
        } else {
            return false;
        }
    }
}

function checkWinner() {
    return cards.every(card => card.flipped === true);
}

function restartGame() {
    window.location.reload();
}