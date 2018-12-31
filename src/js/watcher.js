class Watcher {
    constructor(manager) {
        this.manager = manager;
        this.canvas = this.manager.getCanvas();
        this._subscribe();
    }
    _subscribe() {
        this.canvas.subscribe(
            ActionType.Down,
            event => this.manager.down(event));
        this.canvas.subscribe(
            ActionType.Move,
            event => this.manager.move(event));
        this.canvas.subscribe(
            ActionType.Up,
            event => this.manager.up(event));
        this.canvas.subscribe(
            ActionType.Out,
            event => this.manager.out(event));
    }
}