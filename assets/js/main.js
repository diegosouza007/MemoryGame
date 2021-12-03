const ELEMENTS = {
    modal: document.getElementById('content'),
    music: document.getElementById('music'),
    buttons: {
        play: document.getElementById('play'),
        newGame: document.getElementById('new-game'),
        sound: document.getElementById('sound'),
        about: document.getElementById('about'),
        close: document.getElementById('close')
    },
    sounds: {
        theme: document.getElementById('music-theme'),
        click: document.getElementById('click'),
    },
}

ELEMENTS.buttons.play.addEventListener('click', () => {
    ELEMENTS.modal.classList.toggle('active');
    ELEMENTS.sounds.click.play();
});

ELEMENTS.buttons.close.addEventListener('click', () => {
    ELEMENTS.modal.classList.toggle('active');
    ELEMENTS.sounds.click.play();
});

ELEMENTS.buttons.sound.addEventListener('click', () => {

    if (ELEMENTS.music.textContent === 'OFF') {
        ELEMENTS.music.innerHTML = 'ON';
        ELEMENTS.sounds.theme.play();
    } else {
        ELEMENTS.music.innerHTML = 'OFF';
        ELEMENTS.sounds.theme.pause();
        ELEMENTS.sounds.theme.currentTime = 0;
    }
    ELEMENTS.sounds.click.play();
});