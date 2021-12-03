const game = {
    FRONT_PATH: './assets/images/cards',
    BACK_PATH: './assets/images/back-card.webp',
    firstCard: null,
    secondCard: null,
    lockMode: false,
    characters: [
        'atomicsamurai',
        'blast',
        'boros',
        'child',
        'darkshine',
        'drivernight',
        'flashflash',
        'fubuki',
        'fuhrer',
        'garou',
        'genus',
        'god',
        'kabuto',
        'king',
        'metalbat',
        'metalnight',
        'nyan',
        'orochi',
        'piggod',
        'psykos',
        'puripuri',
        'rider',
        'rover',
        'saitama',
        'silverfang',
        'sonic',
        'sperm',
        'suiryu',
        'tanktop',
        'tatsumaki',
        'watchdog',
        'zombieman',
    ],

    shufflePositions: function(lenght, maxLengt, array) {

        let num = [];

        let max = lenght;
        let results = maxLengt;

        let i, arr = [];
        for (i = 0; i < max; i++) {
            arr[i] = i;
        }

        let p, n, tmp;
        for (p = arr.length; p;) {
            n = Math.random() * p-- | 0;
            tmp = arr[n];
            arr[n] = arr[p];
            arr[p] = tmp;
        }

        for (let i = 0; i < results; i++) {
            num.push(array[[arr[i]]]);
        }

        return num;
    },

    createPairsCards: function(character) {

        return [{
            id: character + this.genId(),
            dataicon: character,
            flipped: false,
        }, {
            id: character + this.genId(),
            dataicon: character,
            flipped: false,
        }]
    },

    genId: function() {
        return parseInt(Math.random() * 1000);
    },

    generateCardsData: function() {

        let length = this.characters.length;
        let tmpCards = this.shufflePositions(length, 12, this.characters);
        let newCards = [];

        for (let character of tmpCards) {
            newCards.push(this.createPairsCards(character));
        }

        let cards = this.shufflePositions(24, 24, newCards.flat());

        return cards;
    },

    setCard: function(cardId) {

        let card = cards.filter(card => card.id === cardId)[0];

        if (card.flipped || this.lockMode) {
            return false;
        }

        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    checkWinner: function() {
        return cards.every(card => card.flipped === true);
    },

    isMatchCardPair: function() {

        if (this.firstCard && this.secondCard !== null) {
            if (this.firstCard.dataicon === this.secondCard.dataicon) {
                return true;
            } else {
                return false;
            }
        }
    },

    clearCards: function() {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },
}