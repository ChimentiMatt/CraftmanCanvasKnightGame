NinjaStar = function (params) {
    params.width = 4;
    params.height = 4;
    this.construct(params);
    this.init();
};

NinjaStar.prototype = {
    // backgroundColor: 'teal',
    name: 'ninja star',
    level: 0,
    movesWithPlayer: true,
    attackInterval: 151,
    inSwing: false,
    attackSpeed: 200,
    attackDuration: 100,
    xOffset: 4.5,
    yOffset: 4.5,
    collisionCount: 0,
    maxCollisions: 2,
    
    init: function() {
        this.knight = CMP.DispatchGet({type: "GetKnight"});

        this.ninjaStar = this.addChild(new CMP.SizedSprite({
            width: 4,
            height: 4,
            image: 'ninjaStar',
            x: this.percentageOfWidth(0.5),
            y: this.percentageOfHeight(0.5),
            rotation: 0,
            // scale: 2.0
        }))

        this.visible = false
        this.increaseSize(2)
    },

    AttackPattern: function() {
            this.attackInterval += 1;
            this.inSwing = true;
        
            if (this.attackInterval >= this.attackSpeed){
                this.inSwing = true;
                this.visible = true;
                this.movesWithPlayer = false;

                this.attackInterval = 0;
                this.tweenTo({

                    x:  this.knight.x + this.throwDirection(),
                    onComplete: () => {
                        this.inSwing = false;
                        this.visible = false;
                        this.x = this.knight.x
                        this.y = this.knight.y
                        this.collisionCount = 0;
                        this.movesWithPlayer = true;
                    }
                });
            }
    },

    throwDirection: function() {
        if (this.knight.scaleX === -1){
            return -200
        }
        return 200

    },

    increaseSize: function(value) {
        this.width *= value
        this.height *= value
        this.ninjaStar.width *= value
        this.ninjaStar.height *= value
        this.xOffset *= value /2
        this.yOffset *= value  /2

        this.ninjaStar.x = this.percentageOfWidth(0.5)
        this.ninjaStar.y = this.percentageOfHeight(0.5)
    },

    GetInSwing: function() {
        return this.inSwing;
    },
 
}
extend("NinjaStar", "CMP.DisplayObjectContainer");