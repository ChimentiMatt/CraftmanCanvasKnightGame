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
            // image: 'knight',
            x: this.percentageOfWidth(0.5),
            y: this.percentageOfHeight(0.5),
        }))

        this.initAnimations();
        // this.walkingAnimation.playFromFrame(1);
    },

    handleWalkAnimations: function(walkingBool) {
        if (walkingBool) {
            this.standingAnimation.visible = false;
            this.walkingAnimation.visible = true;
        }
        else {
            this.standingAnimation.visible = true;
            this.walkingAnimation.visible = false;
        }
    },

    initAnimations: function() {
        this.walkingAnimation = this.addChild(new CMP.ImageSequence({
            prepend: "walk_",
            totalFrames: 1,
            fps: 1,
            width: 8,
            height: 8,
            x: this.percentageOfWidth(0.5),
            y: this.percentageOfHeight(0.5),
            startAtOne: true,
            addZero: false,
            visible: false,
            loop: true,
        }))
        this.standingAnimation = this.addChild(new CMP.ImageSequence({
            prepend: "stand_",
            totalFrames: 1,
            fps: 1,
            width: 8,
            height: 8,
            x: this.percentageOfWidth(0.5),
            y: this.percentageOfHeight(0.5),
            startAtOne: true,
            addZero: false,
            visible: true
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