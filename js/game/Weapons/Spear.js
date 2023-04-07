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
    movesWithPlayer: true,
    attackInterval: 301,
    inSwing: false,
    attackSpeed: 300,
    attackDuration: 50,
    xOffset: 8,
    yOffset: 20,
    collisionCount: 0,
    maxCollisions: 9999,
    equipped: false,
    upgradable: true,
    potentialUpgrades: [
        'duration',
        // 'size'
    ],

    init: function() {
        this.spear = this.addChild(new CMP.SizedSprite({
            width: 4,
            height: 33,
            image: 'spear',
            x: this.percentageOfWidth(.5),
            y: this.percentageOfHeight(0.5),
            rotation: 0,
        }))

        this.equipped = true;
    },

    AttackPattern: function() {
        this.attackInterval += 1;
        this.collisionCount = 0;
        
        if (this.attackInterval >= this.attackSpeed){
            this.inSwing = true;
            this.spear.visible = true;
            this.attackInterval = 0;
        }
        else if (this.attackInterval >= this.attackDuration){
            this.inSwing = false;
            this.spear.visible = false;
        }
    },

    selectPotentialUpgrade:function (){

        let option = Math.floor(Math.random() * (this.potentialUpgrades.length + 0 + 1) + 0);
        this.currentUpgrade = 'duration'
        this.currentUpgradeText = `+ time`
        return `${this.currentUpgrade}  ${this.currentUpgradeText}`;
    },

    implementUpgrade: function() {
        console.log('dur', this.currentUpgrade)

        if (this.currentUpgrade === 'duration') {
         
            this.upgradeDuration();
        }

    },

    upgradeDuration: function() {
        this.attackDuration = 75;
    },


    GetInSwing: function() {
        return this.inSwing;
    },
 
}
extend("Spear", "CMP.DisplayObjectContainer");