class Score {
    constructor() {
        this.element = document.getElementById('score');
        this.value = 0;
    }

    increment() {
        this.value++;
        this.update();
        playSound('monkeyPoint');
    }

    reset() {
        this.value = 0;
        this.update();
    }

    update() {
        this.element.textContent = `Puntos: ${this.value}`;
    }

    getScore() {
        return this.value;
    }
}