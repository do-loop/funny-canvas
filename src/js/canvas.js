class Canvas {
    constructor(state, transformer, drawer) {
        this.lines = [];
        this.normalizedLines = [];
        this.bezierLines = [];
        this.state = state;
        this.transformer = transformer;
        this.drawer = drawer;
        this.canvas = this.drawer.getCanvas();
        this._stretch();
        this._colorize();
        this._initialize();
    }
    _stretch() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    _colorize() {
        this.drawer.colorize();
    }
    _initialize() {
        this.subscribers = [];
        this.canvas.addEventListener(
            ActionType.Down,
            event => this._notify(ActionType.Down, event));
        this.canvas.addEventListener(
            ActionType.Move,
            event => this._notify(ActionType.Move, event));
        this.canvas.addEventListener(
            ActionType.Up,
            event => this._notify(ActionType.Up, event));
        this.canvas.addEventListener(
            ActionType.Out,
            event => this._notify(ActionType.Out, event));
    }
    subscribe(type, action) {
        this.subscribers.push({
            type: type,
            action: action
        });
    }
    _notify(type, event) {
        this.subscribers
            .filter(x => x.type === type)
            .forEach(x => x.action(event));
    }
    getState() {
        return this.state;
    }
    setState(state) {
        this.state = state;
    }
    getOffset() {
        return new Position(
            this.canvas.offsetLeft,
            this.canvas.offsetTop);
    }
    update() {
        const actionType = this.state.getCurrentActionType();
        switch (actionType) {
            case ActionType.Down: {
                this.drawer.start();
                this._createLine();
                this._addPoint();
                break;
            }
            case ActionType.Move: {
                if (this.state.getIsDrawing()) {
                    this.drawer.draw(
                        this.state.getPreviousPosition(),
                        this.state.getCurrentPosition());
                    this._addPoint();
                }
                break;
            }
            case ActionType.Up: {
                this._stop();
                this._redraw();
            }
            case ActionType.Out: {
                this._stop();
                break;
            }
        }
    }
    _stop() {
        this.drawer.stop();
        this.lines = this.lines
            .filter(x => x.getPoints().length > 2);
        this._normalizeLines();
    }
    _createLine() {
        this.lines.push(new Line());
    }
    _addPoint() {
        this.lines[this.lines.length - 1].addPoint(
            this.state.getCurrentPosition().getX(),
            this.state.getCurrentPosition().getY())
    }
    _normalizeLines() {
        this.normalizedLines = this.lines
            .map(x => this.transformer.normalizeLine(x))
            .filter(x => x.getPoints().length > 2);
        this.bezierLines = this.normalizedLines
            .map(x => this.transformer.convertLine(x));
    }
    _redraw() {
        this.drawer.clear();
        this.bezierLines.forEach(x =>
            this.drawer.drawBezierPoints(x.getPoints()));
    }
}