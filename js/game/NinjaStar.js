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
    size: 1,
    equipped: false,
    upgradable: true,
    potentialUpgrades: [
        'penetration',
        'size'
    ],
    currentUpgrade: '',
    currentUpgradeText: '',
    
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

        this.equipped = true;
        this.visible = false
        // this.upgradeSize(5)
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

    selectPotentialUpgrade:function (){
        let option = Math.floor(Math.random() * (this.potentialUpgrades.length + 0 ) + 0);
        this.currentUpgrade = this.potentialUpgrades[option]
        this.textForUpgrade(this.currentUpgrade)

        // this.currentUpgrade = 'penetration'
        // this.currentUpgradeText = `Ninja Star: penetration ${this.maxCollisions} -> ${this.maxCollisions + 1}`
        return `${this.currentUpgradeText}`;
    },

    textForUpgrade: function(upgradeName) {
        if (upgradeName === 'penetration'){
            this.currentUpgradeText = `Ninja Star: penetration ${this.maxCollisions} -> ${this.maxCollisions + 1} `
        }
        else if (upgradeName === 'size'){
            this.currentUpgradeText = `Ninja Star: increase size ${this.size} -> ${this.size +1} (max 4)` 
        }
    },

    implementUpgrade: function() {
        if (this.currentUpgrade === 'penetration') this.upgradePenetration();
        if (this.currentUpgrade === 'size') this.upgradeSize();
    },

    upgradePenetration: function() {
        this.maxCollisions++
    },

    upgradeSize: function() {
        let originalOffset = 4.5

        this.size++;
        this.ninjaStar.scale += this.size;
        this.xOffset = originalOffset * this.size
        this.yOffset = originalOffset * this.size
        this.height = originalOffset * this.size
        this.width = originalOffset * this.size
        this.ninjaStar.x = this.percentageOfWidth(0.5)
        this.ninjaStar.y = this.percentageOfHeight(0.5)

        if (this.size === 4){
            for(let i = 0; i < this.potentialUpgrades.length; i++){
                if (this.potentialUpgrades[i] === 'size'){
                    this.potentialUpgrades.splice(i, 1)
                }
            }
        }

        // this.width *= value
        // this.height *= value
        // this.ninjaStar.width *= value
        // this.ninjaStar.height *= value
        // this.xOffset *= value /2
        // this.yOffset *= value  /2

        // this.ninjaStar.x = this.percentageOfWidth(0.5)
        // this.ninjaStar.y = this.percentageOfHeight(0.5)
    },

    GetInSwing: function() {
        return this.inSwing;
    },
 
}
extend("NinjaStar", "CMP.DisplayObjectContainer");