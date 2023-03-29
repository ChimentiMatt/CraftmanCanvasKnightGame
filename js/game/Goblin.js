Goblin = function (params) {
    params.width = 8;
    params.height = 8;
    this.construct(params);
    this.init();
};

Goblin.prototype = {
    // backgroundColor: 'teal',
    pressedUp: 0,
    pressedDown: 0,
    pressedLeft: 0,
    pressedRight: 0,

    
    init: function() {
        this.sword = CMP.DispatchGet({type: "GetSword"})

        this.goblin = this.addChild(new CMP.SizedSprite({
            width: 8,
            height: 8,
            image: 'goblin',
            x: this.percentageOfWidth(0.5),
            y: this.percentageOfHeight(0.5),
            // scale: 30.75
        }))

        this.addUpdate(this.onUpdate.bind(this));

    },

    knightSwordCollision: function() {
        // console.log(this.goblin.x, sword.x)
        if (this.goblin.x -4 >= this.sword.x - 8 && this.goblin.x + 4 <= this.sword.x + 8){
            if (this.goblin.y -4 >= this.sword.y - 8 && this.goblin.y + 4 <= this.sword.y + 8){
                console.log('hit')
            }
        }
    },
    
    onUpdate: function({delta}){
        this.knightSwordCollision();
    },

}
extend("Goblin", "CMP.DisplayObjectContainer");