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
    tick: 0,
    lifeTime: 1000,

    init: function() {
        this.addUpdate(this.onUpdate.bind(this));

        this.expOrb = this.addChild(new CMP.SizedSprite({
            width: 8,
            height: 8,
            image: 'exp',
            x: this.percentageOfWidth(0.5),
            y: this.percentageOfHeight(0.5),
            // scale: 30.75
        }))
    },

    disappear: function() {
        this.visible = false;
    },

    onUpdate: function({delta}){
        this.tick++;
        if (this.tick >= this.lifeTime){
            this.disappear();
            this.tick = 0;
        }
    },

}
extend("ExpOrb", "CMP.DisplayObjectContainer");