Intro = function (params) {
    params.width = 200;
    params.height = 200;
    this.construct(params);
};

Intro.prototype = {
    backgroundColor: 'red',
    // alpha: 0.1,
    customAssets: [
    ],
    customOptions: [
    ],
    init: function() {


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
extend("Intro", "SceneObject");