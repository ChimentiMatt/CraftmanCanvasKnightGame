Cat = function (params) {
    params.width = 8;
    params.height = 8;
    this.construct(params);
    this.init();
};

Cat.prototype = {
    // backgroundColor: 'teal',
    level: 0,
    experience: 0,
    health: 5,
    movementSpeed: .6,
    xOffset: 8,
    yOffset: 8,
    inAnimation: false,


    init: function() {
        this.addUpdate(this.onUpdate.bind(this));
        this.knight = CMP.DispatchGet({type: "GetKnight"})
        this.gameBoard = CMP.DispatchGet({type: "GetGameBoard"});

        this.cat = this.addChild(new CMP.SizedSprite({
            width: 8,
            height: 8,
            image: 'cat',
            x: this.percentageOfWidth(0.5),
            y: this.percentageOfHeight(0.5),
            // scale: 30.75
        }))
    },
    
    huntGoblins: function() {

    },

    wander: function(delta) {
        this.inAnimation = true;
        let x = 0;
        let y = 0;
        let duration = 0;
        let delay = 0;

        x = Math.floor(Math.random() * (this.gameBoard.width + 0 + 1) + 0);
        y = Math.floor(Math.random() * (this.gameBoard.height + 0 + 1) + 0);
        duration = Math.floor(Math.random() * ( 3 - 1 + 1) + 1 )
        delay = Math.floor(Math.random() * ( 3 - 2 + 1 ) + 1 )
        if (x < 0) x = 10;
        if (y < 0) y = 10;


        this.tweenTo({
            delay: delay,
            duration: duration,
            x: x,
            y: y,
            onComplete: () => {this.inAnimation = false}
        });

    },
    
    onUpdate: function({delta}){
        if (!this.inAnimation){   
            if (!this.gameBoard.paused){
                this.wander();
            }
        }
    },

}
extend("Cat", "CMP.DisplayObjectContainer");