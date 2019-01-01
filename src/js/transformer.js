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
    convertLine(line) {
        const points = line.getPoints().slice(0);
        for (let i = 0; i < points.length - 2; i += 2) {
            const x = this._calculateX(points, i);
            const y = this._calculateY(points, i);
            points[i + 1] = new Point(x, y);
        }
        return (new Line().setPoints(points));
    }
    _calculateX(points, index) {
        const t = 0.5;
        const a = points[index + 1].getX();
        const b = Math.pow(1 - t, 2) * points[index].getX();
        const c = Math.pow(t, 2) * points[index + 2].getX();
        const d = 2 * t - 2 * Math.pow(t, 2);
        return (a - b - c) / d;
    }
    _calculateY(points, index) {
        const t = 0.5;
        const a = points[index + 1].getY();
        const b = Math.pow(1 - t, 2) * points[index].getY();
        const c = Math.pow(t, 2) * points[index + 2].getY();
        const d = 2 * t - 2 * Math.pow(t, 2);
        return (a - b - c) / d;
    }
}