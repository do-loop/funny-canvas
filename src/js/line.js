class Line {
    constructor() {
        this.points = [];
    }
    addPoint(x, y) {
        this.points.push(new Position(x, y));
    }
    getPoints() {
        return this.points;
    }
}