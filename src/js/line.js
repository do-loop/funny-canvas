class Line {
    constructor() {
        this.points = [];
    }
    addPoint(x, y) {
        this.points.push(new Point(x, y));
    }
    getPoints() {
        return this.points;
    }
    setPoints(points) {
        this.points = points;
        return this;
    }
}