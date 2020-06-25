cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function() {
        GameEvent.on(GameEventType.GAME_START, () => {
            this.node.on('click', this.handleClick, this);
        });

        GameEvent.on(GameEventType.GAME_OVER, () => {
            this.node.off('click', this.handleClick, this);
        });
    },

    handleClick: function() {
        GameEvent.emit(GameEventType.BRICK_TURN);
    }
});