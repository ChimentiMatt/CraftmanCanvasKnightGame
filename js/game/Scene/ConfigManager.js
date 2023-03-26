ConfigManager = function (params)
{
    this.construct(params);
	this.init();
};

ConfigManager.prototype =
{
    customAssets: [
    ],

    customOptions: [
    ],

    customButtons: {
    },

    customButtonCount: 0,
    staticIdsCount: 0,

	init: function()
	{
        this.updateManager = new UpdateManager({
            getCustomButtons:this.getCustomButtons.bind(this)
        })
    },

    compileCust: function(scenes)
    {
        // go thru all scenes and compile custom assets/opts
        for(var scene in scenes) {
            for(let i=0; i<scenes[scene].children.length; i++) {
                let custAssets = scenes[scene].children[i].type.prototype.customAssets;
                for(let j=0; j<custAssets.length; j++) {
                    let assetExists = typeof this.customAssets.find(
                        asset => asset.id === custAssets[j].id) !== 'undefined';
                    this.updateAssetData(
                        custAssets[j].id, 
                        true, 
                        undefined, 
                        CMP.App.assetManager.getAssetSize(custAssets[j].id, custAssets[j].assetType),
                        custAssets[j].key,
                        custAssets[j].url,
                        custAssets[j].src
                    );
                    if(!assetExists) {
                        this.customAssets.push(custAssets[j])
                    }
                }

                let custOptions = scenes[scene].children[i].type.prototype.customOptions;
                for(let j=0; j<custOptions.length; j++) {
                    let assetExists = typeof this.customOptions.find(
                        asset => asset.id === custOptions[j].id) !== 'undefined';
                    if(!assetExists) {
                        this.customOptions.push(custOptions[j])
                    }
                }
            }
        }
    },

    checkCustOpts: function()
    {
        this.updateManager.checkCustOpts();
    },

    checkCustBtns: function()
    {
        if(typeof CUST_BUTTONS !== 'undefined') {
            this.customButtons = CUST_BUTTONS;
            let count = 0;
            for(btn in CUST_BUTTONS) {
                count++;
                this.createAsset('button_' + count + '_image');
            }
            this.customButtonCount = count
        }
    },

    modifyButton: function(id)
    {

    },

    updateAssetData: function(id, enabled, dimensions, size, key, url, src)
    {
        this.updateManager.updateAssetData(id, enabled, dimensions, size, key, url, src)
    },

    getAllCustOptions: function(scenes)
    {
        let returnArr = [];
        let sceneConfigs = this.getCustomConfigs(scenes);
        for(let i=0; i<sceneConfigs.length; i++) {
            for(let j=0; j<sceneConfigs[i].custom_options.length; j++) {
                let sceneOpt = sceneConfigs[i].custom_options[j];
                if(typeof returnArr.find(opt => opt.id === sceneOpt.id) === "undefined") {
                    returnArr.push(sceneOpt)
                }
            }
        }
        return returnArr;
    },

    getAllCustButtons: function(scenes)
    {
        return this.customButtons
    },

    getCustomConfigs: function(scenes)
    {
        let returnArr = [];
        for(scene in scenes) {
            let cust = {
                'name':scene,
                'description':scenes[scene].desc,
                'custom_assets' : [],
                'custom_options' : []
            };
            for(let i=0; i<scenes[scene].children.length; i++) {
                this.getCustomConfig(scenes[scene].children[i], cust);
            } 

            let buttons = this.customButtons[scene];
            if(buttons)
            {
                for(let i=0; i<buttons.assets.length; i++) {
                    cust['custom_assets'].push(buttons.assets[i])
                }
                for(let i=0; i<buttons.assets.length; i++) {
                   cust['custom_options'].push(buttons.options[i])
                }
            }
            returnArr.push(cust)
        }  
        return returnArr
    },

    getCustomConfig: function(sceneObj, cust)
    {
        let tmpChild = sceneObj.type.prototype;
        let custAssets = tmpChild.customAssets;
        let custOptions = tmpChild.customOptions;

        for(let i=0; i<custAssets.length; i++) {
            // update custAssets with AppConfig.CUSTOMIZABLE val
            let newAsset = (AppConfig.CUSTOMIZABLE.find(asset => asset.id === custAssets[i].id) ||
                    (AppConfig.CUSTOMIZABLE_VID && 
                        AppConfig.CUSTOMIZABLE_VID.find(asset => asset.id === custAssets[i].id)) ||
                    (AppConfig.CUSTOMIZABLE_AUDIO && 
                        AppConfig.CUSTOMIZABLE_AUDIO.find(asset => asset.id === custAssets[i].id)) ||
                    (AppConfig.CUSTOMIZABLE_FONT && 
                        AppConfig.CUSTOMIZABLE_FONT.find(asset => asset.id === custAssets[i].id)));
            if(typeof newAsset !== "undefined") {
                custAssets[i] = Object.assign({}, newAsset);
                if(custAssets[i].videoLoaders) {
                    delete custAssets[i].videoLoaders
                }
                if(custAssets[i].audioLoaders) {
                    delete custAssets[i].audioLoaders
                }
                if(custAssets[i].src) {
                    var srcString = "assets/images/customizable/"+custAssets[i].id;
                    custAssets[i]["src"] = srcString.toString();
                }
            }

            if(!this.hasDependencies(sceneObj, custAssets[i].id)) {
                custAssets[i].enabled = false;
                CMP.DisableImage(custAssets[i].id)
            }
            else {
                custAssets[i].enabled = true;
                CMP.EnableImage(custAssets[i].id)
            }

            if(custAssets[i].assetType == 'Video')
            {
                custAssets[i].actualSize = CMP.App.assetManager.getAssetSize(custAssets[i].id, "Video");
            }
            else if(custAssets[i].assetType == 'Audio')
            {
                custAssets[i].actualSize = CMP.App.assetManager.getAssetSize(custAssets[i].id, "Audio");
            }
            else if(custAssets[i].assetType == 'Font')
            {
                custAssets[i].actualSize = CMP.App.assetManager.getAssetSize(custAssets[i].id, "Font");
            }
            else // Image
            {
                custAssets[i].actualSize = CMP.App.assetManager.getAssetSize(custAssets[i].id, "Image");
                custAssets[i].assetType = "Image";
            }

            cust['custom_assets'].push(custAssets[i])
        }
        for(let i=0; i<custOptions.length; i++) {
            if(!this.hasDependencies(sceneObj, custOptions[i].id)) {
                custOptions[i].enabled = false;
            }
            else {
                custOptions[i].enabled = true;
            }
            cust['custom_options'].push(custOptions[i])
        }
    },
    
    hasDependencies: function(sceneObj, id)
    {
        var found = false;
        // go through dependencies array and check if in options/assets []
        for(let i=0; i<sceneObj.type.prototype.dependencies.length; i++) {
            if(sceneObj.type.prototype.dependencies[i].options.includes(id)
                    || sceneObj.type.prototype.dependencies[i].assets.includes(id)) {
                found = true;
                // if controller value in values [], return true
                if(sceneObj.type.prototype.dependencies[i].values.includes(
                        AppConfig.LEVEL_CONFIG[sceneObj.type.prototype.dependencies[i].controller])) {
                    return true;
                }
            }
        }
        // found will be true if id in dependencies but controller has wrong value
        return !found; 
    },

    getCustomButtons: function(scene)
    {
        if(!scene) {
            return this.customButtons
        }
        else if(this.customButtons[scene]) {
            return this.customButtons[scene]
        }
        return false
    },

    createButton: function(scene)
    {
        if(!this.customButtons[scene])
        {
            this.customButtons[scene] = {
                assets:[],
                options:[]
            };
        }
        this.customButtonCount++;

        this.createAsset('button_' + this.customButtonCount + '_image');

        this.customButtons[scene].assets.push({
            id : 'button_' + this.customButtonCount + '_image', 
            /*groupId : 'button_' + this.customButtonCount + '_group',
            groupPos : 0,*/
            actualSize : 0,
            assetType : 'Image',
            dimensions : {
                width : 150,
                height : 150,
            },
            enabled : true,
            name : 'Custom Button Image ' + this.customButtonCount,
            suggestedSize : 30000,
            src : ' ',
            key: null,
            url: null
        });
        this.customButtons[scene].options.push({
            id : 'button_' + this.customButtonCount + '',
            assetId: 'button_' + this.customButtonCount + '_image',
            title : 'Button ' + this.customButtonCount + '',
            description : 'Button ' + this.customButtonCount + '',
            type : 'customButton',
            /*groupId : 'button_' + this.customButtonCount + '_group',
            groupPos : 1,*/
            anchor : 5,    // number from 1-9 based on position in 3x3 grid
            xPercentage : 0.5,   // number from 0-1
            yPercentage : 0.5,   // number from 0-1
            scaleToWidth : 0.2,  // number from 0-1
            scaleToHeight : 0.2, // number from 0-1
            effect : 'none',        // e.g. bubble, blink, etc.
            effectToggle: true,
            effectOptions: [ 'bubble', 'blink' ],
            buttonAction : {
                action : 'Opens Link Below',    // e.g. goToScene
                target : []      // e.g. scene1, will not exist if action is link
            },
            actionTargetOptions: [
                {
                    'action' : 'Go To Scene',
                    'targets' : ['scene1','scene2']
                },
                {
                    'action' : 'Play',
                    'targets' : ['vid1']
                },
                {
                    'action' : 'Pause',
                    'targets' : ['vid1']
                },
                {
                    'action' : 'Opens Link Below',
                    'targets' : []
                }
            ],
            buttonActionToggle: true,
            links : {
                iOS : 'www.craftsmanplus.com',
                android : 'www.craftsmanplus.com',
                web : 'www.craftsmanplus.com'
            }
        });

        CMP._sceneManager.compileScenes();
        let customButton = this.addPositioningOverlay('button_' + this.customButtonCount);
        CMP._sceneManager.updateSceneConfigs();
        return customButton;
    },

    deleteButton: function(params)
    {
        if(!params){return}
        let buttonId = params;
        let buttonIdImage = params + "_image";

        for(let i in this.customButtons)
        {
            let configs = this.customButtons[i];
            for(let j = configs.options.length-1; j >= 0; j--)
            {
                if(buttonId == configs.options[j].id)
                {
                    configs.options.splice(j,1);
                }
            }
            for(let k = configs.assets.length-1; k >= 0; k--)
            {
                if(buttonIdImage == configs.assets[k].id)
                {
                    configs.assets.splice(k,1);
                }
            }
        }
        CMP._sceneManager.purgeId(buttonId, CMP._sceneManager);
        CMP._sceneManager.compileScenes();
        CMP._sceneManager.updateSceneConfigs();
    },

    deleteScene: function(params)
    {
        if(!params){return}
        let sceneId = params.id;

        // find scene - if exists delete + delete customButtons[scene]
        let scene = CMP._sceneManager.scenes[sceneId];
        if(scene) {
            let ind = SceneConfig.scenes.findIndex(scene=>scene.name === sceneId)
            if(ind > -1) {
                SceneConfig.scenes.splice(ind, 1);
                delete this.customButtons[sceneId];
            }
        }
        // check if SceneConfig.scenes is empty - call createScene 
        if(SceneConfig.scenes.length === 0) {
            CMP._sceneManager.createScene();
            SceneConfig.first_scene = SceneConfig.scenes[0].name
        }
        // if not empty update
        else {
            if(SceneConfig.first_scene === sceneId) {
                SceneConfig.first_scene = SceneConfig.scenes[0].name
            }

            CMP._sceneManager.compileScenes();
            CMP._sceneManager.updateSceneConfigs();
        }
        // if in deleted scene go to first scene
        if(CMP._sceneManager.currentWindow.name === sceneId) {
            CMP._sceneManager.goToScene(SceneConfig.first_scene, SceneConfig.live)
        }
    },

    createAsset: function(id)
    {
        let src = 'customizable/' + id + '.png';
        if(typeof ASSETS !== 'undefined')
        {
            if(ASSETS[src] && CMP.App.assetManager.images[id])
            {
                return
            }
            else if(!ASSETS[src])
            {
                ASSETS[src] = CMP.BLANK;
            }
            let len = ASSETS_64.push(CMP.BLANK);
            CUST_ASSETS[src] = len-1;
        }
        CMP.Loader.loadImage({id:id, src:src},this.refreshCustom.bind(this,id));
    },

    refreshCustom: function(id)
    {
        this.refresh(CMP._sceneManager);
        this.refreshAll();
    },


    addPositioningOverlay: function(id)
    {
        let buttonConfig = this.customButtons[CMP._sceneManager.currentWindow.name];   
        let ind = buttonConfig.options.findIndex(asset=>asset.id === id);
        let config = buttonConfig.options[ind];

        let newChild = new CustomButton({
            sceneManager:CMP._sceneManager,
            ctaClicked:CMP._sceneManager.ctaClicked.bind(CMP._sceneManager),
            goToScene:CMP._sceneManager.goToScene.bind(CMP._sceneManager),
            goToNext:CMP._sceneManager.goToNext.bind(CMP._sceneManager),
            goToPrev:CMP._sceneManager.goToPrev.bind(CMP._sceneManager),
            status:'live',
            type:"customButton",
            config:config
        })
        return newChild;
    },

    processCustomOptions: function(customOptions)
    {
        this.updateManager.processCustomOptions(customOptions);
    },
	
	addNewAsset: function(customAssets)
    {
        for(let i = 0; i < customAssets.length; i++)
        {
            customAssets[i].newAssetId = 'staticImport' + this.staticIdsCount;
            this.staticIdsCount++;
        }
        this.updateManager.addNewAsset(customAssets, this.staticIdsCount);
    },

    processCustomAssets: function(customAssets)
    {
        this.updateManager.processCustomAssets(customAssets);
    },

    refresh: function(sceneObj)
    {
        this.updateCustoms(sceneObj.customAssets,sceneObj.customOptions);

        if(sceneObj.refresh && sceneObj != CMP._sceneManager)
        {
            sceneObj.refresh();
        }

        if(sceneObj.children)
        {
            for(var j = 0; j < sceneObj.children.length; j++)
            {
                this.refresh(sceneObj.children[j]);
            }
        }
    },

    refreshAll: function()
    {
        let scenes = CMP._sceneManager.scenes;
        for(scene in scenes) {
            for(let i=0; i<scenes[scene].children.length; i++) {
                let proto = scenes[scene].children[i].type.prototype;
                this.updateCustoms(proto.customAssets,proto.customOptions)
            } 
        }
    },

    updateCustoms: function(customAssets,customOptions)
    {
        if(customAssets)
        {
            for(let i=0; i<customAssets.length; i++) {
                let assetConfig = 
                    (AppConfig.CUSTOMIZABLE.find(
                        asset => asset.id === customAssets[i].id) ||
                    (AppConfig.CUSTOMIZABLE_VID && AppConfig.CUSTOMIZABLE_VID.find(
                        asset =>asset.id === customAssets[i].id)) ||
                    (AppConfig.CUSTOMIZABLE_AUDIO && AppConfig.CUSTOMIZABLE_AUDIO.find(
                        asset => asset.id === customAssets[i].id)) || 
                    (AppConfig.CUSTOMIZABLE_FONT && AppConfig.CUSTOMIZABLE_FONT.find(
                        asset => asset.id === customAssets[i].id)));
                if(typeof assetConfig !== "undefined") {
                    customAssets[i].enabled = assetConfig.enabled
                }
            }
        }
        if(customOptions)
        {
            customOptions.forEach(function(option) {
                // multitoggle
                if(option.type === "multitoggle") {
                    for(let i=0; i<option.options.length; i++) {
                        option.options[i].default = AppConfig.LEVEL_CONFIG[option.options[i].id]
                    }
                }
                // text 
                else if(option.type === "text") {
                    option.default = AppConfig.LEVEL_CONFIG[option.id].text;
                    option.color = AppConfig.LEVEL_CONFIG[option.id].color;
                    option.family = AppConfig.LEVEL_CONFIG[option.id].family;
                    option.shadow = AppConfig.LEVEL_CONFIG[option.id].shadow;
                    option.size = AppConfig.LEVEL_CONFIG[option.id].size;
                    option.style = AppConfig.LEVEL_CONFIG[option.id].style;
                    option.weight = AppConfig.LEVEL_CONFIG[option.id].weight;
                    option.groupId = AppConfig.LEVEL_CONFIG[option.id].groupId;
                }
                // dropdown toggle
                else if(option.type === "dropdown" && typeof option.toggle !== "undefined") {
                    option.default = AppConfig.LEVEL_CONFIG[option.id].value;
                    option.toggle = AppConfig.LEVEL_CONFIG[option.id].toggle;
                }
                else {
                    option.default = AppConfig.LEVEL_CONFIG[option.id]
                }
            }.bind(this));
        }
    }
    
};
extend("ConfigManager", "CMP.DisplayObjectContainer");
