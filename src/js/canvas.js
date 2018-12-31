class Canvas {
    constructor(drawer) {
        this.lines = [];
        this.state = new State();
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
            .filter(x => x.getPoints().length > 1);
    }
    _createLine() {
        this.lines.push(new Line());
    }
    _addPoint() {
        this.lines[this.lines.length - 1].addPoint(
            this.state.getCurrentPosition().getX(),
            this.state.getCurrentPosition().getY())
    }
    _redraw() {
        this.drawer.clear();
        this.lines.forEach(x =>
            this.drawer.drawPoints(x.getPoints()));
    }
}