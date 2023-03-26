TutorialModal = function (params) {
    params.width = 200;
    params.height = 200;
    this.construct(params);
};

TutorialModal.prototype = {
    backgroundColor: 'black',
    // alpha: 0.1,
    customAssets: [
    ],
    customOptions: [
    ],
    init: function() {
        this.initKnight();
    },

    initKnight: function() {
        this.knight = this.addChild(new Knight({
            width: 130,
            height: 500,
            x: 500,
            y: 410,
            gameboard: this
        }))
        console.log(this.knight, 'knight')
    },

    layout: {
        // useMinScale: false,
        // useMinScale: false,
        xPercentage: 0.5,
        yPercentage: 0.5,
        scaleToWidth: .8,
        scaleToHeight: .4
    }
};
extend("TutorialModal", "SceneObject");