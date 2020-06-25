cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad: function () {
        this.score = 0;

        GameEvent.on(GameEventType.GAME_START, () => {
            this.setScore(1);
        });

        GameEvent.on(GameEventType.GAME_NEXT, () => {
            this.addScore(1);
        });
    },

    setScore: function(score) {
        this.score = score;

        const label = this.getComponent(cc.Label);
        label.string = this.score;
    },

    addScore: function(val) {
        this.score += val;

        const label = this.getComponent(cc.Label);
        label.string = this.score;
    },
});