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

    renderCanvasShape(dimensions, bgColor = "lightgreen") {
        const { x, y, width, height } = dimensions;
        this.getCanvasContext().fillStyle = bgColor;
        this.getCanvasContext().fillRect(x, y, width, height);
    },
};

const Game = {
    screen: null,
    squareSize: 32,
    snake: [],

    init(canvas) {
        this.screen = canvas;
        this.snake.push({
            x: 8 * this.squareSize,
            y: 8 * this.squareSize,
        });

        let start = setInterval(
            this.startGame.bind(this), 100
        );
    },

    createSnake() {
        this.snake.map((position) => {
            const dimensions = {
                ...position,
                width: this.squareSize,
                height: this.squareSize,
            };
            this.screen.renderCanvasShape(dimensions, "green");
        });
    },

    startGame() {
        this.screen.renderCanvasShape({
            x: 0,
            y: 0,
            width: 16 * this.squareSize,
            height: 16 * this.squareSize,
        });

        this.createSnake();
        const snake = { ...this.snake[0] };

        let direction  = 'right';

        const moveCommands = {
            right: function(snake, size) {
                snake.x += size;
            },
            left: function(snake, size) {
                snake.x += size;
            },
            up: function(snake, size) {
                snake.y += size;
            },
            down: function(snake, size) {
                snake.y += size;
            },
        };

        moveCommands[direction](snake, this.squareSize);
        this.snake.pop();
        const newHead = { ...snake };
        this.snake.unshift(newHead);
    }
};

const canvasItem = Canvas;
canvasItem.init("snake");
Game.init(canvasItem);
