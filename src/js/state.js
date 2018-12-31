class State {
    constructor() {
        this.currentPosition = new Position();
        this.previousPosition = new Position();
        this.currentActionType = ActionType.Out;
        this.previousActionType = ActionType.Out;
        this.isDrawing = false;
    }
    setCurrentPosition(x, y) {
        this.setPreviousPosition(
            this.currentPosition.getX(),
            this.currentPosition.getY());
        this.currentPosition = new Position(x, y);
    }
    setPreviousPosition(x, y) {
        this.previousPosition = new Position(x, y);
    }
    getCurrentPosition() {
        return this.currentPosition;
    }
    getPreviousPosition() {
        return this.previousPosition;
    }
    setCurrentActionType(type) {
        this.setPeviousActionType(this.currentActionType);
        this.currentActionType = type;
    }
    setPeviousActionType(type) {
        this.previousActionType = type;
    }
    getCurrentActionType() {
        return this.currentActionType;
    }
    getPreviousActionType() {
        return this.previousActionType;
    }
    setIsDrawing(isDrawing) {
        this.isDrawing = isDrawing;
    }
    setIsDrawing(isDrawing) {
        this.isDrawing = isDrawing;
    }
    getIsDrawing() {
        return this.isDrawing;
    }
}