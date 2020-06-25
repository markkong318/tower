cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function() {
        this.speed = 0.5;
    },

    update: function() {
        this.node.x -= this.speed;

        const size = this.node.getBoundingBox();

        if (this.node.x < - Canvas.width / 2 - size.width / 2 ) {
            this.node.x = Canvas.width / 2 + size.width / 2;
        }
    },
});