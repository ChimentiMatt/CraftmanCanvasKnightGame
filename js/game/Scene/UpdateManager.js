UpdateManager = function (params)
{
    this.construct(params);
    this.init();
};

UpdateManager.prototype =
{
    init: function()
    {
    },

    checkCustOpts: function()
    {
        // check if CUST_OPTIONS exists
        if(typeof CUST_OPTIONS !== 'undefined') {
            // if CUST_OPTION prop exists in LEVEL_CONFIG, update LEVEL_CONFIG or add it in if not
            for(let i=0; i<CUST_OPTIONS.length; i++) {
                if(CUST_OPTIONS[i].type === "multitoggle") { // multitoggle needs to loop thru options
                    for(let j=0; j<CUST_OPTIONS[i].options.length; j++) {
                        AppConfig.LEVEL_CONFIG[CUST_OPTIONS[i].options[j].id] = 
                            this.parseCustOption(CUST_OPTIONS[i].options[j])
                    }
                }
                else {
                    AppConfig.LEVEL_CONFIG[CUST_OPTIONS[i].id]=this.parseCustOption(CUST_OPTIONS[i])
                }
            }
        }
    },

    parseCustOption: function(option)
    {
        // add new field to level config if not defined
        if(typeof AppConfig.LEVEL_CONFIG[option.id] === 'undefined') {
            return option
        }
        if(option.type === "text") {
            return {
                text:option.default,
                color:option.color,
                family:option.family,
                shadow:option.shadow,
                size:option.size,
                style:option.style,
                weight:option.weight,
                groupId:option.groupId
            }
        }
        if(option.type === "dropdown" && typeof option.toggle !== "undefined") {
            return {
                value:option.default,
                toggle:option.toggle
            }
        }
        return option.default
    },

    updateAssetData: function(id, enabled, dimensions, size, key, url, src)
    {
        // update AppConfig.CUSTOMIZABLE
        let toUpdate = (AppConfig.CUSTOMIZABLE.find(asset => asset.id === id) ||
            (AppConfig.CUSTOMIZABLE_VID 
                && AppConfig.CUSTOMIZABLE_VID.find(asset => asset.id === id)) ||
            (AppConfig.CUSTOMIZABLE_AUDIO
                && AppConfig.CUSTOMIZABLE_AUDIO.find(asset => asset.id === id)) ||
            (AppConfig.CUSTOMIZABLE_FONT 
                && AppConfig.CUSTOMIZABLE_FONT.find(asset => asset.id === id)));
        if(typeof toUpdate !== "undefined") {
            if(typeof enabled !== "undefined") {
                toUpdate.enabled = enabled;
            }
            if(typeof dimensions !== "undefined") {
                toUpdate.dimensions = dimensions;
            }
            if(typeof size !== "undefined") {
                toUpdate.actualSize = size; 
            }
            if(typeof key !== "undefined") {
                toUpdate.key = key; 
            }
            if(typeof url !== "undefined") {
                toUpdate.url = url; 
            }
            // src should never change so we dont store base64 in config?
            // if(typeof src !== "undefined") {
            //     if(typeof toUpdate.mp3 !== "undefined") {
            //         toUpdate.mp3 = src;
            //     }
            //     else {
            //         toUpdate.src = src; 
            //     }
            // }
        }
        else{
            let custBtns = this.getCustomButtons();
            for(scene in custBtns) {
                let toUpdate = custBtns[scene].assets.find(asset => asset.id === id);
                if(typeof toUpdate !== "undefined") {
                    if(typeof enabled !== "undefined") {
                        toUpdate.enabled = enabled;
                    }
                    if(typeof dimensions !== "undefined") {
                        toUpdate.dimensions = dimensions;
                    }
                    if(typeof size !== "undefined") {
                        toUpdate.actualSize = size; 
                    }
                    if(typeof key !== "undefined") {
                        toUpdate.key = key; 
                    }
                    if(typeof url !== "undefined") {
                        toUpdate.url = url; 
                    }
                }
            }
        }
    },

    processCustomOptions: function(customOptionsList)
    {
        for (let i = 0; i < customOptionsList.length; ++i) {
            let customOption = customOptionsList[i];
            let key = customOption.id || customOption.name;
            let value = customOption.value !== undefined ? customOption.value : customOption.default;

            if(customOption.type === "customButton") {
                this.updateCustomButton(customOption)
                continue;
            }
            if(customOption.type === "text") {
                value = {
                    text: customOption.default,
                    family: customOption.family,
                    size: customOption.size,
                    style: customOption.style,
                    weight: customOption.weight,
                    color: customOption.color,
                    shadow: customOption.shadow,
                    groupId: customOption.groupId
                }
            }
            if(customOption.type === "dropdown" && typeof customOption.toggle !== "undefined") {
                value = {
                    value: customOption.default,
                    toggle: customOption.toggle
                }
            }

            if (customOption.type === "multitoggle") {
                customOption.options.forEach(subopt => 
                    AppConfig.LEVEL_CONFIG[subopt.id] = subopt.default)
            }
            else if (typeof AppConfig.LEVEL_CONFIG[key] === "number") {
                AppConfig.LEVEL_CONFIG[key] = Number(value);
            } 
            else if (AppConfig.LEVEL_CONFIG[key] === undefined) {
                continue;
            } 
            else {
                AppConfig.LEVEL_CONFIG[key] = value;
            }
        }

        CMP._sceneManager.refresh();
    },

    updateCustomButton: function(option)
    {
        let customButtons = this.getCustomButtons();
        for(let i in customButtons)
        {
            let configs = customButtons[i];
            for(let j = 0; j < configs.options.length; j++)
            {
                if(option.id == configs.options[j].id)
                {
                    for(let prop in option)
                    {
                        if(prop == 'xPercentage' || prop == 'yPercentage' || 
                            prop == 'scaleToWidth' || prop == 'scaleToHeight' || 
                            prop == 'groupPos' || prop == 'anchor')
                        {
                            option[prop] = Number.parseFloat(option[prop]);
                        }
                        configs.options[j][prop] = option[prop];
                    }
                }
            }
        }
    },

    processCustomAssets: function(message)
    {
        let customAssetData = message; 
        console.log("Custom asset data received",customAssetData);
        for (let i = 0; i < customAssetData.length; i++) 
        {
            customAssetData[i].messageId = message.messageId; 
            if(typeof customAssetData[i].file === "undefined") { continue; }
			
            if(typeof customAssetData[i].file == "object") 
			{
				let reader = new FileReader();
				reader.readAsDataURL(customAssetData[i].file);
				reader.onload = this.processFileData.bind(this, customAssetData[i], reader);
				reader.onerror = function (error) {
					console.log('Error: ', error);
				}; 
			}
			else
			{
				this.processFileData(customAssetData[i], {result: customAssetData[i].file})
			}
        }
    },
	
    processFileData: function(customAssetData, reader)
    {
		customAssetData.file = reader.result;
		
		if (typeof BatchManager == "undefined")
		{
			this.readFile(customAssetData);
		}
		else
		{
			this.processBase64(customAssetData);
		}
    },
	
    processBase64: function(customAssetData)
    {
		this.addToEngine(customAssetData, customAssetData.file, customAssetData.type); 
    },

    readFile: function(assetData)
    {
        let result = assetData.file;
		let type = assetData.type;
        console.log("Parsing result",type);
        switch(type)
        {
            case 'image':
                this.processImageFile(assetData, result);
                break;
            case 'audio':
                this.processAudioFile(assetData, result);
                break;
            case 'video':
                this.processVideoFile(assetData, result);
                break;
            case 'font':
                this.processFontFile(assetData, result);
                break;
            default:
                this.processImageFile(assetData, result);
                break;
        }
    },

    processImageFile: function(assetData,result) 
    {
        if(!assetData.enabled) {
            CMP.DisableImage(assetData.id);
            this.updateAssetData(assetData.id, false, undefined, 163, assetData.key, assetData.url);
        }
        else {
            CMP.EnableImage(assetData.id);
            this.updateAssetData(assetData.id, true, undefined, CMP.App.assetManager.getAssetSize(assetData.id, "Image"), assetData.key, assetData.url);
        }

        let img = new Image(); 
        img.onload = this.onImageLoad.bind(this,assetData,result,img);
        img.src = result; 
    },

    endFn: function(messageId)
    {
		CMP.Dispatch({type:'IdLoaded',id:messageId});
        CMP._sceneManager.refresh();
    },

    onImageLoad: function(assetData,result,img) 
    {
        // update asset data in scene manager
        let imgSize = Math.round(result.length*(3/4));
        let dimensions = {
            width: img.width,
            height: img.height
        };
        this.updateAssetData(assetData.id, assetData.enabled, dimensions, imgSize, assetData.key, assetData.url);
        
        console.log('Replacing', assetData.id);
        CMP.ReplaceImage(assetData.id, result, this.endFn.bind(this,assetData.messageId));

        //CMP._sceneManager.updateSceneConfigs();

        this.updateAssetsArrs(assetData.id, result) 
    },

    processVideoFile: function(assetData, result) 
    {
        console.log('Replacing', assetData.id, assetData);

        let videoSize = Math.round(result.length*(3/4));
        let video = document.createElement('video');
        video.id = "video";
        video.muted = true;
        video.addEventListener("loadedmetadata", {
            handleEvent: function() {
                let dimensions = {
                    width: video.videoWidth,
                    height: video.videoHeight
                };
                this.updateAssetData(assetData.id, assetData.enabled, dimensions, videoSize, assetData.key, assetData.url, result);

                CMP.ReplaceVideo(assetData.id, result, this.endFn.bind(this,assetData.messageId));
                CMP._sceneManager.updateSceneConfigs();

                this.updateAssetsArrs(assetData.id, result) 
            }.bind(this)
        });
        video.src = result;
        //this.updateAssetData(assetData.id, true, undefined, CMP.App.assetManager.getAssetSize(assetData.id, "Video"), assetData.key, assetData.url);
    },

    processAudioFile: function(assetData, result) 
    {
        result = "data:audio/mp3;" + result.split(';')[1]; // manually force data to be audio
        console.log('Replacing', assetData.id);
        
        let audioSize = Math.round(result.length*(3/4));
        let audio = document.createElement('audio');
        audio.id = "audio";
        audio.addEventListener("canplaythrough", {
            handleEvent: function() {
                console.log('canplaythrough');
                this.updateAssetData(assetData.id, assetData.enabled, undefined, audioSize, assetData.key, assetData.url, result);

                CMP.ReplaceAudio(assetData.id, result, this.endFn.bind(this,assetData.messageId));
                CMP._sceneManager.updateSceneConfigs();

                this.updateAssetsArrs(assetData.id, result) 
            }.bind(this)
        })
        audio.src = result;
    },

    processFontFile: function(assetData, result) 
    {
        console.log('Replacing', assetData.id);
        let fontSize = Math.round(result.length*(3/4));

		let newFontFam = "assets/fonts/customizable/"+assetData.id+".ttf";
		CUST_ASSETS[newFontFam] = -1;
		let foundFont = AppConfig.CUSTOMIZABLE_FONT.find(config => config.id === assetData.id);
		if(typeof foundFont !== "undefined") {
			foundFont.src = newFontFam;
		}

        this.updateAssetData(assetData.id, assetData.enabled, undefined, fontSize, assetData.key, assetData.url, result);
        
        CMP.ReplaceFont(assetData.id, result, this.endFn.bind(this,assetData.messageId));
    
        // recursively check for customOptions and update family options
        this.updateFont(CMP._sceneManager.scenes, assetData.id);
        CMP._sceneManager.updateSceneConfigs();

        this.updateAssetsArrs(assetData.id, result);
    },

    updateFont: function(scenes, newId)
    {
		for(scene in scenes) {
			for(child in scenes[scene].children) {
				let custOpts = scenes[scene].children[child].type.prototype.customOptions;
				if(typeof custOpts !== "undefined") {
					for(let i=0; i<custOpts.length; i++) {
						if(custOpts[i].familyOptions && !custOpts[i].familyOptions.includes(newId)) {
                            custOpts[i].familyOptions.push(newId);
						}
                        if(custOpts[i].textAsset && custOpts[i].textAsset === newId) {
							custOpts[i].family = newId;
							if(typeof AppConfig.LEVEL_CONFIG[custOpts[i].id] !== "undefined") {
								AppConfig.LEVEL_CONFIG[custOpts[i].id].family = newId;
							}
						}
					}
				}
			}
		}
    },

    updateAssetsArrs: function(id, base64str) 
    {
        // find id in CUST_ASSETS
        let key = Object.keys(CUST_ASSETS).find(
            asset => asset.split("customizable/").length > 1 && id === asset.split("customizable/")[1].split(".")[0]);

        // if base64str already exists in assets_64, change pointer then cleanup
        if(typeof ASSETS_64 !== "undefined" && ASSETS_64.indexOf(base64str) > -1) {
            let ind = ASSETS_64.indexOf(base64str);
            console.log('str already exists', id, key, ind)
            CUST_ASSETS[key] = ind;
            this.cleanupAssets64();
        }
        // if not exists, set ptr in CUST_ASSETS to undef, cleanup, put base64str into "" spot, update ptr
        else if (typeof CUST_ASSETS !== "undefined") {
            console.log('str does not exist', id)
            CUST_ASSETS[key] = undefined;
            this.cleanupAssets64();
            // insert new base64 into first "" in ASSETS_64 - if none, then push
            let newInd = ASSETS_64.indexOf("");
            if(newInd > -1) {
                ASSETS_64[newInd] = base64str
            }
            else {
                ASSETS_64.push(base64str);
                newInd = ASSETS_64.length-1;
            }
            // update CUST_ASSETS ptr
            CUST_ASSETS[key] = newInd;
        }
    },

    cleanupAssets64: function() 
    {
        if(typeof ASSETS_64 === "undefined") { return; }

        // foreach in ASSETS_64 check if anything in CUST_ASSETS references it
        for(let i=0; i<ASSETS_64.length; i++) {
            if(typeof Object.values(CUST_ASSETS).find(value => value === i) === 'undefined') {
                // if nothing is referencing it change to ""
                ASSETS_64[i] = "";
            }
        }
    },
	
	addNewAsset: function(customAssetData)
    {
        console.log("IN add new assets updateManager");
        this.processCustomAssets(customAssetData);
    },

    addToEngine: function(assetData,result,type)
    {
        console.log("Parsing result",type);
        switch(type)
        {
            case 'image':
                this.addImageToEngine(assetData, result);
                break;
            case 'audio':
                this.processAudioFile(assetData, result);
                break;
            case 'video':
                this.processVideoFile(assetData, result);
                break;
            case 'font':
                this.processFontFile(assetData, result);
                break;
            default:
                this.processImageFile(assetData, result);
                break;
        }
    },

    addImageToEngine: function(assetData,result) 
    {
        let id = assetData.newAssetId;
        if(typeof ASSETS !== 'undefined')
        {
            ASSETS[id] = result;
        }
        if(typeof ASSETS_64 !== 'undefined')
        {
            let len = ASSETS_64.push(result);
            CUST_ASSETS[id] = len-1;
        }
        CMP.Loader.loadImage({id:id, src:id},this.onAddComplete.bind(this,assetData));
    },

    onAddComplete: function(assetData)
    {
        console.log("Finished adding ", assetData);
        let BatchManagerObj = CMP._sceneManager.currentSceneObjects['BatchManager'];
        if(BatchManagerObj)
        {
            // let nameArr = assetData.file.name.split('.');
            // nameArr.pop();
            // let name = nameArr.join('');

            // TODO: Get names from assets rather than generating strings (nikita q)
            let name = CMP._IceInterface.randomString(7);
            BatchManagerObj.addFileToBatch(assetData.newAssetId, assetData.name || 'Placement1', name);
			CMP.Dispatch({type:'IdLoaded',id:assetData.mesageId});
        }
    }
};
extend("UpdateManager", "CMP.DisplayObjectContainer");