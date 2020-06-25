cc.Class({
    extends: cc.Component,

    properties: {},

    start: function() {
        this.count = 10;

        this.label = this.node.children[0].children[0].getComponent(cc.Label);
        this.label.string = `change-${this.count}`;

        this.button = this.node.getComponent(cc.Button);
        this.button.interactable = this.count > 0;

        GameEvent.on(GameEventType.GAME_START, () => {
            this.count = 10;
            this.label.string = `change-${this.count}`;

            this.node.on('click', this.handleClick, this);
        });

        GameEvent.on(GameEventType.GAME_OVER, () => {
            this.node.off('click', this.handleClick, this);
        });
    },

    handleClick: function() {
        if (!this.count) {
            return;
        }

        this.count--;

        this.label.string = `change-${this.count}`;
        this.button.interactable = this.count > 0;

        GameEvent.emit(GameEventType.BRICK_CHANGE);
    },
});