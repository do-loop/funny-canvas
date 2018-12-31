class Canvas {
    constructor(drawer) {
        this.drawer = drawer;
        this.canvas = this.drawer.getCanvas();
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.state = new State();
        this._initialize();
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
                if (this.state.getIsDrawing()) {
                    this.drawer.draw(
                        this.state.getPreviousPosition(),
                        this.state.getCurrentPosition());
                }
            }
            case ActionType.Move: {
                if (this.state.getIsDrawing()) {
                    this.drawer.draw(
                        this.state.getPreviousPosition(),
                        this.state.getCurrentPosition());
                }
            }
            case ActionType.Up:
            case ActionType.Out: {
                this.drawer.stop();
            }
        }
    }
}