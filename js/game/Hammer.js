Hammer = function (params) {
    params.width = 6;
    params.height = 6;
    this.construct(params);
    this.init();
};

Hammer.prototype = {
    // backgroundColor: 'teal',
    name: 'hammer',
    movesWithPlayer: true,
    attackInterval: 151,
    inSwing: true,
    attackSpeed: 200,
    attackDuration: 100,
    projectiles: 1,
    id: 1,
    xOffset: 4.5,
    yOffset: 4.5,
    collisionCount: 0,
    maxCollisions: 999,
    equipped: false,
    upgradable: true,
    potentialUpgrades: [
        'penetration',
        'count'
    ],
    currentUpgrade: '',
    currentUpgradeText: '',

    speed: .05,
    centerX: 0,
    centerY: 0,
    radius: 0,
    angle: 0,


    
    init: function() {
        this.gameBoard = CMP.DispatchGet({type: "GetGameBoard"});
        this.knight = CMP.DispatchGet({type: "GetKnight"});

        this.hammer = this.addChild(new CMP.SizedSprite({
            width: 6,
            height: 6,
            image: 'hammer',
            x: this.percentageOfWidth(0.5),
            y: this.percentageOfHeight(0.5),
        }))

        // centerX and centerY are how far away the orbit is from the knight
        this.centerX = this.percentageOfWidth(0.5) + 20
        this.centerY = this.percentageOfHeight(0.5) - 20
        this.radius = Math.min(this.centerX, this.centerY) * 0.8


    },

    AttackPattern: function() {
        this.angle += this.speed;
  
        this.x = this.knight.x + (this.centerX * Math.cos(this.angle + Math.PI));
        this.y = this.knight.y + (this.centerY * Math.sin(this.angle + Math.PI));

        
        this.tweenTo({
            loop: true,
            duration: 15,
            rotation: 360
        });

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

    // AttackPattern: function() {
    //         this.attackInterval += 1;
    //         this.inSwing = true;
        
    //         if (this.attackInterval >= this.attackSpeed){
    //             this.inSwing = true;
    //             this.visible = true;
    //             this.movesWithPlayer = true;

    //             this.attackInterval = 0;

    //         }
    // },

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
        return `${this.currentUpgradeText}`;
    },

    textForUpgrade: function(upgradeName) {
        // if (upgradeName === 'penetration'){
        //     this.currentUpgradeText = `Ninja Star: penetration ${this.maxCollisions} -> ${this.maxCollisions + 1} `
        // }
        // else if (upgradeName === 'size'){
        //     this.currentUpgradeText = `Ninja Star: size ${this.size} -> ${this.size + 2} (max 3)` 
        // }
        // else if (upgradeName === 'count'){
        //     this.currentUpgradeText = `Ninja Star: projectiles ${this.projectiles} -> ${this.projectiles +1} (max 3)` 
        // }
    },

    implementUpgrade: function() {
        // if (this.currentUpgrade === 'penetration') this.upgradePenetration();
        // if (this.currentUpgrade === 'size') this.upgradeSize();
        // if (this.currentUpgrade === 'count') this.upgradeProjectileCount();
    },



    GetInSwing: function() {
        return this.inSwing;
    },
 
}
extend("Hammer", "CMP.DisplayObjectContainer");