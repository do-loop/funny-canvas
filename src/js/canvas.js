class Canvas {
    constructor(drawer) {
        this.lines = [];
        this.state = new State();
        this.drawer = drawer;
        this.drawer.colorize();
        this.canvas = this.drawer.getCanvas();
        this._stretch();
        this._initialize();
    }
    _stretch() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
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
                this.lines.push(new Line());
                break;
            }
            case ActionType.Move: {
                if (this.state.getIsDrawing()) {
                    this.lines[this.lines.length - 1].addPoint(
                        this.state.getCurrentPosition().getX(),
                        this.state.getCurrentPosition().getY());
                    this.drawer.draw(
                        this.state.getPreviousPosition(),
                        this.state.getCurrentPosition());
                }
                break;
            }
            case ActionType.Up:
            case ActionType.Out: {
                this.drawer.stop();
                this.lines = this.lines
                    .filter(x => x.getPoints().length > 1);
                break;
            }
        }
    }
}