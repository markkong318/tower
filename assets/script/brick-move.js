cc.Class({
    extends: cc.Component,

    properties: {
        nickname: '',
    },

    start: function () {
        this.rigidBody = this.getComponent(cc.RigidBody);
        this.rigidBody.gravityScale = 0;

        GameEvent.on(GameEventType.BRICK_MOVE_X, this.moveX, this);
        GameEvent.on(GameEventType.BRICK_MOVE_FINISH, this.moveFinish, this);
        GameEvent.on(GameEventType.BRICK_TURN, this.turn, this);
        GameEvent.on(GameEventType.BRICK_DESTROY, this.playDestroy, this);

        this.playStart();
    },

    update: function() {
        if (this.node.y < - Canvas.height / 2) {
            GameEvent.emit(GameEventType.BRICK_RING_OUT);
        }
    },

    moveX: function(dx) {
        this.node.x += dx;

        if (this.node.x > Canvas.width / 2) {
            this.node.x = Canvas.width / 2;
        }

        if (this.node.x < - Canvas.width / 2) {
            this.node.x = - Canvas.width / 2;
        }
    },

    moveFinish: function() {
        this.rigidBody.gravityScale = 1;

        GameEvent.off(GameEventType.BRICK_MOVE_X, this.moveX, this);
        GameEvent.off(GameEventType.BRICK_MOVE_FINISH, this.moveFinish, this);
        GameEvent.off(GameEventType.BRICK_TURN, this.turn, this);

        this.schedule(() => {
            if (this.node.y < - Canvas.height / 2) {
                GameEvent.emit(GameEventType.BRICK_RING_OUT);
            }
        }, 1);

        this.node.opacity = 180;
    },

    turn: function() {
        this.node.rotation = (this.node.rotation + 45) % 360;
    },

    playStart: function() {
        const scale = this.node.scale;
        const rotation = 360;

        this.node.scale = 0;
        this.node.rotation = 0;

        cc.tween(this.node)
            .to(0.75, { scale, rotation })
            .call(() => {
                this.node.rotation = 0;
            })
            .start();
    },

    playDestroy: function() {
        const scale = 0;
        const rotation = 720;

        cc.tween(this.node)
            .to(0.75, { scale, rotation })
            .call(() => {
                this.node.destroy();
            })
            .start();
    },
});