cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function () {
        this.node.opacity = 0;

        GameEvent.on(GameEventType.GAME_OVER, () => {
           this.show();
        });

        GameEvent.on(GameEventType.GAME_START, () => {
            this.hide();
        });
    },

    show: function () {
        this.node.opacity = 255;
    },

    hide: function () {
        this.node.opacity = 0;
    },

});