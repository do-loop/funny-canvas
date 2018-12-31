class Drawer {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
    }
    getCanvas() {
        return this.canvas;
    }
    getContext() {
        return this.context;
    }
    colorize(color) {
        this.context.fillStyle = color || Settings.CanvasColor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    start() {
        this.context.beginPath();
    }
    draw(a, b) {
        this.context.moveTo(a.getX(), a.getY());
        this.context.lineTo(b.getX(), b.getY());
        this.context.lineWidth = Settings.LineSize;
        this.context.strokeStyle = Settings.LineColor;
        this.context.stroke();
    }
    stop() {
        this.context.closePath();
    }
}