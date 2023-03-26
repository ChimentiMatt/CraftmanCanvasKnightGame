IntroButton = function (params) {
    params.width = 200;
    params.height = 200;
    this.construct(params);
};

IntroButton.prototype = {
    backgroundColor: 'white',

    customAssets: [
    ],
    customOptions: [
    ],

    init: function() {
        this.startText = this.addChild(new CMP.Text({
            x: this.percentageOfWidth(0.5),
            y: this.percentageOfHeight(0.5),
            lineWidth: 290,
            text: "Start Game",
            textAlign: "center",
            textBaseline: "middle",
            font: "28pt arial",
            color: "black"
        }))

        this.addHitArea(this.startGame.bind(this))
    
    },

    startGame: function(){
        this.goToScene("tutorial", SceneConfig.live)
    },

    layout: {
        xPercentage: 0.5,
        yPercentage: 0.5,
        scaleToWidth: .5,
        scaleToHeight: .5
    }
    // layout: 'match'
};
extend("IntroButton", "SceneObject");