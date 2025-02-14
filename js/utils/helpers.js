const audioElements = {
    gamemusic: new Audio('assets/sounds/gamemusic.mp3'),
    monkeySaludo: new Audio('assets/sounds/monkeySaludo.mp3'),
    monkeyDespedida: new Audio('assets/sounds/monkeyDespedida.mp3'),
    monkeyJump2: new Audio('assets/sounds/monkeyJump2.mp3'),
    monkeyPoint: new Audio('assets/sounds/monkeyPoint.mp3'),
    reward: new Audio('assets/sounds/reward.mp3')
};

function playSound(soundName) {
    const audio = audioElements[soundName];
    if (audio) {
        audio.currentTime = 0; // tiempo de inicio de sonido
        audio.play().catch(error => console.log('Error playing sound:', error));
    }
};

function pauseSound(soundName) {
    const audio = audioElements[soundName];
    if (audio) {
        audio.pause();
    }
};

function resetSound(soundName) {
    const audio = audioElements[soundName];
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
};

function isOutOfBounds(position, containerHeight) {
    return position < 0 || position > containerHeight - 50;
};

