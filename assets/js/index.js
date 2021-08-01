const GAME = {
    canvasElement: null,
    canvasContext: null,
    boxPixelsNumbers: 32,
    snake: [],

    init(canvas_id) {
        this.setCanvasElement(canvas_id);
        this.setCanvasContext(this.getCanvasElement());
        this.createContextShape(this.getCanvasContext());
        this.createSnake(this.getCanvasContext());
    },

    getCanvasElement() {
        return this.canvasElement;
    },

    setCanvasElement(id) {
        this.canvasElement = document.getElementById(id);
    },

    getCanvasContext() {
        return this.canvasContext;
    },

    setCanvasContext(canvas) {
        this.canvasContext = canvas.getContext('2d');
    },

    createContextShape(context) {
        const squareSide = 16 * this.boxPixelsNumbers;
        context.fillStyle = 'lightgreen';
        context.fillRect(0, 0, squareSide, squareSide);
    },

    createSnake(context) {
        const x = this.boxPixelsNumbers * 8;
        const y = this.boxPixelsNumbers * 8;
        this.snake.push({ x, y });

        for(let i = 0; i < this.snake.length; i++) {
            const { x, y } = this.snake[i];
            context.fillStyle = 'green';
            context.fillRect(x, y, this.boxPixelsNumbers, this.boxPixelsNumbers);
        }
    }
};

((app) => {
    app.init('snake');
})(GAME);
