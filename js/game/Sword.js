Sword = function (params) {
    params.width = 8;
    params.height = 8;
    this.construct(params);
    this.init();
};

Sword.prototype = {
    // backgroundColor: 'teal',
    equipped: true,
    attackInterval: 0,
    inSwing: false,
    attackSpeed: 200,
    attackDuration: 50,
    xOffset: 8,
    yOffset: 4,

    init: function() {
        this.sword = this.addChild(new CMP.SizedSprite({
            width: 8,
            height: 8,
            image: 'sword',
            x: this.percentageOfWidth(.5),
            y: this.percentageOfHeight(0.5),
            rotation: 0,
            // scale: 30.75
        }))
    },

    AttackPattern: function() {
        // console.log('swing', this.inSwing)
        if (this.equipped){
            this.swords = CMP.DispatchGet({type: "GetSwords"});
            this.attackInterval += 1;

            if (this.attackInterval === this.attackSpeed){
                this.inSwing = true;
                
                this.swords[0].visible = true;
                this.swords[1].visible = true;
                this.attackInterval = 0;
            }
            else if (this.attackInterval === this.attackDuration){
                this.inSwing = false;
                this.swords[0].visible = false;
                this.swords[1].visible = false;
            }
        }
    },


 
}
extend("Sword", "CMP.DisplayObjectContainer");