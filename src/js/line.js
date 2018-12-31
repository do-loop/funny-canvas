class Line {
    constructor(width, color) {
        this.width = width || Settings.LineSize;
        this.color = color || Settings.LineColor;
    }
    getWidth() {
        return this.width;
    }
    getColor() {
        return this.color;
    }
}