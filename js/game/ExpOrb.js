ExpOrb = function (params) {
    params.width = 8;
    params.height = 8;
    this.construct(params);
    this.init();
};

ExpOrb.prototype = {
    // backgroundColor: 'yellow',
    level: 0,
    experience: 0,
    movementSpeed: .4,

    init: function() {
        this.expOrb = this.addChild(new CMP.SizedSprite({
            width: 8,
            height: 8,
            image: 'exp',
            x: this.percentageOfWidth(0.5),
            y: this.percentageOfHeight(0.5),
            // scale: 30.75
        }))
    },

}
extend("ExpOrb", "CMP.DisplayObjectContainer");