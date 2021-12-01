const CARDS = {
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
}

// Using Fisher–Yates Algorithm
// Choose 12 random cards from CARDS to create pairs

function sortRandomPositions(lenght, maxLengt, array) {

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
}

function createPairsCards(character) {

    return [{
        id: character + parseInt(Math.random() * 1000),
        dataicon: character,
        flipped: false,
    }, {
        id: character + parseInt(Math.random() * 1000),
        dataicon: character,
        flipped: false,
    }]
}

function generateCardsData() {

    let length = Object.keys(CARDS.characters).length;
    let oldCards = sortRandomPositions(length, 12, CARDS.characters);
    let newCards = [];

    for (let character of oldCards) {
        newCards.push(createPairsCards(character));
    }

    let cards = sortRandomPositions(24, 24, newCards.flat());

    return cards;
}