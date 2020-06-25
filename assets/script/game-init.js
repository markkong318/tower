cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function() {
        window.Canvas = cc.find('Canvas');
        window.Camera = cc.find('Canvas/Main Camera');
    },
});