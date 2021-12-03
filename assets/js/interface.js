const flipSound = document.getElementById('flip-sound');
const matchSound = document.getElementById('match-sound');
const gameBoard = document.getElementById('game-board');
const playAgain = document.getElementById('play-again');
const winModal = document.getElementById('win-modal');
const music = document.getElementById('music-theme');

let cards;

document.addEventListener('DOMContentLoaded', () => {
    startGame();
})

function startGame() {

    cards = game.generateCardsData();

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
        imageFrontCard.src = `${game.FRONT_PATH}/${card.dataicon}.webp`;

        // Back Card Element

        backCardElement = document.createElement('div');
        backCardElement.classList.add("back-card");
        backCardElement.classList.add("card-square");

        imageBackCard = document.createElement('img');
        imageBackCard.src = game.BACK_PATH;

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

    if (game.setCard(card.id)) {

        card.classList.add('flip');
        flipSound.play();

        if (game.isMatchCardPair()) {
            matchSound.play();
            game.clearCards();
            if (game.checkWinner()) {
                winModal.classList.add('active');
                playAgain.addEventListener('click', () => restartGame());
                music.play();
                music.loop = true;
            }
        } else if (game.firstCard && game.secondCard !== null) {
            setTimeout(() => {
                unFlipCard(game.firstCard);
                unFlipCard(game.secondCard);
                game.clearCards();
            }, 1000);
        }
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

function restartGame() {
    window.location.reload();
}