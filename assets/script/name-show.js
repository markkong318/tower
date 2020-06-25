cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad: function () {
        const label = this.getComponent(cc.Label);

        GameEvent.on(GameEventType.BRICK_NAME_UPDATE, (name) => {
            label.string = name;
        });
    },
});