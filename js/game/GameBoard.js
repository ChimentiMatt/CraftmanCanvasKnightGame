GameBoard = function (params) {
    params.width = 300;
    params.height = 300;
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
        this.movements = this.addChild(new Movements({gameboard: this}))


        CMP.ListenSet("GetSword", this.GetSword.bind(this));
        CMP.ListenSet("GetKnight", this.GetKnight.bind(this));


    },

    initKnight: function() {
        this.knight = this.addChild(new Knight({
            x: this.percentageOfWidth(0.5),
            y: this.percentageOfWidth(0.5),
            gameboard: this
        }))
    },

    initSword: function() {
        this.sword = this.addChild(new Sword({
            x: this.percentageOfWidth(0.5),
            y: this.percentageOfWidth(0.5),
            gameboard: this
        }))
    },

    GetSword: function() {
        return this.sword;
    },

    GetKnight: function() {
        return this.knight;
    },


    layout: {
        useMinScale: false,
        xPercentage: 0.5,
        yPercentage: 0.5,
        scaleToWidth: 1,
        scaleToHeight: 1
    }
    // layout: 'match'
};
extend("GameBoard", "SceneObject");