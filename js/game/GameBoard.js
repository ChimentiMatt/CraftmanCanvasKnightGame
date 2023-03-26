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
    },

    initKnight: function() {
        this.knight = this.addChild(new Knight({
            x: this.percentageOfWidth(0.5),
            y: this.percentageOfWidth(0.5),
            gameboard: this
        }))
        console.log(this.knight, 'knight')
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