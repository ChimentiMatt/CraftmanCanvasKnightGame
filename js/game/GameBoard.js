GameBoard = function (params) {
    params.width = 450;
    params.height = 225;
    this.construct(params);
};

GameBoard.prototype = {
    backgroundColor: 'red',
    alpha: 0.1,
    customAssets: [
    ],
    customOptions: [
    ],
    init: function() {
        this.initKnight();
        this.initSwords();
        this.initGoblin();
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
            y: this.knight.y - 2.5,
            rotation: 90,
            visible: true,
            gameboard: this,
        }))
        this.swordLeft = this.addChild(new Sword({
            // x: this.percentageOfWidth(0.5),
            // y: this.percentageOfHeight(0.5),
            x: this.knight.x - 8,
            y: this.knight.y - 2.5,
            rotation: 90,
            scaleY: -1,
            visible: true,
            gameboard: this,
        }))
    },

    
    initGoblin: function() {
        this.goblin = this.addChild(new Goblin({
            // x: this.percentageOfWidth(0.1),
            // y: this.percentageOfHeight(0.1),
            x: 40,
            y: 40,
            gameboard: this
        }))
    },


    GetSword: function() {
        return [this.swordRight, this.swordLeft];
    },

    GetKnight: function() {
        return this.knight;
    },

    GetGoblin: function() {
        return this.goblin;
    },

    GetGameBoard: function() {
        return this;
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