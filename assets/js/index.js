const GAME = {
    canvasElement: null,
    canvasContext: null,

    init(canvas_id) {
        this.setCanvasElement(canvas_id);
        this.setCanvasContext(this.getCanvasElement());
        this.createContextShape(this.getCanvasContext());
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
        const boxPixelsNumbers = 32;
        const squareSide = 16 * boxPixelsNumbers;
        context.fillStyle = 'lightgreen';
        context.fillRect(0, 0, squareSide, squareSide);
    },
};

((app) => {
    app.init('snake');
})(GAME);
