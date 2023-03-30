Sword = function (params) {
    params.width = 16;
    params.height = 32;
    this.construct(params);
    this.init();
};

Sword.prototype = {
    // backgroundColor: 'teal',
    // name: 'swords',
    level: 0,
    equipped: true,
    attackInterval: 0,
    inSwing: false,
    attackSpeed: 150,
    attackDuration: 10,
    xOffset: 20,
    yOffset: 7,

    init: function() {
        this.sword = this.addChild(new CMP.SizedSprite({
            width: 16,
            height: 32,
            image: 'sword',
            x: this.percentageOfWidth(.5),
            y: this.percentageOfHeight(0.5),
            rotation: 0,
            // scale: 30.75
        }))
    },

    // AttackPattern: function() {
    //     // console.log('swing', this.inSwing)
    //     if (this.equipped){
    //         this.swords = CMP.DispatchGet({type: "GetSwords"});
    //         this.attackInterval += 1;

    //         if (this.attackInterval === this.attackSpeed){
    //             this.inSwing = true;
                
    //             this.swords[0].visible = true;
    //             this.swords[1].visible = true;
    //             this.attackInterval = 0;
    //         }
    //         else if (this.attackInterval === this.attackDuration){
    //             this.inSwing = false;
    //             this.swords[0].visible = false;
    //             this.swords[1].visible = false;
    //         }
    //     }
    // },

    AttackPattern: function() {
        // console.log('swing', this.inSwing)
        if (this.equipped){
            this.attackInterval += 1;

            if (this.attackInterval >= this.attackSpeed){
                this.inSwing = true;
                
                this.sword.visible = true;
                this.attackInterval = 0;
            }
            else if (this.attackInterval >= this.attackDuration){
                this.inSwing = false;
                this.sword.visible = false;
            }
        }
    },

    potentialUpgrades: function() {
        let potentialUpgradesArray = []

        if (this.attackSpeed > 100){
            potentialUpgradesArray.push({text: this.name + ' Attack Speed', value: this.attackSpeed})
        }
        if (this.attackDuration < 100){
            potentialUpgradesArray.push({text: this.name + ' Attack Duration', value: this.attackDuration})
        }
        return [potentialUpgradesArray]
    }


 
}
extend("Sword", "CMP.DisplayObjectContainer");