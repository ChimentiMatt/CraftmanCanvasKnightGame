SceneObject = function (params) {
    this.construct(params);
    this.init();
};
SceneObject.prototype = {
    customAssets: [],
    customOptions: [],
    dependencies: [],
    transitionDuration: 0,  // default transition duration

    init: function()
    {
    },

    getName: function() {
        return this._globalName;
    },

    setSceneConfig: function(sceneConfig)
    {
       this.sceneConfig = sceneConfig
    },

    introduceToNeighbors: function(sceneObjs)
    {
        sceneObjs[this.getName()] = this;
    },


    /*getCustomAssets: function()
    {
        let returnArr = [];
        for(let i=0; i<this.customAssets.length; i++) { 
            let imgId = this.customAssets[i].image;
            let imgConfig = AppConfig.CUSTOMIZABLE.find(image => image.id === imgId)
            returnArr.push(imgConfig)
        }
        //console.log(returnArr)
        return returnArr
    },

    getCustomOptions: function()
    {
        let returnArr = [];
        for(let i=0; i<this.customOptions.length; i++) { 
            let optionId = this.customOptions[i];
            let optionConfig = AppConfig.CUSTOM_OPTIONS.find(option => option.id === optionId)
            returnArr.push(optionConfig)
        }
        //console.log(returnArr)
        return returnArr
    },*/

    getSceneConfig: function()
    {
        return {
            'CUSTOM_ASSETS' : this.customAssets,
            'CUSTOM_OPTIONS' : this.customOptions
        }
    },

    setMouseEnabled: function(value)
    {
        this.mouseEnabled = value;
    },

    /*
    * PARAM 1: the longest transitionDuration of all SceneObjects in the prev scene
    * PARAM 2: the rate at which the transition happens (0.01 is instant, 1 is no change),
    *           if you are using tweens, make sure you multiply by rate 
    * Overwrite this function if you want to execute code at the beginning of the scene
    * Must check if SceneConfig.live is true first!!!
    */
    transitionIn: function(longestDuration, rate)
    {

    },

    /*
    * PARAM: the rate at which the transition happens (0.01 is instant, 1 is no change),
    *           if you are using tweens, make sure you multiply by rate
    * Overwrite this function if you want to execute code at the end of the scene
    * Must call this.markForRemoval() if you overwrite this fn!!!
    * Must set transitionDuration BEFORE this function is called!!!
    */
    transitionOut: function(rate)
    {
        this.markForRemoval();
    },

    /*
    * RETURN: data that you want to pass onto the next scene, probably best as {}
    * Overwrite this function if you want to send data to the next scene (e.g. score)
    */
    getData: function()
    {

    },


    /*
    * PARAM: the data passed in from the prev scene
    * Overwrite this function if you want to do something with the data passed in from the prev scene.
    */
    setData: function(data)
    {

    },

    /*
    * PARAM: Object containing all SceneObjects in this scene, formatted as { className : SceneObject }
    * Overwrite this function if you need access to the other classes in the scene
    * Access other classes in the scene by calling sceneObjs[className]
    */
    setNeighbors: function(sceneObjs) 
    {

    },

    /*
    * Overwrite this function if you need to reset options/change code on update (self-serve)
    */
    refresh: function()
    {

    }
};
extend("SceneObject", "CMP.DisplayObjectContainer");