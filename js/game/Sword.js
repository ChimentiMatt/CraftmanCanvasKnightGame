Sword = function (params) {
    params.width = 8;
    params.height = 8;
    this.construct(params);
    this.init();
};

Sword.prototype = {
    // backgroundColor: 'teal',
    pressedUp: 0,
    pressedDown: 0,
    pressedLeft: 0,
    pressedRight: 0,
    
    init: function() {
        this.knight = this.addChild(new CMP.SizedSprite({
            width: 8,
            height: 8,
            image: 'sword',
            x: this.percentageOfWidth(0.5),
            y: this.percentageOfHeight(0.5),
            rotation: 0,
            // scale: 30.75
        }))
    },

    SwingSword: function() {
  
    },

 
}
extend("Sword", "CMP.DisplayObjectContainer");