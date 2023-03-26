Playable = function () {
	this.setupGame();
};

Playable.prototype = {
	setupGame: function() {

		this.screenContainer = CMP.App.stage.addChild(new CMP.DisplayObjectContainer("match"));
		this.sceneManager = this.screenContainer.addChild(new SceneManager('match'));

        CMP.Progress('started');

        var androidURL = AppConfig.LEVEL_CONFIG.CTA_LINKS.android;
        var iOSURL = AppConfig.LEVEL_CONFIG.CTA_LINKS.iOS;

        this.sceneManager.androidURL = androidURL;
        this.sceneManager.iOSURL = iOSURL;
    },

    refresh: function() {
        this.sceneManager.refresh();
    }
};