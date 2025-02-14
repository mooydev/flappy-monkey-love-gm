class HeartEffect {
    constructor(gameContainer) {
        this.gameContainer = gameContainer;
    }

    create(x, y) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = '❤️';
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        
        this.gameContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 3000);
    }
}