cc.Class({
    extends: cc.Component,

    properties: {
        bricks: [cc.Node],
    },

    onLoad: function() {
        this.waiting = false;
        this.over = false;
        this.brick = null;
        
        if (!this.bricks.length) {
            console.error('No template brick');
        }

        GameEvent.on(GameEventType.GAME_START, () => {
            this.over = false;
            this.waiting = false;

            this.createBrick();

            GameEvent.once(GameEventType.BRICK_RING_OUT, () => {
                this.over = true;
                GameEvent.emit(GameEventType.GAME_OVER);
            });
        });

        GameEvent.on(GameEventType.GAME_NEXT, () => {
            this.createBrick();
        });

        GameEvent.on(GameEventType.BRICK_CHANGE, () => {
            this.changeBrick();
        });

        GameEvent.on(GameEventType.BRICK_MOVE_FINISH, () => {
            if (this.waiting) {
                return;
            }
            
            this.waiting = true;
            
            this.scheduleOnce(() => {
                if (this.over) {
                    return;
                }

               GameEvent.emit(GameEventType.GAME_NEXT);

               this.waiting = false;
           }, 2);
        });

    },

    createBrick: function() {
        const idx = Math.floor(Math.random() * this.bricks.length);
        const brick = this.bricks[idx];

        const parent = cc.find('Canvas/Brick');

        const node = cc.instantiate(brick);
        node.parent = parent;
        node.scale = 1 + Math.random() * 2;
        node.active = true;

        node.x = 0;
        node.y = Camera.y + Camera.width / 2 * 0.7;

        const brickMove = node.getComponent('brick-move');
        const name = brickMove.nickname;

        GameEvent.emit(GameEventType.BRICK_NAME_UPDATE, name);

        const collider = node.getComponent(cc.PhysicsPolygonCollider);
        collider.density = 0.7;

        this.brick = node;
    },

    changeBrick: function() {
        this.brick.destroy();
        this.createBrick();
    },
});