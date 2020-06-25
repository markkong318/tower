cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function() {
        window.GameEvent = new cc.EventTarget();

        window.GameEventType = {
            BRICK_MOVE_X: 'BRICK_MOVE_X',
            BRICK_MOVE_FINISH: 'BRICK_MOVE_FINISH',
            BRICK_TURN: 'BRICK_TURN',
            BRICK_CHANGE: 'BRICK_CHANGE',
            BRICK_NAME_UPDATE: 'BRICK_NAME_UPDATE',
            BRICK_RING_OUT: 'BRICK_RING_OUT',
            BRICK_DESTROY: 'BRICK_DESTROY',
            GAME_START: 'GAME_START',
            GAME_NEXT: 'GAME_NEXT',
            GAME_OVER: 'GAME_OVER',
        };

        window.NodeEventType = {
        };
    },

    start: function () {
        this.scheduleOnce(() => {
            GameEvent.emit(GameEventType.GAME_START);
        }, 1);
    },
});