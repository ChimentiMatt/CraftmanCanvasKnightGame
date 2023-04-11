Goblin = function (params) {
    params.width = 8;
    params.height = 8;
    this.construct(params);
    this.init();
};

Goblin.prototype = {
    // backgroundColor: 'teal',
    health: 2,
    invulnerable: false,
    moveSpeed: .015,

    init: function() {
        // this.goblin = this.addChild(new CMP.SizedSprite({
        //     width: 8,
        //     height: 8,
        //     image: 'goblin',
        //     x: this.percentageOfWidth(0.5),
        //     y: this.percentageOfHeight(0.5),
        //     // scale: 30.75
        // }))

        this.goblin = this.addChild(new CMP.ImageSequence({
            prepend: "gWalk_",
            totalFrames: 2,
            fps: 2,
            width: 8,
            height: 8,
            x: this.percentageOfWidth(0.5),
            y: this.percentageOfHeight(0.5),
            startAtOne: true,
            addZero: false,
            visible: true,
            loop: true
        }))
        this.goblin.playFromFrame(1);
        this.addUpdate(this.onUpdate.bind(this));

    },




    onUpdate: function({delta}){

    },

}
extend("Goblin", "CMP.DisplayObjectContainer");