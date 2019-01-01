class Transformer {
    constructor() { }
    normalizeLine(line) {
        const points = line.getPoints().slice(0);
        if (points.length <= 2)
            return line;
        if (points.length % 2 === 0)
            points.pop();
        for (let i = 0; i < points.length - 2; i += 2) {
            points[i + 1] = new Point(
                (points[i].getX() + points[i + 2].getX()) / 2,
                (points[i].getY() + points[i + 2].getY()) / 2,
            );
        }
        return (new Line().setPoints(points));
    }
}