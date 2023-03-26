EndCTA = function (params) {
	params.width = 374;
    params.height = 181;
	this.construct(params);
};

EndCTA.prototype = {
    customOptions: [
    	{
            id: "CTA_LINKS",
            title: "CTA Link",
            description: "Links used to redirect user to app/play store",
            enabled: true,
            type: "url",
            default: {
                iOS: "craftsmanplus.com",
                android: "craftsmanplus.com"
            },
            groupId: "cta",
            groupPos: 1
        },
        {
            id: "CTA_ANIM",
            title: "End CTA Animation",
            description: "How should the CTA animate at the end?",
            enabled: true,
            type: "dropdown",
            default: 'scale',
            options: ['rotate', 'scale', 'fade', 'vertical', 'horizontal', 'none'],
            groupId: "end_cta_anim",
            groupPos: 0
        },
        {
            id: "CTA_ANIM_STRENGTH_MULTIPLIER",
            title: "End CTA Animation Strength",
            description: "How much more should the end CTA animation move than the default?",
            enabled: true,
            type: "range",
            default: 1,
            max: 4,
            min: 0,
            step: .1,
            groupId: "end_cta_anim",
            groupPos: 1
        }
    ],
    dependencies: [
        {
            controller: "CTA_ANIM",
            values: ['rotate', 'scale', 'fade', 'vertical', 'horizontal'],
            options: ["CTA_ANIM_STRENGTH_MULTIPLIER"],
            assets: []
        }
    ],
    setNeighbors: function() {
    },
    animImage: function() {
        var type = AppConfig.LEVEL_CONFIG.CTA_ANIM;
        var scaleX = 1;
        var scaleY = 1;
        var alpha = 1;
        var x = this.install.x;
        var y = this.install.y;
        var rotation = 0;
        if (type == "scale") {
            scaleX = 1.1 * AppConfig.LEVEL_CONFIG.CTA_ANIM_STRENGTH_MULTIPLIER;
            scaleY = 1.1 * AppConfig.LEVEL_CONFIG.CTA_ANIM_STRENGTH_MULTIPLIER;
        }
        else if (type == "vertical") {
            y = this.install.y - 30 * AppConfig.LEVEL_CONFIG.CTA_ANIM_STRENGTH_MULTIPLIER;
        }
        else if (type == "fade") {
            this.install.alpha = 0 + 1 - AppConfig.LEVEL_CONFIG.CTA_ANIM_STRENGTH_MULTIPLIER;
        }
        else if (type == "horizontal") {
            x = this.install.x + 30 * AppConfig.LEVEL_CONFIG.CTA_ANIM_STRENGTH_MULTIPLIER;
            this.install.x -= 30 * AppConfig.LEVEL_CONFIG.CTA_ANIM_STRENGTH_MULTIPLIER;
        }
        else if (type == "rotate") {
            rotation = 5 * AppConfig.LEVEL_CONFIG.CTA_ANIM_STRENGTH_MULTIPLIER;
            this.install.rotation = -5 * AppConfig.LEVEL_CONFIG.CTA_ANIM_STRENGTH_MULTIPLIER;
        }
        this.install.tweenTo({
            x: x,
            y: y,
            rotation: rotation,
            scaleX: scaleX,
            scaleY: scaleY,
            alpha: alpha,
            duration: .5,
            loop: true,
            rewind: true,
            easing: CMP.Tween.Sine.InOut
        });
        // this.refreshAnimation();
    },
    refreshAnimation: function() {
        this.install.clearTweens();
        this.install.alpha = 1;
        this.install.rotation = 0;
        this.install.scaleX = 1;
        this.install.scaleY = 1;
        this.install.x = this.percentageOfWidth(.5);
        this.install.y = this.percentageOfHeight(.5);
        this.animImage();
    },
	layout: function(ratio) {
        if (ratio < .7) {
            return {
                xPercentage: .5,
                yPercentage: .76,
                scaleToWidth: .7,
                scaleToHeight: .3
            }
        }
        else if (ratio < 1) {
            return {
                xPercentage: .5,
                yPercentage: .75,
                scaleToWidth: .85,
                scaleToHeight: .5
            }
        }
		else {
            return {
                xPercentage: .5,
                yPercentage: .8,
                scaleToWidth: .5,
                scaleToHeight: .3
            }
        }
	},
    refresh: function() {
        this.refreshAnimation();
    }
};
extend("EndCTA", "CTA");