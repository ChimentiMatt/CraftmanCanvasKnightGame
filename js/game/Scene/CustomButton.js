CustomButton = function (params) {
    params.width = 150;
    params.height = 150;
    params.backgroundColor = "#fff";
	let config = params.config;
	config.anchor = 5;
    this.customOptions.push(config);

    this.state = 0;
	this.scalers = [];

	this.construct(params);
    this.setEffect(config.effect);
    this.setAnchor(config);


};
CustomButton.prototype = {

    customAssets: [
    ],
    customOptions: [
    ],
    dependencies: [
    ],

	init: function() 
	{
        this.addChild(new CMP.DisplayObjectContainer({
            backgroundColor:"#444",
            width:1,
            height:7,
            x:this.width/2,y:this.height/2
        }));
        this.addChild(new CMP.DisplayObjectContainer({
            backgroundColor:"#444",
            width:7,
            height:1,
            x:this.width/2,y:this.height/2
        }));
        this.children[0].on('mousedown',this.toggleEdit.bind(this));
        this.children[0].on('pressmove',this.onMouse.bind(this));
        this.children[0].on('pressup',this.onFinish.bind(this));
    },

    toggleEdit: function(evt)
    {
    	CMP._sceneManager.editModded = true;
    	if(!this.parent){return}
    	switch(this.state)
	    {
	  		case 0:
	  			this.startEdit();
	  			break;
	  		case 1:
	  			break;
	  		default:
	  			break;
	    }
    },

    startEdit: function(evt)
    {
    	this.state = 1;
        let local = this.parent.localToGlobal(this.x,this.y);
    	CMP._sceneManager.editButton(this);

    	this.layout.scaleToWidth *= 0.8;
    	this.layout.scaleToHeight *= 0.8;
    	this._resize();
    	
    	let newLocal = this.parent.globalToLocal(local.x,local.y);
    	this.x = newLocal.x;
    	this.y = newLocal.y;
        this.layout.xPercentage = this.x/this.parent.width;
        this.layout.yPercentage = this.y/this.parent.height;
    	this.enableScaling();
    },

    enableScaling: function(evt)
    {
    	let scalers = [
    		{x:1,y:1,px:0,py:0},
    		{x:-1,y:1,px:this.width,py:0},
    		{x:1,y:-1,px:0,py:this.height},
    		{x:-1,y:-1,px:this.width,py:this.height}
    		// {x:1,y:1,px:0,py:this.height/2,disableH:true},
    		// {x:-1,y:1,px:this.width/2,py:0,disableW:true},
    		// {x:1,y:-1,px:this.width,py:this.height/2,disableH:true},
    		// {x:-1,y:-1,px:this.width/2,py:this.height,disableW:true}
    	];

    	this.scalers = []
    	for(let i = 0; i < scalers.length; i++)
    	{
	    	let sclr = this.addChild(new CMP.DisplayObjectContainer({
	    		x:scalers[i].px,y:scalers[i].py,
	    		width:50,
	    		height:50,
	    		backgroundColor:'#a00'
	    	}));
	        sclr.on('mousedown',this.block.bind(this,scalers[i]));
	        sclr.on('pressmove',this.block.bind(this,scalers[i]));
	        this.scalers.push(sclr);
    	}
    },

    block: function({x,y,disableH,disableW},evt)
    {
    	CMP._sceneManager.editModded = true;
    	let wdx = x*(this.x - evt.stageX) / 0.5;
    	let wdy = y*(this.y - evt.stageY) / 0.5;

    	if(!disableW)
    	{
    		this.layout.scaleToWidth  = wdx / this.parent.width;
    	}
    	if(!disableH)
    	{
	    	this.layout.scaleToHeight = wdy / this.parent.height;
    	}
    	
    	this._resize();
    },

    endEdit: function(evt)
    {
    	this.state = 0;

    	for(let i = this.scalers.length-1; i >= 0; i--)
    	{
    		this.scalers[i].markForRemoval();
    	}
    	CMP._sceneManager.endEdit(this);
		this.mouseMoveOk = false;

		this.setScaleWidth(this.layout.scaleToWidth / 0.8);
		this.setScaleHeight(this.layout.scaleToHeight / 0.8);
    	
    	this._resize();
    },

    onFinish: function() 
    {
		this.mouseMoveOk = (this.state == 1);
    },

    onMouse: function(evt)
    {
    	if(!this.mouseMoveOk){return}
    	if(!this.parent){return}
    	CMP._sceneManager.editModded = true;
        let local = this.parent.globalToLocal(evt.stageX,evt.stageY);
        this.x = local.x;
        this.y = local.y;
        let x1 = Math.floor(local.x/15)*15;
        let y1 = Math.floor(local.y/15)*15;
        let points = [{x:x1,y:y1},{x:x1+15,y:y1},{x:x1,y:y1+15},{x:x1+15,y:y1+15}];
        for(let i in points)
        {
	        let dist = Math.sqrt( Math.pow((points[i].x-local.x), 2) + Math.pow((points[i].y-local.y), 2) );
        	if(dist < 7)
        	{
        		this.x = points[i].x;
        		this.y = points[i].y;
        	}
        }

        this.config.xPercentage = this.layout.xPercentage = this.x/this.parent.width;
        this.config.yPercentage = this.layout.yPercentage = this.y/this.parent.height;
		this.configUpdated();
    },

    setNeighbors: function(neighbors) 
    {
		this.neighbors = neighbors;
        this.VideoPlayer = neighbors['VideoPlayer'];
        console.log(neighbors);
    },

	chooseAnchor: function()
	{
		this.displayPoints(3);
	},
	
	displayPoints: function(points)
	{
	},

	setEffect: function(effect,obj)
	{
		console.log('in setEffect', effect, obj);
		if(!effect || effect == 'none') { return; }

        if(effect == 'bubble') {
            obj.tweenTo({
                scaleX:0.95,
                scaleY:1.03,
                loop:true,
                rewind:true,
                easing:CMP.Tween.Sine.Out,
                duration:0.35
            });
        }
        if(effect == 'blink') {
            this.blinkLoop(obj);
        }
	},

	blinkLoop: function(obj)
    {
        obj.alpha = 1;
        obj.tweenTo({
            alpha:0,
            delay:1,
            duration:0.2,
            onComplete: this.blinkLoop.bind(this, obj)
        });
    },

	setAnchor: function({anchor,xPercentage,yPercentage,scaleToWidth,scaleToHeight})
	{
		this.layout = {
			scaleToWidth:scaleToWidth,
			scaleToHeight:scaleToHeight
		};

		this.layout.xPercentage = anchor%3 == 2 ? 0.5 : undefined;
		this.layout.anchorLeft = anchor%3 == 1 ? 0 : undefined;
		this.layout.anchorRight = anchor%3 == 0 ? 0 : undefined;
		this.layout.yPercentage = anchor >=4 && anchor <= 6 ? 0.5 : undefined;
		this.layout.anchorTop = anchor < 4 ? 0 : undefined;
		this.layout.anchorBottom = anchor > 6 ? 0 : undefined;

		this.canvasAnchor(xPercentage,yPercentage);
		this._resize();
	},

	resizers: function()
	{
	},
	
	setScaleWidth: function(percent)
	{
		this.config.scaleToWidth = percent;
		this.layout.scaleToWidth = percent;
		this._resize();
		this.configUpdated();
	},
	
	setScaleHeight: function(percent)
	{
		this.config.scaleToHeight = percent;
		this.layout.scaleToHeight = percent;
		this._resize();
		this.configUpdated();
	},
	
	onPressup: function(point,event)
	{
		event.currentTarget.x = point.parent.globalToLocal(event.stageX,event.stageY).x;
		event.currentTarget.y = point.parent.globalToLocal(event.stageX,event.stageY).y;
		console.log(event.currentTarget.x,event.currentTarget.y)
	},
	
	anchorFinish: function(point)
	{
		this.pointLayers.markForRemoval();
		this.state = 0;
	},
	
	canvasAnchor: function(x,y)
	{
		this.layout = CMP.assign({},this.layout)
		if(typeof this.layout.xPercentage == 'number')
		{
			this.layout.xPercentage = x;
		}
		if(typeof this.layout.anchorLeft == 'number')
		{
			this.layout.anchorLeft = x;
		}
		if(typeof this.layout.anchorRight == 'number')
		{
			this.layout.anchorRight = 1-x;
		}
		if(typeof this.layout.yPercentage == 'number')
		{
			this.layout.yPercentage = y;
		}
		if(typeof this.layout.anchorTop == 'number')
		{
			this.layout.anchorTop = y;
		}
		if(typeof this.layout.anchorBottom == 'number')
		{
			this.layout.anchorBottom = 1-y;
		}
		this.config.xPercentage = x;
		this.config.yPercentage = y;
		this.configUpdated();
		this._resize();
	},
	
	selectedPoint: function(point)
	{
		let xAnchor = point.layout.xPercentage;
		let yAnchor = point.layout.yPercentage;

		this.layout = {
			scaleToWidth:this.config.scaleToWidth,
			scaleToHeight:this.config.scaleToHeight
		};
		if(this.config){this.layout = {scaleToWidth:this.config.scaleToWidth,scaleToHeight:this.config.scaleToHeight}}

		this.layout.xPercentage = xAnchor == 0.5 ? 0.5 : undefined;
		this.layout.anchorLeft = xAnchor == 0 ? 0.5 : undefined;
		this.layout.anchorRight = xAnchor == 1 ? 0.5 : undefined;
		this.layout.yPercentage = yAnchor == 0.5 ? 0.5 : undefined;
		this.layout.anchorTop = yAnchor == 0 ? 0.5 : undefined;
		this.layout.anchorBottom = yAnchor == 1 ? 0.5 : undefined;
		this.myAnchor = xAnchor;
		this.myAnchor = yAnchor;
		this._resize();
		this.config.anchor = this.calcAnchor(xAnchor,yAnchor);
		this.configUpdated();
	},

	calcAnchor: function(x,y){
		let anchors = {
			"0":{
				"0":1,
				"0.5":2,
				"1":3		
			},
			"0.5":{
				"0":4,
				"0.5":5,
				"1":6		
			},
			"1":{
				"0":7,
				"0.5":8,
				"1":9		
			}
		}
		return anchors[y][x];
	},

	configUpdated: function(){
		CMP._sceneManager.updateSceneConfigs();
	},

	createBg: function(){
		this.customBg = this.addChild(new CMP.DisplayObject({
			backgroundColor:'#00f',
			width:100,
			height:100,
			layout:'fill'
		}));
		this.customBg.sendToBack()
		return this.customBg
	},

	refresh: function()
	{
		let obj = false;
		let config = this.config;
		let name = config.id + '_image';
	    console.log("IN custom button refresh",config);
	    if(this.customBg) {
	    	this.customBg.markForRemoval()
	    } 
	    if(this.customImage)
    	{
    		this.customImage.markForRemoval();
    	}
		if(!config){
			obj = this.createBg();
			return
		}
	    let image = CMP.App.getImage(name);
	    console.log(image);
	    if(image && image.src !== CMP.BLANK)
	    {
	    	let w = image.width;
	    	let h = image.height;
	    	let ratio = w/h;
	    	ratio > 1 ? w = 150 : h = 150;
	    	ratio > 1 ? h = w / ratio : w = ratio * h;
	    	
			this.width = w;
			this.height = h;
			this.customImage = this.addChild(new CMP.SizedSprite({
				image: name,
				x:w/2,y:h/2,
				width: w,
				height: h
			}));
			obj = this.customImage;
    		console.log("Added image");
    		console.log(this);
    		if(this.state == 1)
    		{
    			this.displayPoints(3)
    		}
    		if(this.state == 2)
    		{
    			this.resizers()
    		}
	    }
	    else {
			obj = this.createBg();
	    }
	    if(!config.effectToggle) { 
	    	config.effect = 'none' 
	    }
	    this.setEffect(config.effect,obj);
	    this.setAnchor(config);
	    this.addCustomEvent();
	},

	clickCustom: function(){
		console.log("Clicke?D?");
		console.log(this.currentEventListener);
	},

	addCustomEvent: function(){
		this.removeHitArea();
		if(!this.config){return}
	    if(this.customBg) {
	    	this.customBg.removeHitArea();
	    	this.customBg.addHitArea(this.onClick.bind(this));
	    } 
	    if(this.customImage)
    	{
    		this.customImage.removeHitArea();
			this.customImage.addHitArea(this.onClick.bind(this));
    	}
	},

	onClick: function()
	{
		if(!this.config){return}
		let config = this.config.buttonAction;
		switch(config.action)
		{
			case 'none':
				console.log("No action")
				return;
			case 'Go To Scene':
				this.goToScene(config.target)
				break;
			case 'Play':
				console.log("Playing Video");
				if(this.VideoPlayer)
				{
					this.VideoPlayer.playVideo(config.target);
				}
				break;
			case 'Pause':
				console.log("Pause Video");
				if(this.VideoPlayer)
				{
					this.VideoPlayer.pauseVideo(config.target);
				}
				break;
			case 'Opens Link Below':
				console.log("Open URL", this.config.links.iOS, this.config.links.android);
				CMP.callCTA(this.config.links.android,this.config.links.iOS);
				break;
		}
	},

	layout:{
		xPercentage:0.5,
		yPercentage:0.5,
		scaleToWidth:0.2,
		scaleToHeight:1
	}
};
extend("CustomButton", "SceneObject");