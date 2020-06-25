cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function() {
        cc.director.getPhysicsManager().enabled = true;

        // cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        //     cc.PhysicsManager.DrawBits.e_pairBit |
        //     cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        //     cc.PhysicsManager.DrawBits.e_jointBit |
        //     cc.PhysicsManager.DrawBits.e_shapeBit
        // ;

        cc.director.getPhysicsManager().gravity= cc.v2(0, -1000);
    },
});