Background = function (params) {
    params.width = 500;
    params.height = 500;
    // params.backgroundColor = "#63B4F5";
    this.construct(params);
};

Background.prototype = {
    customAssets: [
    ],
    customOptions: [
    ],
    init: function() {
        // this.bg = this.addChild(new CMP.SizedSprite({
        //     width: this.width,
        //     height: this.height,
        //     // image: 'background',
        //     x: this.percentageOfWidth(0.5),
        //     y: this.percentageOfHeight(0.5)
        // }));
    },

    layout: {
        useMinScale: false,
        xPercentage: 0.5,
        yPercentage: 0.5,
        scaleToWidth: 1,
        scaleToHeight: 1
    }
};
extend("Background", "SceneObject");
