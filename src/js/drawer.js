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
    clear() {
        this.colorize();
    }
    start() {
        this.context.beginPath();
    }
    draw(a, b, color) {
        this.context.lineWidth = color || Settings.LineSize;
        this.context.strokeStyle = color || Settings.LineColor;
        this.context.moveTo(a.getX(), a.getY());
        this.context.lineTo(b.getX(), b.getY());
        this.context.stroke();
    }
    drawPoints(points) {
        this.start();
        for (let i = 0; i < points.length - 1; i++)
            this.draw(points[i], points[i + 1]);
        this.stop();
    }
    drawBezierPoints(points) {
        this.context.beginPath();
        for (let i = 0; i < points.length - 2; i += 2) {
            if (Settings.Debug) {
                this.drawDot(
                    points[i + 1].getX(),
                    points[i + 1].getY(),
                    Color.Green);
                this.draw(points[i], points[i + 1], Color.Red);
                this.draw(points[i + 2], points[i + 1], Color.Red);
            }
            this.context.lineWidth = Settings.LineSize;
            this.context.strokeStyle = Settings.LineColor;
            this.context.moveTo(
                points[i].getX(),
                points[i].getY());
            this.context.bezierCurveTo(
                points[i + 1].getX(), points[i + 1].getY(),
                points[i + 1].getX(), points[i + 1].getY(),
                points[i + 2].getX(), points[i + 2].getY());
        }
        this.context.stroke();
        this.context.closePath();
    }
    stop() {
        this.context.closePath();
    }
    drawDot(x, y, color) {
        this.context.lineWidth = Settings.LineSize;
        this.context.fillStyle = color || Settings.PointColor;
        this.context.arc(x, y, 1, 0, 2 * Math.PI, true);
        this.context.fill();
    }
}