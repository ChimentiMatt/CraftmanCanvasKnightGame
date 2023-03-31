Knight = function (params) {
    params.width = 8;
    params.height = 8;
    this.construct(params);
    this.init();
};

Knight.prototype = {
    // backgroundColor: 'blue',
    level: 0,
    experience: 0,
    pointsNeededToLevel: 5,
    health: 5,
    movementSpeed: 1,

    init: function() {
        this.gameBoard = CMP.DispatchGet({type: "GetGameBoard"});
        this.addUpdate(this.onUpdate.bind(this));
        
        this.knight = this.addChild(new CMP.SizedSprite({
            width: 8,
            height: 8,
            image: 'knight',
            x: this.percentageOfWidth(0.5),
            y: this.percentageOfHeight(0.5),
        }))
    },

    levelUpCheck: function() {
        if (this.experience >= this.pointsNeededToLevel){
            this.levelUp();
        }
    },

    levelUp: function() {
        this.gameBoard.paused = true;
        this.experience = 0;
        this.pointsNeededToLevel *= 1.25
        // this.gameBoard.inLevelUpScreen = true;
        
    },

    onUpdate: function({delta}){
        this.levelUpCheck();
    },

}
extend("Knight", "CMP.DisplayObjectContainer");