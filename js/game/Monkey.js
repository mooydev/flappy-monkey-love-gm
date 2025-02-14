class Monkey {
    constructor(element) {
        this.element = element;
        this.position = 300;
        this.velocity = 0;
    }

    jump() {
        this.velocity = JUMP_FORCE;
    }

    update() {
        this.velocity += GRAVITY;
        this.position += this.velocity;
        this.element.style.top = `${this.position}px`;
        this.element.style.transform = `rotate(${this.velocity * 2}deg)`;
    }
}