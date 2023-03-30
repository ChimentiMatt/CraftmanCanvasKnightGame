GameBoard = function (params) {
    params.width = 450;
    params.height = 225;
    this.construct(params);
};

GameBoard.prototype = {
    backgroundColor: 'red',
    alpha: 0.1,
    goblins: [],
    expOrbs: [],
    spawnTick: 0,
    spawnInterval: 20,
    paused: false,

    customAssets: [
    ],
    customOptions: [
    ],

    init: function() {
        CMP.ListenSet("GetGameBoard", this.GetGameBoard.bind(this));
        CMP.ListenSet("GetSwords", this.GetSwords.bind(this));
        CMP.ListenSet("GetWeapons", this.GetWeapons.bind(this));
        CMP.ListenSet("GetCompanions", this.GetCompanions.bind(this));
        CMP.ListenSet("GetKnight", this.GetKnight.bind(this));
        CMP.ListenSet("GetGoblin", this.GetGoblin.bind(this));
        CMP.ListenSet("GetHealth", this.GetHealth.bind(this));
        CMP.ListenSet("GetExperienceGage", this.GetExperienceGage.bind(this));
        CMP.ListenSet("GetInSwingSword", this.GetInSwingSword.bind(this));

        this.initKnight();
        this.initSwords();
        this.initSpear();
        this.initCat();
        this.initGoblins();
        this.initHealth();
        this.initExperienceGage();
        
        this.levelUpScreen = this.addChild(new LevelUpScreen({gameboard: this}));  
        this.movements = this.addChild(new Movements({gameboard: this}));
        this.attack = this.addChild(new Attack({gameboard: this}));
        this.collisions = this.addChild(new Collisions({gameboard: this}));  
        this.upgrades = this.addChild(new Upgrades({gameboard: this}));  

        this.addUpdate(this.onUpdate.bind(this));
    },

    initKnight: function() {
        this.knight = this.addChild(new Knight({
            x: this.width / 2,
            y: this.height / 2,
            gameboard: this,
        }))
    },

    initSwords: function() {
        this.swordRight = this.addChild(new Sword({
            name: 'sword left',
            x: this.knight.x + 24,
            y: this.knight.y + 1,
            rotation: 90,
            visible: true,
            gameboard: this,
        }))
        this.swordLeft = this.addChild(new Sword({
            name: 'sword right',
            x: this.knight.x - 24,
            y: this.knight.y + 1,
            rotation: 90,
            scaleY: -1,
            visible: true,
            gameboard: this,
        }))
    },

    initSpear: function() {
        this.spear = this.addChild(new Spear({
            name: 'spear',
            x: this.knight.x,
            y: this.knight.y,
            visible: true,
            gameboard: this,
        }))
    },

    initCat: function() {
        this.cat = this.addChild(new Cat({
            name: 'cat',
            x: this.width / 2 + 20,
            y: this.height / 2,
            visible: true,
            gameboard: this,
        }))
    },
    
    initGoblins: function() {
        let quadrant = Math.floor(Math.random() * (3 - 0 + 1) + 0);
        let xLocation;
        let yLocation;
       
        if (quadrant === 0){ // left of screen spawn
            xLocation = 0;
            yLocation = Math.floor(Math.random() * (this.height - 0) + 0);
        }
        else if (quadrant === 1){ // right of screen spawn
            xLocation = this.width;
            yLocation = Math.floor(Math.random() * (this.height - 0) + 0);
        }
        else if (quadrant === 2){ // top of screen spawn
            xLocation = Math.floor(Math.random() * (this.width - 0 + 1) + 0);
            yLocation = 0;
        }
        else if (quadrant === 3){ // bottom of screen spawn
            xLocation = Math.floor(Math.random() * (this.width - 0 + 1) + 0);
            yLocation = this.height
        }
  
        this.spawnTick++;
        if (this.spawnTick >= this.spawnInterval){
            let goblin = this.addChild(new Goblin({
                x: xLocation,
                y: yLocation,
                gameboard: this
            }))
            this.goblins.push(goblin)
            this.spawnTick = 0;

            if (this.spawnTick < 100) { // make more goblins appear over time
                this.spawnTick ++
                // console.log('tick increase')
            }
        }

    },

    initHealth: function() {
        this.healthText = this.addChild(new CMP.Text({
            x: this.percentageOfWidth(0.5),
            y: this.percentageOfHeight(0.95),
            lineWidth: 290,
            text: 'health: 5',
            textAlign: "center",
            textBaseline: "middle",
            font: "5pt arial",
            color: "black"
        }));
    },

    initExperienceGage: function() {
        this.experienceGage = this.addChild(new CMP.Text({
            x: this.percentageOfWidth(0.5),
            y: this.percentageOfHeight(0.02),
            lineWidth: 290,
            text: `exp: ${this.knight.experience}`,
            textAlign: "center",
            textBaseline: "middle",
            font: "5pt arial",
            color: "black"
        }));
    },

    dropExpOrb: function(x, y) {
        let gameBoard = CMP.DispatchGet({type: "GetGameBoard"});

        let expOrb = this.addChild(new ExpOrb({
            x: x,
            y: y,
            gameboard: this
        }))
        gameBoard.expOrbs.push(expOrb);
    },


    GetSwords: function() {
        return [this.swordRight, this.swordLeft];
    },

    GetWeapons: function() {
        return [this.swordRight, this.swordLeft, this.spear];
    },

    GetInSwingSword: function() {
        return this.swordRight.inSwing;
    },

    GetKnight: function() {
        return this.knight;
    },

    GetGoblin: function() {
        return this.goblins;
    },

    GetCompanions: function() {
        return [this.cat]
    },

    GetHealth: function() {
        return this.healthText;
    },

    GetExperienceGage: function() {
        return this.experienceGage;
    },

    GetGameBoard: function() {
        return this;
    },

    onUpdate: function({delta}){
        if (!this.paused){
            this.initGoblins()
        }
    },

    layout: {
        // useMinScale: false,
        xPercentage: 0.5,
        yPercentage: 0.5,
        scaleToWidth: 1,
        scaleToHeight: 1
    }
    // layout: 'match'
};
extend("GameBoard", "SceneObject");