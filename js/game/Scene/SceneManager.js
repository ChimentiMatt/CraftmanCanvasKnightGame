SceneManager = function (params)
{
    this.construct(params);
    CMP._sceneManager = this;
	this.init();
};

SceneManager.prototype =
{
	init: function()
	{
        if(typeof SCENE_CONFIG !== "undefined") {
            console.log('new scene config', SCENE_CONFIG)
            for(let i=0; i<SCENE_CONFIG.scenes.length; i++) {
                for(let j=0; j<SCENE_CONFIG.scenes[i].children.length; j++) {
                    SCENE_CONFIG.scenes[i].children[j].class_name = 
                        window[SCENE_CONFIG.scenes[i].children[j].class_name]
                }
            }
            SceneConfig = SCENE_CONFIG
        }

        this.setupLayers();

        this.configManager = new ConfigManager();
        this.audioManager = new AudioManager();
        
        this.scenes = [];
        this.sceneOrder = [];
        this.currentSceneObjects = {};
        
        this.sceneNumber = 0;
        this.totalScenes = SceneConfig.scenes.length;

        // if CUST_OPTIONS exists, overwrite custom options
        this.configManager.checkCustOpts();

        this.compileScenes();
        this.configManager.compileCust(this.scenes);
        this.audioManager.compileAudio();


        // if CUST_BUTTONS exists, recreate all buttons
        // ! Below is only for Interactive Video
        // this.configManager.checkCustBtns();
        // this.addCustomButtons(this.currentWindow);
        // this.updateButtonLayer();
        // this.enableCustom();
        
		if (typeof BatchManager != "undefined" || document.URL.split(':')[0] == 'file' || typeof SCENE_CONFIG !== "undefined" || typeof CMP.IceInterface === "undefined")
        { 
            this.launchApp();
        }
        else {
            this.loadingScreen = this.loadingLayer.addChild(new CMP.DisplayObjectContainer({
                backgroundColor: '#000',
                width: 500,
                height: 500,
                layout: 'match'
            }));
            this.textArea = this.loadingScreen.addChild(new CMP.DisplayObjectContainer({
                width: 200,
                height: 200,
                layout: {
                    xPercentage: 0.5,
                    yPercentage: 0.5,
                    scaleToWidth: 1,
                    scaleToHeight: 1
                }
            }));
            this.loadText = this.textArea.addChild(new CMP.Text({
                text: 'Loading',
                font: '20pt Monospace',
                color: '#fff',
                x: 25,
                y: 25,
                textBaseline: 'middle'
            }));
			this.currentUpdate = this.textArea.addChild(new CMP.Text({
                text: 'Updating Options',
                font: '15pt Monospace',
                color: '#999',
                x: 100,
                y: 100,
                textBaseline: 'middle',
                textAlign: 'center'
            }));
            this.currentUpdate2 = this.textArea.addChild(new CMP.Text({
                text: '',
                font: '15pt Monospace',
                color: '#999',
                x: 100,
                y: 150,
                textBaseline: 'middle',
                textAlign: 'center'
            }));

            this.performAction({
                action: this.animLoadText.bind(this, 0),
                delay: 0.25
            })
        }

        CMP.ListenSet('AppReady',this.onRequestData.bind(this));
        CMP.ListenSet('GetScenes',this.getCustomConfigs.bind(this));

        CMP.ListenSet('GetOptions',this.getAllCustOptions.bind(this));
        CMP.ListenSet('GetButtons',this.getAllCustButtons.bind(this));
        CMP.ListenSet('GetTexts',this.getAllCustTexts.bind(this));

        CMP.Listen('GoToScene',this.GoToScene.bind(this));
        CMP.Listen('LaunchApp',this.launchApp.bind(this));
        CMP.Listen('ScenesUpdated',this.ScenesUpdated.bind(this));
        CMP.Listen('AssetsUpdated',this.AssetsUpdated.bind(this));
        CMP.Listen('OptionsUpdated',this.OptionsUpdated.bind(this));
        CMP.Listen('CallFunction',this.CallFunction.bind(this));
        CMP.Listen('ToggleSound',this.toggleSound.bind(this));
        CMP.Listen('RefreshScene',this.RefreshScene.bind(this));
    },

    animLoadText: function(dotCounter)
    {
        this.loadText.text = (dotCounter === 0) ? "Loading" : this.loadText.text + ".";
        this.performAction({
            action: this.animLoadText.bind(this, (dotCounter+1)%4),
            delay: 0.25
        })
    },
	
    updateLoadingText: function(newTxt, newPct)
	{
		this.currentUpdate.text = newTxt;
		if(typeof newPct !== "undefined") {
            this.currentUpdate2.text = newPct + '%';
        }
	},

    onRequestData: function()
    {
        this.live = false;
        SceneConfig.live = false;
        CMP.Dispatch({type:'AppInitialized'});
        return true;
    },

    launchApp: function()
    {
        if(this.launched){return}
        this.loadingLayer.markForRemoval();
        this.launched = true;
        this.goToScene(SceneConfig.first_scene, SceneConfig.live);
        this.refresh();
    },

    enableCustom: function()
    {
        this.gameCanvas.addUpdate(this.scaleDown.bind(this.gameCanvas));
        this.gameCanvas.targetScale = 0.8;
        CMP.App.stage.addEventListener("stagemouseup",this.resetEdit.bind(this));
    },

    resetEdit: function(evt)
    {
        if(!this.editModded && this.currentEdit)
        {
            this.currentEdit.endEdit();
        }
        this.editModded = false;
    },

    scaleDown: function(scale)
    {
        this.targetScale = typeof scale == 'number' ? scale : this.targetScale;
        this.scale = this.targetScale;
        let border = (1-this.scaleX)/2; 
        this.x = this.width * border;
        this.y = this.height * border;
    },

    endEdit: function()
    {
        if(!this.currentEdit){return}
        if(this.lines)
            this.lines.markForRemoval();
        let button = this.currentEdit;
        let local = this.gameCanvas.globalToLocal(button.x,button.y);
        this.gameCanvas.addChild(button);
        button.x = local.x;
        button.y = local.y;
        button.layout.xPercentage = button.x/this.gameCanvas.width;
        button.layout.yPercentage = button.y/this.gameCanvas.height;
        console.log(button.x);
        console.log("Edit end");
        this.currentEdit = false;
    },

    editButton: function(button)
    {
        if(button.parent == this.editorLayer) {return}
        if(this.currentEdit)
        {
            this.currentEdit.endEdit();
        }
        this.editorLayer.addChild(button);
        this.currentEdit = button;
        this.lines = this.editorLayer.addChild(new CMP.DisplayObjectContainer('match'));
        for(let i = 0; i < 200; i++)
        {
            this.lines.addChild(new CMP.DisplayObjectContainer({
                backgroundColor:"#444",
                alpha:0.8,
                width:1,
                height:5000,
                x:i*15,y:15
            }));
            this.lines.addChild(new CMP.DisplayObjectContainer({
                backgroundColor:"#444",
                alpha:0.8,
                width:5000,
                height:1,
                x:15,y:i*15
            }));
        }
    },

    setupLayers: function()
    {
        this.gameCanvas = this.addChild(new CMP.DisplayObjectContainer('match'));
        this.editorLayer = this.addChild(new CMP.DisplayObjectContainer('match'));
        this.loadingLayer = this.addChild(new CMP.DisplayObjectContainer('match'));
    },

    getScenes: function()
    {
        return this.scenes
    },

    processConfig: function(scene) {
        if(!this.scenes[scene.name]){
            this.scenes[scene.name] = {'desc':scene.description,children:[]};
            this.sceneOrder.push(scene.name);
        } 
        for(let i=0; i<scene.children.length; i++) {
            this.defineScene(scene.name, scene.children[i].class_name, scene.children[i].status, scene.children[i].layer)
        }
    },

    defineScene: function(sceneName, classType, setting, layerId)
    {
        this.scenes[sceneName].children.push({type:classType, status: setting, layer: layerId})
    },

    goToPrev: function()
    {
        if(this.sceneOrder[this.sceneNumber-1] && this.currentWindow && this.currentWindow.isLive) {
            this.goToScene(this.sceneOrder[this.sceneNumber-1], this.currentWindow.isLive)
        }
    },

    goToNext: function()
    {
        if(this.sceneOrder[this.sceneNumber+1] && this.currentWindow && this.currentWindow.isLive) {
            this.goToScene(this.sceneOrder[this.sceneNumber+1], this.currentWindow.isLive)
        }
    },

    GoToScene: function(event)
    {   
        let sceneInfo = event.data;
        CMP._sceneManager.goToScene(sceneInfo.scene, sceneInfo.live);
    },

    goToScene: function(name, live)
    {   
        console.log('goToScene', name, live);
        CMP.Progress(name);

        //this.audioManager.goToScene(name);

        this.sceneNumber = this.sceneOrder.indexOf(name);

        if(!this.currentWindow || !live){
            if(!live && this.currentWindow) { this.currentWindow.markForRemoval() }
            this.currentWindow = this.gameCanvas.addChild(new CMP.DisplayObjectContainer('match'));
        }
        this.currentWindow.name = name;

        if(typeof live !== 'undefined') {
            this.currentWindow.isLive = live;
        }

        this.updateLayers();

        console.log('this.scenes', this.scenes)
        let prevSceneData = this.removeOldChildren(this.scenes[name], this.currentWindow);

        this.addNewChildren(this.scenes[name], this.currentWindow, prevSceneData) //, sceneConfigs)
        this.addCustomButtons(this.currentWindow) //, sceneConfigs);
        this.updateNeighbors();

        this.refresh()
    },

    updateNeighbors: function()
    {
        this.setNeighbors(this.scenes[this.currentWindow.name]);
    },

    setMouseEnabled: function(value)
    {
        this.mouseEnabled = value
    },

    setNeighbors: function(nextScene)
    {
        this.longestDuration = 0;

        var sceneObjs = {};
        for (let i=0; i<this.currentWindow.children.length; i++) {
            let layer = this.currentWindow.children[i];
            for(let j=0; j<layer.children.length; j++) {
                let child = layer.children[j];
                if(typeof child.introduceToNeighbors === "function")
                {
                    child.introduceToNeighbors(sceneObjs);
                }
                else
                {
                    sceneObjs[child.getName()] = child;
                }
            }
        }
        for (let i=0; i<this.currentWindow.children.length; i++) { // go thru children in next scene
            let layer = this.currentWindow.children[i];
            for(let j=0; j<layer.children.length; j++) {
                if(!layer.children[j].transitioningOut) {
                    layer.children[j].setNeighbors(sceneObjs);
                }
            }
        }
        this.currentSceneObjects = sceneObjs;
    },

    removeOldChildren: function(nextScene, currentWindow)
    {
        let longestDuration = 0;
        let retObj = {
            longestDuration: longestDuration,
            persistentData: []
        };
        console.log('Lcj')
        // remove all children from current window that don't exist in next scene
        for(let i=currentWindow.children.length-1; i>=0; i--) {
            let layerChildren = currentWindow.children[i].children;
            for(let j=layerChildren.length-1; j>=0; j--) {
                console.log('Lcj', layerChildren[j].getData())
                if(typeof layerChildren[j].getData() !== 'undefined') {
                    retObj.persistentData.push(layerChildren[j].getData());
                }
                if(!nextScene.children.find(child => child.type === layerChildren[j].type)) {
                    retObj.longestDuration = Math.max(retObj.longestDuration, layerChildren[j].transitionDuration);
                    // transitionOut has to come last bc it removes
                    layerChildren[j].transitioningOut = true;
                    layerChildren[j].transitionOut(SceneConfig.live ? 1 : 0);
                    // disable mouse action until transitions finished
                    this.setMouseEnabled(false);
                }
            }
        }
        this.performAction({
            action:this.setMouseEnabled.bind(this, true),
            delay:retObj.longestDuration
        })

        return retObj
    },

    layer: function(num)
    {
        if(typeof num !== "number") { num = 0 }
        // if layer exists return
        if(this.currentWindow[num]){
            return this.currentWindow[num]
        }
        // else create all layers up to this num and return layer at num
        for(let i=0; i<=num; i++) {
            if(!this.currentWindow.children[i]) {
                this.currentWindow.children[i] = this.currentWindow.addChild(new CMP.DisplayObjectContainer('match'));
            }
        }
        return this.currentWindow[num]
    },

    updateLayers: function()
    {
        let currentScene = SceneConfig.scenes.find(scene => scene.name === this.currentWindow.name);
        if(typeof currentScene !== 'undefined') {
            for(let i=0; i<currentScene.children.length; i++) {
                this.layer(currentScene.children[i].layer);
            }
        }   
    },

    childExists: function(className)
    {
        for(let i=0; i<this.currentWindow.children.length; i++) {
            let layer = this.currentWindow.children[i];
            let layerChild = layer.children.find(child => child.type === className);
            if(typeof layerChild !== "undefined") {
                return layerChild;
            }
        }
        return false;
    },

    addNewChildren: function(nextScene, currentWindow, prevSceneData) //, sceneConfigs)
    {
        console.log('PSD', prevSceneData)
        for(let i=0; i<nextScene.children.length; i++) { // go thru all children in next scene
            let className = nextScene.children[i].type;
            let layerId = typeof nextScene.children[i].layer !== "number" ? 0 : nextScene.children[i].layer;
            let existingChild = this.childExists(className);

            if(existingChild) { // if child exists, add to end of child list
                existingChild.status = nextScene.children[i].status;
                if(existingChild.status === 'disabled') {
                    existingChild.mouseEnabled = false;
                }
                else {
                    existingChild.mouseEnabled = true;
                }
                currentWindow.children[layerId].addChild(existingChild)
                existingChild.setData(prevSceneData.persistentData)
                //existingChild.setSceneConfig(sceneConfigs)
            }
            else { // if child doesn't exist, create new  
                let newChild = currentWindow.children[layerId].addChild(new className({
                    status:nextScene.children[i].status,
                    type:nextScene.children[i].type,
                    goToNext:this.goToNext.bind(this),
                    goToPrev:this.goToPrev.bind(this),
                    goToScene:this.goToScene.bind(this),
                    //sceneConfig:sceneConfigs,
                    ctaClicked:this.ctaClicked.bind(this)
                }))
                if(newChild.status === 'disabled') {
                    newChild.mouseEnabled = false;
                }
                // call transitionIn fn on new child
                newChild.transitionIn(prevSceneData.longestDuration,SceneConfig.live ? 1 : 0.01);
                newChild.setData(prevSceneData.persistentData)
            }
        }
    },

    addCustomButtons: function(currentWindow) //, sceneConfigs)
    {
        let scene = currentWindow.name;   
        if(this.configManager.getCustomButtons(scene))
        {
            // temp - add buttons to layer 5 for now
            this.layer(5);

            let custButtons = this.configManager.getCustomButtons(scene);
            for(let i=0; i<custButtons.options.length; i++) { 
                let newChild = currentWindow.children[5].addChild(new CustomButton({
                    ctaClicked:this.ctaClicked.bind(this),
                    goToScene:this.goToScene.bind(this),
                    goToNext:this.goToNext.bind(this),
                    goToPrev:this.goToPrev.bind(this),
                    status:'live',
                    type:"customButton",
                    //sceneConfig:sceneConfigs,
                    config:this.configManager.customButtons[scene].options[i]
                }));

            }
        }
    },

    updateButtonLayer: function()
    {
        if(this.currentWindow.children.length < 6) { return; }
        for(let i=0; i<this.currentWindow.children[5].children.length; i++) {
            let editor = this.currentWindow.children[0].children[0];
            editor.canvas.buttonLayer.addChild(this.currentWindow.children[5].children[i])
        }
    },

    // get all custom options from all scenes in one array
    getAllCustOptions: function()
    {
        return this.configManager.getAllCustOptions(this.scenes);
    },

    getAllCustButtons: function()
    {
        return this.configManager.getAllCustButtons(this.scenes);
    },

    getAllCustTexts: function()
    {
        return;
        // return this.configManager.getAllCustTexts(this.scenes);
    },

    getCustomConfigs: function()
    {
        return this.configManager.getCustomConfigs(this.scenes);
    },
    
    ctaClicked: function()
    {
        CMP.callCTA(this.androidURL,this.iOSURL);
    },

    CallFunction: function({data})
    {
        let callback = data.callback;
        let params = data.params;
        // if fn exists in sceneManager, call
        if(typeof this[callback] !== "undefined" && typeof this[callback] === "function") {
            this[callback](params)
        }
    },

    callFunction: function(callback,params)
    {
        // if fn exists in sceneManager, call
        if(typeof this[callback] !== "undefined" && typeof this[callback] === "function") {
            this[callback](params)
        }
    },

    createButton: function()
    {
        // removed call to this.configManager.createButton
        if(!this.currentWindow || this.creating)
        {
            return;
        }
        this.button = CMP._sceneManager._createButton();
        this.gameCanvas.addChild(this.button);
    },   

    deleteButton: function(params)
    {
        this.configManager.deleteButton(params)
    },

    createScene: function()
    {
        this.totalScenes++;
        SceneConfig.scenes.push({
            name: 'scene'+this.totalScenes,
            description: '',
            children: [
                {
                    class_name: Editor,
                    status: 'enabled',
                    layer: 0
                }
            ]
        })
        this.compileScenes();
        this.updateSceneConfigs();
    },    

    deleteScene: function(params)
    {
        if(!params) {
            params = {id: this.currentWindow.name}
        }
        this.configManager.deleteScene(params)
    },

    _createButton: function()
    {
        return this.configManager.createButton(this.currentWindow.name)
    },

    finishedCreating: function()
    {
        this.creating = false;
    },

    processCustomOptions: function(customOptions)
    {
        this.configManager.processCustomOptions(customOptions);
    },

    addNewAsset: function addNewAsset(customAssets) {
        console.log("Got ", customAssets, "in scenemanager");
        this.configManager.addNewAsset(customAssets);
    },

    updateAssetCount: function()
    {
        this.assetCount ++;
        let pct = ((this.assetCount/this.totalAssetCount)*100).toFixed(0);
        CMP._sceneManager.updateLoadingText('Updating Assets', pct.toString());
    },

    processCustomAssets: function(customAssets)
    {
        this.updateLoadingText('Updating Assets', '0');
        this.totalAssetCount = customAssets.length;
        this.assetCount = 0;
        CMP.Listen("IdLoaded", this.updateAssetCount.bind(this));
        
        this.configManager.processCustomAssets(customAssets);
    },

    processScenes: function(scenes)
    {
        this.updateLoadingText('Updating Scenes')
        // uncomment if add-ons exist
        /*for(let i=0; i<scenes.length; i++) {
            if(typeof this.scenes[scenes[i].name] === "undefined") {
                this.callAddOn(scenes[i].name)
            }
        }*/
    },
    
    ScenesUpdated: function(event)
    {
        let scenes = event.data;
    },
    
    OptionsUpdated: function({data})
    {
        this.configManager.processCustomOptions(data);
    },
    
    AssetsUpdated: function({data})
    {
        if (CMP._batchManager)
        {
            this.addNewAsset(data);
            return;
        }
        this.processCustomAssets(data);
    },

    compileScenes: function()
    {
        this.scenes = [];
        if(typeof SceneConfig !== 'undefined') {
            SceneConfig.scenes.forEach(this.processConfig.bind(this));
        }
    },

	updateAssetData: function(id, enabled, dimensions, size, key, url, src)
    {
        this.configManager.updateAssetData(id, enabled, dimensions, size, key, url, src)
    },

    updateSceneConfigs: function()
    {
        CMP.Dispatch({type:'SaveScenes'});
    },

    callAddOn: function(addOn)
    {
        console.log('in SceneManager callAddOn', addOn);
    },

    getAddOns: function()
    {
        return [
            // example
            /*{
                name: "Start Scene",
                enabled: SceneConfig.addOns.find(scene => scene.name === "Start Scene").enabled
            }*/
        ]
    },

    RefreshScene: function()
    {
        this.goToScene(this.currentWindow.name);
        this.refresh();
    },

    refresh: function()
    {
        this.configManager.refreshCustom();
    },

    modifyButton: function(id)
    {
        for(let i = 0; i < this.gameCanvas.children.length; i++)
        {
            if(this.gameCanvas.children[i].config && this.gameCanvas.children[i].config.id == id)
            {
                this.gameCanvas.children[i].toggleEdit();
            }
        }
    },

    purgeId: function(id, object)
    {
        if(object.config && object.config.id == id)
        {
            object.markForRemoval();
        }
        else if(object.children)
        {
            for(var j = 0; j < object.children.length; j++)
            {
                this.purgeId(id,object.children[j]);
            }
        }
    },

    toggleSound: function()
    {
        CMP.App.assetManager.setMasterSound(!CMP.MasterSound)
    },

    showInfo: function()
    {
        if(this.infoPopup && this.infoPopup.alpha > 0) { return; }

        this.infoPopup = this.parent.addChild(new InfoPopup({
            width:500,
            height:300
        }));
    }
};
extend("SceneManager", "CMP.DisplayObjectContainer");
