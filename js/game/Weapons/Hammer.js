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
    xOffset: 4,
    yOffset: 4,
    collisionCount: 0,
    maxCollisions: 999,
    equipped: false,
    upgradable: true,
    potentialUpgrades: [
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

        if (this.gameBoard.numberOfHammers === 1){
            this.hammer = this.addChild(new CMP.SizedSprite({
                width: 6,
                height: 6,
                image: 'hammer',
                x: this.percentageOfWidth(0.5),
                y: this.percentageOfHeight(0.5),
            }))
            this.id = 1;

        }

        if (this.gameBoard.numberOfHammers === 2){
            this.hammerTwo = this.addChild(new CMP.SizedSprite({
                width: 6,
                height: 6,
                image: 'hammer',
                x: this.percentageOfWidth(0.5),
                y: this.percentageOfHeight(0.5),
            }))
            this.id = 2;
        }

        // centerX and centerY are how far away the orbit is from the knight
        this.centerX = this.percentageOfWidth(0.5) + 20
        this.centerY = this.percentageOfHeight(0.5) - 20
        this.radius = Math.min(this.centerX, this.centerY) * 0.8
    
        this.removeIfNoMoreUpgrades();
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

    upgradeSize: function(value) {
        this.height *= value
        this.width *= value
        this.hammer.width *=  value
        this.hammer.height *= value
        this.hammer.x = this.percentageOfWidth(0.5)
        this.hammer.y = this.percentageOfHeight(0.5)
        this.xOffset *= value
        this.yOffset *= value
    },

    upgradeProjectileCount: function() {
        this.gameBoard = CMP.DispatchGet({type: "GetGameBoard"});

        this.projectiles++
        if (this.projectiles === 2){
            this.gameBoard.initHammerTwo();
            this.resetHammerPositions();
            
            for(let i = 0; i < this.potentialUpgrades.length; i++){
                if (this.potentialUpgrades[i] === 'count'){
                    this.potentialUpgrades.splice(i, 1)
                }
            }
        }
    },

    resetHammerPositions: function() {
        console.log('test', this.id)
        if (this.id  === 1){
            this.angle = 0;
            this.x = this.knight.x + (this.centerX * Math.cos(this.angle + Math.PI));
            this.y = this.knight.y + (this.centerY * Math.sin(this.angle + Math.PI));
        }
        else if (this.id === 2){
            this.angle = 180;
            this.x = this.knight.x - (this.centerX * Math.cos(this.angle + Math.PI));
            this.y = this.knight.y - (this.centerY * Math.sin(this.angle + Math.PI));
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
        let option = Math.floor(Math.random() * (this.potentialUpgrades.length ) + 0);
        this.currentUpgrade = this.potentialUpgrades[option]
        this.textForUpgrade(this.currentUpgrade)
        return `${this.currentUpgradeText}`;
    },

    textForUpgrade: function(upgradeName) {
        if (upgradeName === 'count'){
            this.currentUpgradeText = `Hammer Count:  ${this.projectiles} -> ${this.projectiles +1} (max 2)` 
        }
    },

    implementUpgrade: function() {
        if (this.currentUpgrade === 'count') this.upgradeProjectileCount();
        this.removeIfNoMoreUpgrades();
    },

    removeIfNoMoreUpgrades: function() {
        this.upgrades = CMP.DispatchGet({type: "GetUpgrades"}) 
        if (this.potentialUpgrades.length === 0){

            for( let i = 0; i < this.upgrades.potentialAdditions.length; i++){
                console.log(this.upgrades.potentialAdditions[i])
                if (this.upgrades.potentialAdditions[i] === "Hammer"){
                    this.upgrades.potentialAdditions.splice(i, 1);
                }
            }
            this.upgrades.potentialAdditions.splice(3, 1);
        }
    },


    GetInSwing: function() {
        return this.inSwing;
    },
 
}
extend("Hammer", "CMP.DisplayObjectContainer");