class Obstacle {
    constructor(gameContainer) {
        this.gameContainer = gameContainer;
        this.passed = false;
        this.createObstacles();
    }

    createObstacles() {
        const minHeight = 50;
        const maxHeight = this.gameContainer.clientHeight - GAP_SIZE - minHeight;
        const height = Math.random() * (maxHeight - minHeight) + minHeight;

        this.topElement = document.createElement('div');
        this.topElement.className = 'obstacle';
        this.topElement.style.height = `${height}px`;
        this.topElement.style.top = '0';
        this.topElement.style.left = `${this.gameContainer.clientWidth}px`;

        this.bottomElement = document.createElement('div');
        this.bottomElement.className = 'obstacle';
        this.bottomElement.style.height = `${this.gameContainer.clientHeight - height - GAP_SIZE}px`;
        this.bottomElement.style.bottom = '0';
        this.bottomElement.style.left = `${this.gameContainer.clientWidth}px`;

        this.gameContainer.appendChild(this.topElement);
        this.gameContainer.appendChild(this.bottomElement);
    }

    update() {
        const currentLeft = parseInt(this.topElement.style.left);
        const newLeft = currentLeft - OBSTACLE_SPEED;
        this.topElement.style.left = `${newLeft}px`;
        this.bottomElement.style.left = `${newLeft}px`;
        return newLeft;
    }

    checkCollision(monkeyRect) {
        const topRect = this.topElement.getBoundingClientRect();
        const bottomRect = this.bottomElement.getBoundingClientRect();

        return (
            monkeyRect.right > topRect.left &&
            monkeyRect.left < topRect.right &&
            (monkeyRect.top < topRect.bottom || monkeyRect.bottom > bottomRect.top)
        );
    }

    destroy() {
        this.topElement.remove();
        this.bottomElement.remove();
    }
}