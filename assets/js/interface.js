const card = document.querySelector('#card');
const flipSound = document.getElementById('flip-sound');

const FRONT_PATH = './assets/images/cards';
const BACK_PATH = './assets/images/cards';

card.addEventListener('click', () => {
    card.classList.add('flip');
    flipSound.play();
});

document.addEventListener('DOMContentLoaded', () => {
    startGame();
})

function startGame() {

    const gameBoard = document.getElementById('game-container');

    let cards = generateCardsData();

    for (let card of cards) {

        // Card Element container

        cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add = "cards";

        // Front Card Element

        frontCardElement = document.createElement('div');
        frontCardElement.classList.add("front-card");
        frontCardElement.classList.add("card-square");
        frontCardElement.dataset.icon = card.dataicon;

        imageCard = document.createElement('img');
        imageCard.src = `${FRONT_PATH}/${card.dataicon}.webp`;

        // Front Card Element

        backCardElement = document.createElement('div');
        backCardElement.classList.add("back-card");
        backCardElement.classList.add("card-square");

        frontCardElement.appendChild(imageCard);
        cardElement.appendChild(frontCardElement);
        cardElement.appendChild(backCardElement);
        gameBoard.appendChild(cardElement);
    }
}