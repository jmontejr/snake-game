const Canvas = {
    canvasElement: null,
    canvasContext: null,

    init(canvasId) {
        this.canvasElement = document.getElementById(canvasId);
        this.canvasContext = this.canvasElement.getContext("2d");
    },

    getCanvasContext() {
        return this.canvasContext;
    },

    renderCanvasShape(dimensions, bgColor) {
        const { x, y, width, height } = dimensions;
        this.getCanvasContext().fillStyle = bgColor;
        this.getCanvasContext().fillRect(x, y, width, height);
    },
};

const Game = {
    screen: null,
    squareSize: 32,
    snake: [],
    food: {},
    direction: "ArrowRight",
    start: null,

    init(canvas) {
        this.screen = canvas;
        this.snake.push({
            x: 8 * this.squareSize,
            y: 8 * this.squareSize,
        });

        this.createFoodRandom();

        this.start = setInterval(this.startGame.bind(this), 100);
    },

    createSnake() {
        this.snake.map((position) => {
            const dimensions = {
                ...position,
                width: this.squareSize,
                height: this.squareSize,
            };
            return this.screen.renderCanvasShape(dimensions, "green");
        });
    },

    createFoodRandom() {
        this.food = {
            x: Math.floor(Math.random() * 15 + 1) * this.squareSize,
            y: Math.floor(Math.random() * 15 + 1) * this.squareSize,
        };
    },

    drawFood() {
        this.screen.renderCanvasShape(
            {
                x: this.food.x,
                y: this.food.y,
                width: this.squareSize,
                height: this.squareSize,
            },
            "brown"
        );
    },

    renderScreen() {
        this.screen.renderCanvasShape(
            {
                x: 0,
                y: 0,
                width: 16 * this.squareSize,
                height: 16 * this.squareSize,
            },
            "lightgreen"
        );

        this.createSnake();
        this.drawFood();
    },

    passingSnake() {
        const biggerThanSize = (axis, size) => {
            if (axis > 15 * size) {
                return 0;
            }
            return axis;
        }
        const smallerThanZero = (axis, size) => {
            if (axis < 0) {
                return 16 * size;
            }
            return axis;
        }
        this.snake[0].x = biggerThanSize(this.snake[0].x, this.squareSize);
        this.snake[0].y = biggerThanSize(this.snake[0].y, this.squareSize);
        this.snake[0].x = smallerThanZero(this.snake[0].x, this.squareSize);
        this.snake[0].y = smallerThanZero(this.snake[0].y, this.squareSize);
    },

    KeyboardEventListener() {
        const moveCommands = {
            ArrowRight: "ArrowLeft",
            ArrowLeft: "ArrowRight",
            ArrowUp: "ArrowDown",
            ArrowDown: "ArrowUp",
        };

        document.addEventListener(
            "keydown",
            function (event) {
                if (
                    moveCommands[event.code] &&
                    moveCommands[this.direction] !== event.code
                ) {
                    this.direction = event.code;
                }
            }.bind(this)
        );
    },

    stopGame(gameStart) {
        if (this.snake.length > 1) {
            for (let i = 1; i < this.snake.length; i++) {
                if (
                    this.snake[0].x === this.snake[i].x &&
                    this.snake[0].y === this.snake[i].y
                ) {
                    clearInterval(gameStart);
                    alert("Game Over :(");
                }
            }
        }
    },

    incrementScore() {
        let score = document.getElementById('score').innerText;
        document.getElementById('score').innerText = parseInt(score) + 1;
    },

    startGame() {
        this.passingSnake();
        this.renderScreen();

        this.stopGame(this.start);
        this.KeyboardEventListener();

        const snake = { ...this.snake[0] };

        const moveCommands = {
            ArrowRight: function (snake, size) {
                snake.x += size;
            },
            ArrowLeft: function (snake, size) {
                snake.x -= size;
            },
            ArrowUp: function (snake, size) {
                snake.y -= size;
            },
            ArrowDown: function (snake, size) {
                snake.y += size;
            },
        };

        if (moveCommands[this.direction])
            moveCommands[this.direction](snake, this.squareSize);

        if (snake.x !== this.food.x || snake.y !== this.food.y) {
            this.snake.pop();
        } else {
            this.createFoodRandom();
            this.incrementScore();
        }
        const newHead = { ...snake };
        this.snake.unshift(newHead);
    },
};

const canvasItem = Canvas;
canvasItem.init("snake");
Game.init(canvasItem);
