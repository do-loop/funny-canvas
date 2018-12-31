class Line {
    constructor(x, y) {
        this.points = [
            new Position(x, y)
        ];
    }
    addPoint(x, y) {
        this.points.push(new Position(x, y));
    }
}