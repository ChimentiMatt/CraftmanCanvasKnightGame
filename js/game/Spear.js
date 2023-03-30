Spear = function (params) {
    params.width = 4;
    params.height = 33;
    this.construct(params);
    this.init();
};

Spear.prototype = {
    // backgroundColor: 'teal',
    name: 'spear',
    level: 0,
    // equipped: true,
    attackInterval: 0,
    inSwing: false,
    attackSpeed: 300,
    attackDuration: 150,
    xOffset: 8,
    yOffset: 20,
    
    init: function() {
        this.spear = this.addChild(new CMP.SizedSprite({
            width: 4,
            height: 33,
            image: 'spear',
            x: this.percentageOfWidth(.5),
            y: this.percentageOfHeight(0.5),
            rotation: 0,
            visible: false,
            // scale: 30.75
        }))
    },

    AttackPattern: function() {
        // if (this.equipped){
            this.attackInterval += 1;
            
            if (this.attackInterval >= this.attackSpeed){
                this.inSwing = true;
                this.spear.visible = true;
                this.attackInterval = 0;
            }
            else if (this.attackInterval >= this.attackDuration){
                this.inSwing = false;
                this.spear.visible = false;
            }
        // }
    },

    GetInSwing: function() {
        return this.inSwing;
    },
 
}
extend("Spear", "CMP.DisplayObjectContainer");