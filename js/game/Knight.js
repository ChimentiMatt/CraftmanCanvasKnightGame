Knight = function (params) {
    params.width = 8;
    params.height = 8;
    this.construct(params);
    this.init();
};

Knight.prototype = {
    level: 0,
    experience: 0,
    health: 5,
    movementSpeed: .4,

    init: function() {
        this.gameBoard = CMP.DispatchGet({type: "GetGameBoard"});
        this.addUpdate(this.onUpdate.bind(this));

        this.knight = this.addChild(new CMP.SizedSprite({
            width: 8,
            height: 8,
            image: 'knight',
            x: this.percentageOfWidth(0.5),
            y: this.percentageOfHeight(0.5),
            // scale: 30.75
        }))
        console.log('gameb', this.gameBoard)
    },

    levelUpCheck: function() {
        if (this.experience === 2){
            this.levelUp();
        }
    },

    levelUp: function() {
        this.gameBoard.paused = true;
        console.log('level up')
        
    },

    onUpdate: function({delta}){
        this.levelUpCheck();
    },

}
extend("Knight", "CMP.DisplayObjectContainer");