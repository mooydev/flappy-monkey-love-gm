class Game {
    constructor() {
        this.gameContainer = document.getElementById('gameContainer');
        this.monkey = new Monkey(document.getElementById('monkey'));
        this.score = new Score();
        this.heartEffect = new HeartEffect(this.gameContainer);
        this.rewardManager = new RewardManager(this);
        this.obstacles = [];
        this.isRunning = false;
        this.lastObstacleTime = 0;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.startScreen = document.getElementById('startScreen');
        this.startButton = document.getElementById('startButton');
        this.startButton.addEventListener('click', () => this.start());

        const highScore = StorageManager.getData().highScore;
        const highScoreElement = document.createElement('div');
        highScoreElement.className = 'high-score';
        highScoreElement.textContent = `Record: ${highScore}`;
        this.startScreen.insertBefore(highScoreElement, this.startButton);
    }

    bindEvents() {
        // Detectar si el dispositivo es táctil
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
        if (isTouchDevice) {
            // Solo usar touchstart en dispositivos táctiles
            this.gameContainer.addEventListener('touchstart', (e) => {
                e.preventDefault();
                if (this.isRunning && e.target !== this.startButton) {
                    this.monkey.jump();
                    playSound('monkeyJump2');
                }
            });
        } else {
            // Usar click solo en dispositivos no táctiles
            this.gameContainer.addEventListener('click', (e) => {
                if (e.target !== this.startButton && this.isRunning) {
                    this.monkey.jump();
                    playSound('monkeyJump2');
                }
            });
        }
    
        // El evento keydown funciona igual para ambos casos
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                if (this.isRunning) {
                    this.monkey.jump();
                    playSound('monkeyJump2');
                }
            }
        });
    }

    start() {
        this.isRunning = true;
        this.score.reset();
        this.rewardManager.reset();
        this.monkey.position = 300;
        this.monkey.velocity = 0;
        this.obstacles.forEach(obstacle => obstacle.destroy());
        this.obstacles = [];
        this.startScreen.style.display = 'none';
        this.lastObstacleTime = Date.now();
        
        if (this.gameLoop) clearInterval(this.gameLoop);
        this.gameLoop = setInterval(() => this.update(), 16);
        playSound('monkeySaludo');
        playSound('gamemusic');
    }

    update() {
        if (!this.isRunning) return;

        this.monkey.update();

        if (Date.now() - this.lastObstacleTime > OBSTACLE_INTERVAL) {
            this.obstacles.push(new Obstacle(this.gameContainer));
            this.lastObstacleTime = Date.now();
        }

        this.obstacles.forEach((obstacle, index) => {
            const newLeft = obstacle.update();

            if (!obstacle.passed && newLeft < 50) {
                this.score.increment();
                obstacle.passed = true;
                this.heartEffect.create(50, this.monkey.position);

                this.rewardManager.checkRewards(this.score.getScore());
            }


            if (newLeft < -60) {
                obstacle.destroy();
                this.obstacles.splice(index, 1);
            }

            if (obstacle.checkCollision(this.monkey.element.getBoundingClientRect())) {
                this.gameOver();
            }
        });

        if (isOutOfBounds(this.monkey.position, this.gameContainer.clientHeight)) {
            this.gameOver();
        }
    }

    gameOver() {
        this.isRunning = false;
        clearInterval(this.gameLoop);
        pauseSound('gamemusic')
        playSound('monkeyDespedida')
        
        const finalScore = this.score.getScore();
        const isNewRecord = StorageManager.updateHighScore(finalScore);
        
        this.startScreen.style.display = 'flex';
        let message = `Conseguiste: ${finalScore} puntos`;
        if (isNewRecord) {
            message += ' ¡Estas heavy! ¡Nuevo Record! 🤯';
        }
        this.startScreen.querySelector('p').textContent = message;

        // mostraa el panel de recompensas automáticamente al terminar
        if (finalScore >= 8) { 
            window.rewardPanel.show();
        }
    }
}