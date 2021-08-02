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
    direction: 'ArrowRight',

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

    renderScreen() {
        this.screen.renderCanvasShape({
            x: 0,
            y: 0,
            width: 16 * this.squareSize,
            height: 16 * this.squareSize,
        });

        this.createSnake();
    },

    passingSnake() {
        if(this.snake[0].x > 15 * this.squareSize) {
            this.snake[0].x = 0;
        }
        if(this.snake[0].x < 0) {
            this.snake[0].x = 16 * this.squareSize;
        }
        if(this.snake[0].y > 15 * this.squareSize) {
            this.snake[0].y = 0;
        }
        if(this.snake[0].y < 0) {
            this.snake[0].y = 16 * this.squareSize;
        }
    },

    handleKeyDown(event) {
        console.log(`KeyDown Listener disptach ${event.code} pressed!`);
        this.direction = event.code;
    },

    KeyboardEventListener() {
        // let direction = this.direction;
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    },

    startGame() {
        this.passingSnake();
        this.renderScreen();

        this.KeyboardEventListener();

        const snake = { ...this.snake[0] };

        const moveCommands = {
            ArrowRight: function(snake, size) {
                snake.x += size;
            },
            ArrowLeft: function(snake, size) {
                snake.x -= size;
            },
            ArrowUp: function(snake, size) {
                snake.y -= size;
            },
            ArrowDown: function(snake, size) {
                snake.y += size;
            },
        };

        if(moveCommands[this.direction]) moveCommands[this.direction](snake, this.squareSize);
        this.snake.pop();
        const newHead = { ...snake };
        this.snake.unshift(newHead);
    }
};

const canvasItem = Canvas;
canvasItem.init("snake");
Game.init(canvasItem);
