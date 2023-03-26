Knight = function (params) {
    params.width = 8;
    params.height = 8;
    this.construct(params);
    this.init();
};

Knight.prototype = {
    // backgroundColor: 'teal',

    init: function() {
        this.knight = this.addChild(new CMP.SizedSprite({
            width: 8,
            height: 8,
            image: 'knight',
            x: this.percentageOfWidth(0.5),
            y: this.percentageOfHeight(0.5),
            // scale: 30.75
        }))
    }
}
extend("Knight", "CMP.DisplayObjectContainer");