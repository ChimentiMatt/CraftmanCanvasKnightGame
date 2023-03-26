AutomatedTester = function (params) {
    this.construct(params);
    this.init();
};

AutomatedTester.prototype = {
    init: function() {
        console.log("creating AutomatedTester");
        CMP.Listen("AutomateTesting", this.AutomateTesting.bind(this));
    },

    AutomateTesting: function() {
        this.checkAnalyticValues();
        this.checkImages();
        this.UpdateDrawnObjectCount();
        CMP.Listen("UpdateDrawnObjectCount", this.UpdateDrawnObjectCount.bind(this));
    },

    checkAnalyticValues: function() {
        //Check for CREATIVE_NAME, CAMPAIGN, and ADVERTISER values in the AppConfig, as these are necessary for analytics
        if (!AppConfig.CREATIVE_NAME || AppConfig.CREATIVE_NAME == "Insert Creative Name Here") {
            console.log('%cATS: Please define a CREATIVE_NAME in the AppConfig.', 'color: red;');
        }
        if (!AppConfig.CAMPAIGN || AppConfig.CAMPAIGN == "Insert Campaign Here") {
            console.log('%cATS: Please define a CAMPAIGN in the AppConfig.', 'color: red;');
        }
        if (!AppConfig.ADVERTISER || AppConfig.ADVERTISER == "Insert Advertiser Here") {
            console.log('%cATS: Please define a ADVERTISER in the AppConfig.', 'color: red;');
        }
    },

    checkImages: function() {
        //Checks to see if any images are too large
        let images = CMP.App.assetManager.images;
        for (let i in images) {
            let image = images[i];
            if (image.img.width > 1024 || image.img.height > 1024) {
                console.log('%cATS: Image "' + i + '" has a width and/or height that is too large. Please resize.', 'color: red;');
            }
        }
    },

    UpdateDrawnObjectCount: function() {
        //Get the scene data. The parent of these children is the one with the name of the scene, so everything drawn to the screen must be inside this
        let sceneObjects = CMP.App.stage.children[0].children[0].children[0].children[0].children;
        // console.log(sceneObjects);
        let drawnObjectCount = 0;
        for (let i = 0; i < sceneObjects.length; i++) {
            let sceneObject = sceneObjects[i];
            drawnObjectCount += this.checkObject(sceneObject);
            //Check to see if any scene object is larger than 1024
            if (sceneObject.children.length > 0 && (sceneObject.children[0].width > 1024 || sceneObject.children[0].height > 1024)) {
                let name = sceneObject.children[0]._globalName;
                console.log('%cATS: Scene Object "' + name + '" has a width and/or height that is too large. Please resize.', 'color: red;');
            }
        }
        console.log("ATS: Drawn object count is " + drawnObjectCount);
    },

    checkObject: function(object) {
        let count = 0;
        if (object.visible && object.width && object.height) {
            count++;
            if (object.children) {
                for (let i = 0; i < object.children.length; i++) {
                    count += this.checkObject(object.children[i]);
                }
            }
        }
        return count;
    }
};
extend("AutomatedTester", "CMP.DisplayObjectContainer");
setTimeout(function(){new AutomatedTester();}, 1);

// !function() {
//     new AutomatedTester
// }();