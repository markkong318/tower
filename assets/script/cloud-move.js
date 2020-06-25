cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function() {
        this.speed = 0.5;

        console.log('canvas w: ' + Canvas.width);
        console.log('node w: ' + this.node.width);


    },

    update: function() {
        this.node.x -= this.speed;

        const size = this.node.getBoundingBox();

        if (this.node.x < - Canvas.width / 2 - size.width / 2 ) {
            this.node.x = Canvas.width / 2 + size.width / 2;
        }
    },
});