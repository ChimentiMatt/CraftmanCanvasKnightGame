GameBoard = function (params) {
    params.width = 450;
    params.height = 225;
    this.construct(params);
};

GameBoard.prototype = {
    backgroundColor: 'red',
    alpha: 0.1,
    goblins: [],
    spawnTick: 0,
    spawnInterval: 100,

    customAssets: [
    ],
    customOptions: [
    ],

    init: function() {
        this.addUpdate(this.onUpdate.bind(this));
        this.initKnight();
        this.initSwords();
        this.initGoblins();
        this.movements = this.addChild(new Movements({gameboard: this}))
        this.collisions = this.addChild(new Collisions({gameboard: this}))
        this.attack = this.addChild(new Attack({gameboard: this}))

        CMP.ListenSet("GetSword", this.GetSword.bind(this));
        CMP.ListenSet("GetKnight", this.GetKnight.bind(this));
        CMP.ListenSet("GetGoblin", this.GetGoblin.bind(this));
        CMP.ListenSet("GetGameBoard", this.GetGameBoard.bind(this));
    },

    initKnight: function() {
        this.knight = this.addChild(new Knight({
            // x: this.percentageOfWidth(0.5),
            // y: this.percentageOfHeight(0.5),
            x: 100,
            y: 100,
            gameboard: this,
        }))
    },

    initSwords: function() {
        this.swordRight = this.addChild(new Sword({
            // x: this.percentageOfWidth(0.5),
            // y: this.percentageOfHeight(0.5),
            x: this.knight.x + 8,
            y: this.knight.y + 1,
            rotation: 90,
            visible: true,
            gameboard: this,
        }))
        this.swordLeft = this.addChild(new Sword({
            // x: this.percentageOfWidth(0.5),
            // y: this.percentageOfHeight(0.5),
            x: this.knight.x - 8,
            y: this.knight.y + 1,
            rotation: 90,
            scaleY: -1,
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
                // x: this.percentageOfWidth(0.1),
                // y: this.percentageOfHeight(0.1),
                // x: 40,
                // y: 40,
                x: xLocation,
                y: yLocation,
                gameboard: this
                
            }))
            this.goblins.push(goblin)
            this.spawnTick = 0;

        }

    },


    GetSword: function() {
        return [this.swordRight, this.swordLeft];
    },

    GetKnight: function() {
        return this.knight;
    },

    GetGoblin: function() {
        return this.goblins;
    },

    GetGameBoard: function() {
        return this;
    },

    onUpdate: function({delta}){
        this.initGoblins()
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