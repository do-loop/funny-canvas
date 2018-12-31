class Manager {
    constructor(canvas) {
        this.canvas = canvas;
    }
    getCanvas() {
        return this.canvas;
    }
    down(event) {
        this._updateCurrentPosition(event);
        const state = this.canvas.getState();
        this._updatePreviousPosition();
        state.setCurrentActionType(ActionType.Down);
        state.setIsDrawing(true);
        this.canvas.setState(state);
        this.canvas.update();
    }
    move(event) {
        this._updateCurrentPosition(event);
        const state = this.canvas.getState();
        state.setCurrentActionType(ActionType.Move);
        this.canvas.setState(state);
        this.canvas.update();
    }
    up(event) {
        this._updateCurrentPosition(event);
        const state = this.canvas.getState();
        state.setCurrentActionType(ActionType.Up);
        state.setIsDrawing(false);
        this.canvas.setState(state);
        this.canvas.update();
    }
    out(event) {
        this._updateCurrentPosition(event);
        const state = this.canvas.getState();
        state.setCurrentActionType(ActionType.Out);
        state.setIsDrawing(false);
        this.canvas.setState(state);
        this.canvas.update();
    }
    _updateCurrentPosition(event) {
        const state = this.canvas.getState();
        const offset = this.canvas.getOffset();
        state.setCurrentPosition(
            event.clientX - offset.getX(),
            event.clientY - offset.getY());
        this.canvas.setState(state);
    }
    _updatePreviousPosition(event) {
        const state = this.canvas.getState();
        state.setPreviousPosition(
            state.getCurrentPosition().getX(),
            state.getCurrentPosition().getY());
        this.canvas.setState(state);
    }
}