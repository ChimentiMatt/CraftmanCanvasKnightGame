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
    projectiles: 1,
    id: 1,
    xOffset: 4.5,
    yOffset: 4.5,
    collisionCount: 0,
    maxCollisions: 2,
    equipped: false,
    upgradable: true,
    potentialUpgrades: [
        'penetration',
        'count'
        // 'size',
    ],
    currentUpgrade: '',
    currentUpgradeText: '',
    // size: 1,
    
    init: function() {
        this.gameBoard = CMP.DispatchGet({type: "GetGameBoard"});
        this.knight = CMP.DispatchGet({type: "GetKnight"});

        if (this.gameBoard.numberOfNinjaStars === 1){
            this.ninjaStar = this.addChild(new CMP.SizedSprite({
                width: 4,
                height: 4,
                image: 'ninjaStar',
                x: this.percentageOfWidth(0.5),
                y: this.percentageOfHeight(0.5),
            }))
        }

        if (this.gameBoard.numberOfNinjaStars === 2){
            this.ninjaStar = this.addChild(new CMP.SizedSprite({
                width: 4,
                height: 4,
                image: 'ninjaStar',
                x: this.percentageOfWidth(0.5),
                y: this.percentageOfHeight(0.5),
            }))
            this.id = 2
            this.x = this.knight.x - 5
            this.y = this.knight.y + 2
        }
        if (this.gameBoard.numberOfNinjaStars === 3){
            this.ninjaStar = this.addChild(new CMP.SizedSprite({
                width: 4,
                height: 4,
                image: 'ninjaStar',
                x: this.percentageOfWidth(0.5),
                y: this.percentageOfHeight(0.5),
            }))
            this.id = 3
            this.x = this.knight.x - 7
            this.y = this.knight.y - 3

        }
        
        this.equipped = true;
        this.visible = false

    },
    

    addThirdProjectileTwo: function() {
        this.ninjaStarTwo = this.addChild(new CMP.SizedSprite({
            width: 4,
            height: 4,
            image: 'ninjaStar',
            x: this.percentageOfWidth(1.5),
            y: this.percentageOfHeight(-0.5),
            rotation: 0,
            // scale: 2.0
        }))
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
                    x:  this.knight.x + this.throwDirection() + this.endPointOffset(),
                    onComplete: () => {
                        this.inSwing = false;
                        this.visible = false;
                        this.collisionCount = 0;
                        this.movesWithPlayer = true;
                        this.x = this.knight.x
                        this.y = this.knight.y
                        
                        // reset positions
                        if (this.id === 2){
                            this.x = this.knight.x + 5
                            this.y = this.knight.y + 2
                        }
                        if (this.id === 3){
                            this.x = this.knight.x + 7
                            this.y = this.knight.y - 3
                        }
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

    endPointOffset: function() {
        if (this.id === 2){
            return +5;
        }
        if (this.id === 3){
            return +7;
        }
        return 0;
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
            this.currentUpgradeText = `Ninja Star: size ${this.size} -> ${this.size + 2} (max 3)` 
        }
        else if (upgradeName === 'count'){
            this.currentUpgradeText = `Ninja Star: projectiles ${this.projectiles} -> ${this.projectiles +1} (max 3)` 
        }
    },

    implementUpgrade: function() {
        if (this.currentUpgrade === 'penetration') this.upgradePenetration();
        if (this.currentUpgrade === 'size') this.upgradeSize();
        if (this.currentUpgrade === 'count') this.upgradeProjectileCount();
    },

    upgradePenetration: function() {
        this.gameBoard = CMP.DispatchGet({type: "GetGameBoard"});
        this.maxCollisions++

        if (this.gameBoard.numberOfNinjaStars >= 2){
            this.gameBoard.ninjaStarTwo.maxCollisions++
        }
        if (this.gameBoard.numberOfNinjaStars === 3){
            this.gameBoard.ninjaStarThree.maxCollisions++
        }
    },

    upgradeSize: function() {
        let originalOffset = 4.5

        this.size += 0.5;
        this.ninjaStar.scale += this.size;
        this.ninjaStar.x = this.percentageOfWidth(0.5)
        this.ninjaStar.y = this.percentageOfHeight(0.5)
        if (this.ninjaStarTwo !== undefined){
            this.ninjaStarTwo.scale += this.size;
            this.ninjaStarTwo.x = this.percentageOfWidth(1)
            this.ninjaStarTwo.y = this.percentageOfHeight(1.5)
        }
        if (this.ninjaStarThree !== undefined){
            this.ninjaStarThree.scale += this.size;
            this.ninjaStarThree.x = this.percentageOfWidth(1.5)
            this.ninjaStarThree.y = this.percentageOfHeight(-0.5)
        }

        this.xOffset = originalOffset * this.size
        this.yOffset = originalOffset * this.size
        this.height = originalOffset * this.size
        this.width = originalOffset * this.size

        if (this.size >= 2){
            for(let i = 0; i < this.potentialUpgrades.length; i++){
                if (this.potentialUpgrades[i] === 'size'){
                    this.potentialUpgrades.splice(i, 1)
                }
            }

        }
    },

    upgradeProjectileCount: function() {
        this.gameBoard = CMP.DispatchGet({type: "GetGameBoard"});

        this.projectiles++
        if (this.projectiles === 2){
            this.gameBoard.initNinjaStarTwo();
        }
        else if (this.projectiles === 3){
            this.gameBoard.initNinjaStarThree();
            for(let i = 0; i < this.potentialUpgrades.length; i++){
                if (this.potentialUpgrades[i] === 'count'){
                    this.potentialUpgrades.splice(i, 1)
                }
            }
            this.currentUpgradeText = ''
        }
    },

    GetInSwing: function() {
        return this.inSwing;
    },
 
}
extend("NinjaStar", "CMP.DisplayObjectContainer");