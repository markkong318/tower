cc.Class({
    extends: cc.Component,

    properties: {},

    start: function () {
        GameEvent.on(GameEventType.GAME_START, () => {
            this.node.off(cc.Node.EventType.TOUCH_END, this.handleGameOverTouchEnd, this);

            this.node.on(cc.Node.EventType.TOUCH_MOVE, this.handleGameStartTouchMove, this);
            this.node.on(cc.Node.EventType.TOUCH_END, this.handleGameStartTouchEnd, this);
        });

        GameEvent.on(GameEventType.GAME_OVER, () => {
            this.node.off(cc.Node.EventType.TOUCH_MOVE, this.handleGameStartTouchMove, this);
            this.node.off(cc.Node.EventType.TOUCH_END, this.handleGameStartTouchEnd, this);

            this.node.on(cc.Node.EventType.TOUCH_END, this.handleGameOverTouchEnd, this);

            cc.director.pause()
        })
    },

    handleGameStartTouchMove: function(e) {
        const d = e.getDelta();
        GameEvent.emit(GameEventType.BRICK_MOVE_X, d.x);
    },

    handleGameStartTouchEnd: function(e) {
        GameEvent.emit(GameEventType.BRICK_MOVE_FINISH);
    },

    handleGameOverTouchEnd: function(e) {
        cc.director.resume();

        GameEvent.emit(GameEventType.BRICK_DESTROY);

        this.scheduleOnce(() => {
            GameEvent.emit(GameEventType.GAME_START);
        }, 1);
    },
});