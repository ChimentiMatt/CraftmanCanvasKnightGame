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
        this.initSword();
        this.initGoblin();
        this.movements = this.addChild(new Movements({gameboard: this}))

        CMP.ListenSet("GetSword", this.GetSword.bind(this));
        CMP.ListenSet("GetKnight", this.GetKnight.bind(this));
        CMP.ListenSet("GetGoblin", this.GetGoblin.bind(this));
    },

    initKnight: function() {
        this.knight = this.addChild(new Knight({
            x: this.percentageOfWidth(0.5),
            y: this.percentageOfHeight(0.5),
            gameboard: this
        }))
    },

    initSword: function() {
        this.sword = this.addChild(new Sword({
            x: this.percentageOfWidth(0.5),
            y: this.percentageOfHeight(0.5),
            gameboard: this
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
        return this.sword;
    },

    GetKnight: function() {
        return this.knight;
    },

    GetGoblin: function() {
        return this.goblin;
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