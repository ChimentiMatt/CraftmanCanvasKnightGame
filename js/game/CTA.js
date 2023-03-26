CTA = function (params) {
    params.width = 374;
    params.height = 181;
    this.construct(params);
};

CTA.prototype = {
    customAssets: [
        {
            id: "cta",
            enabled: true,
            src: "cta.png",
            name: "CTA",
            dimensions: {width: 200, height: 200},
            suggestedSize: 13600,
            key: null,
            url: null
        }
    ],
    customOptions: [
        {
            id: "CTA_LINKS",
            title: "CTA Link",
            description: "Links used to redirect user to app and play stores",
            enabled: true,
            type: "url",
            default: {
                iOS: "apps.apple.com/us/app/doordash-food-delivery/id719972451",
                android: "play.google.com/store/apps/details?id=com.dd.doordash&hl=en_US"
            },
            groupId: "cta",
            groupPos: 0
        },
        {
            id: "CTA_POSITION_PORTRAIT",
            title: "Portrait CTA Position",
            description: "Where will the cta be positioned during the main section of the playable when in portrait orientation?",
            enabled: true,
            type: "dropdown",
            default: "bottom_center",
            options: ["top_left", "top_center", "top_right", "middle_left", "middle_right", "bottom_left", "bottom_center", "bottom_right"],
            groupId: "cta",
            groupPos: 1
        },
        {
            id: "CTA_POSITION_LANDSCAPE",
            title: "Landscape CTA Position",
            description: "Where will the cta be positioned during the main section of the playable when in landscape orientation?",
            enabled: true,
            type: "dropdown",
            default: "bottom_right",
            options: ["top_left", "top_center", "top_right", "middle_left", "middle_right", "bottom_left", "bottom_center", "bottom_right"],
            groupId: "cta",
            groupPos: 2
        }
    ],
    init: function() {
        this.setLayouts();

        this.install = this.addChild(new CMP.SizedSprite({
            image: "cta",
            width: this.width,
            height: this.height,
            x: this.percentageOfWidth(.5),
            y: this.percentageOfHeight(.5)
        }));
        this.addHitArea(this.customCTA.bind(this));
    },

    customCTA: function() {
        CMP.callCTA("https://" + AppConfig.LEVEL_CONFIG.CTA_LINKS.android, "https://" + AppConfig.LEVEL_CONFIG.CTA_LINKS.iOS);
    },

    setLayouts: function() {
        //Portrait layout default: bottom center
        this.phonePortraitLayout = {
            xPercentage: 0.5,
            anchorBottom: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_PHONE_LAYOUT.ANCHOR_BOTTOM,
            scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_PHONE_LAYOUT.SCALE_TO_WIDTH,
            scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_PHONE_LAYOUT.SCALE_TO_HEIGHT
        };
        this.tabletPortraitLayout = {
            xPercentage: 0.5,
            anchorBottom: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_TABLET_LAYOUT.ANCHOR_BOTTOM,
            scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_TABLET_LAYOUT.SCALE_TO_WIDTH,
            scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_TABLET_LAYOUT.SCALE_TO_HEIGHT
        };
        if (AppConfig.LEVEL_CONFIG.CTA_POSITION_PORTRAIT == "top_left") {
            this.phonePortraitLayout = {
                anchorLeft: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_PHONE_LAYOUT.ANCHOR_LEFT,
                anchorTop: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_PHONE_LAYOUT.ANCHOR_TOP,
                scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_PHONE_LAYOUT.SCALE_TO_WIDTH,
                scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_PHONE_LAYOUT.SCALE_TO_HEIGHT
            };
            this.tabletPortraitLayout = {
                anchorLeft: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_TABLET_LAYOUT.ANCHOR_LEFT,
                anchorTop: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_TABLET_LAYOUT.ANCHOR_TOP,
                scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_TABLET_LAYOUT.SCALE_TO_WIDTH,
                scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_TABLET_LAYOUT.SCALE_TO_HEIGHT
            };
        }
        if (AppConfig.LEVEL_CONFIG.CTA_POSITION_PORTRAIT == "top_center") {
            this.phonePortraitLayout = {
                xPercentage: 0.5,
                anchorTop: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_PHONE_LAYOUT.ANCHOR_TOP,
                scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_PHONE_LAYOUT.SCALE_TO_WIDTH,
                scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_PHONE_LAYOUT.SCALE_TO_HEIGHT
            };
            this.tabletPortraitLayout = {
                xPercentage: 0.5,
                anchorTop: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_TABLET_LAYOUT.ANCHOR_TOP,
                scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_TABLET_LAYOUT.SCALE_TO_WIDTH,
                scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_TABLET_LAYOUT.SCALE_TO_HEIGHT
            };
        }
        if (AppConfig.LEVEL_CONFIG.CTA_POSITION_PORTRAIT == "top_right") {
            this.phonePortraitLayout = {
                anchorRight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_PHONE_LAYOUT.ANCHOR_RIGHT,
                anchorTop: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_PHONE_LAYOUT.ANCHOR_TOP,
                scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_PHONE_LAYOUT.SCALE_TO_WIDTH,
                scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_PHONE_LAYOUT.SCALE_TO_HEIGHT
            };
            this.tabletPortraitLayout = {
                anchorRight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_TABLET_LAYOUT.ANCHOR_RIGHT,
                anchorTop: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_TABLET_LAYOUT.ANCHOR_TOP,
                scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_TABLET_LAYOUT.SCALE_TO_WIDTH,
                scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_TABLET_LAYOUT.SCALE_TO_HEIGHT
            };
        }
        if (AppConfig.LEVEL_CONFIG.CTA_POSITION_PORTRAIT == "middle_left") {
            this.phonePortraitLayout = {
                anchorLeft: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_PHONE_LAYOUT.ANCHOR_LEFT,
                yPercentage: 0.5,
                scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_PHONE_LAYOUT.SCALE_TO_WIDTH,
                scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_PHONE_LAYOUT.SCALE_TO_HEIGHT
            };
            this.tabletPortraitLayout = {
                anchorLeft: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_TABLET_LAYOUT.ANCHOR_LEFT,
                yPercentage: 0.5,
                scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_TABLET_LAYOUT.SCALE_TO_WIDTH,
                scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_TABLET_LAYOUT.SCALE_TO_HEIGHT
            };
        }
        if (AppConfig.LEVEL_CONFIG.CTA_POSITION_PORTRAIT == "middle_right") {
            this.phonePortraitLayout = {
                anchorRight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_PHONE_LAYOUT.ANCHOR_RIGHT,
                yPercentage: 0.5,
                scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_PHONE_LAYOUT.SCALE_TO_WIDTH,
                scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_PHONE_LAYOUT.SCALE_TO_HEIGHT
            };
            this.tabletPortraitLayout = {
                anchorRight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_TABLET_LAYOUT.ANCHOR_RIGHT,
                yPercentage: 0.5,
                scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_TABLET_LAYOUT.SCALE_TO_WIDTH,
                scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_TABLET_LAYOUT.SCALE_TO_HEIGHT
            };
        }
        if (AppConfig.LEVEL_CONFIG.CTA_POSITION_PORTRAIT == "bottom_left") {
            this.phonePortraitLayout = {
                anchorLeft: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_PHONE_LAYOUT.ANCHOR_LEFT,
                anchorBottom: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_PHONE_LAYOUT.ANCHOR_BOTTOM,
                scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_PHONE_LAYOUT.SCALE_TO_WIDTH,
                scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_PHONE_LAYOUT.SCALE_TO_HEIGHT
            };
            this.tabletPortraitLayout = {
                anchorLeft: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_TABLET_LAYOUT.ANCHOR_LEFT,
                anchorBottom: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_TABLET_LAYOUT.ANCHOR_BOTTOM,
                scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_TABLET_LAYOUT.SCALE_TO_WIDTH,
                scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_TABLET_LAYOUT.SCALE_TO_HEIGHT
            };
        }
        if (AppConfig.LEVEL_CONFIG.CTA_POSITION_PORTRAIT == "bottom_center") {
            this.phonePortraitLayout = {
                xPercentage: 0.5,
                anchorBottom: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_PHONE_LAYOUT.ANCHOR_BOTTOM,
                scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_PHONE_LAYOUT.SCALE_TO_WIDTH,
                scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_PHONE_LAYOUT.SCALE_TO_HEIGHT
            };
            this.tabletPortraitLayout = {
                xPercentage: 0.5,
                anchorBottom: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_TABLET_LAYOUT.ANCHOR_BOTTOM,
                scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_TABLET_LAYOUT.SCALE_TO_WIDTH,
                scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_TABLET_LAYOUT.SCALE_TO_HEIGHT
            };
        }
        if (AppConfig.LEVEL_CONFIG.CTA_POSITION_PORTRAIT == "bottom_right") {
            this.phonePortraitLayout = {
                anchorRight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_PHONE_LAYOUT.ANCHOR_RIGHT,
                anchorBottom: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_PHONE_LAYOUT.ANCHOR_BOTTOM,
                scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_PHONE_LAYOUT.SCALE_TO_WIDTH,
                scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_PHONE_LAYOUT.SCALE_TO_HEIGHT
            };
            this.tabletPortraitLayout = {
                anchorRight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_TABLET_LAYOUT.ANCHOR_RIGHT,
                anchorBottom: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_TABLET_LAYOUT.ANCHOR_BOTTOM,
                scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_TABLET_LAYOUT.SCALE_TO_WIDTH,
                scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.PORTRAIT_TABLET_LAYOUT.SCALE_TO_HEIGHT
            };
        }

        //Landscape layout default: bottom right
        this.phoneLandscapeLayout = {
            anchorRight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_PHONE_LAYOUT.ANCHOR_RIGHT,
            anchorBottom: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_PHONE_LAYOUT.ANCHOR_BOTTOM,
            scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_PHONE_LAYOUT.SCALE_TO_WIDTH,
            scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_PHONE_LAYOUT.SCALE_TO_HEIGHT
        };
        this.tabletLandscapeLayout = {
            anchorRight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_TABLET_LAYOUT.ANCHOR_RIGHT,
            anchorBottom: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_TABLET_LAYOUT.ANCHOR_BOTTOM,
            scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_TABLET_LAYOUT.SCALE_TO_WIDTH,
            scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_TABLET_LAYOUT.SCALE_TO_HEIGHT
        };
        if (AppConfig.LEVEL_CONFIG.CTA_POSITION_LANDSCAPE == "top_left") {
            this.phoneLandscapeLayout = {
                anchorLeft: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_PHONE_LAYOUT.ANCHOR_LEFT,
                anchorTop: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_PHONE_LAYOUT.ANCHOR_TOP,
                scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_PHONE_LAYOUT.SCALE_TO_WIDTH,
                scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_PHONE_LAYOUT.SCALE_TO_HEIGHT
            };
            this.tabletLandscapeLayout = {
                anchorLeft: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_TABLET_LAYOUT.ANCHOR_LEFT,
                anchorTop: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_TABLET_LAYOUT.ANCHOR_TOP,
                scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_TABLET_LAYOUT.SCALE_TO_WIDTH,
                scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_TABLET_LAYOUT.SCALE_TO_HEIGHT
            };
        }
        if (AppConfig.LEVEL_CONFIG.CTA_POSITION_LANDSCAPE == "top_center") {
            this.phoneLandscapeLayout = {
                xPercentage: 0.5,
                anchorTop: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_PHONE_LAYOUT.ANCHOR_TOP,
                scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_PHONE_LAYOUT.SCALE_TO_WIDTH,
                scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_PHONE_LAYOUT.SCALE_TO_HEIGHT
            };
            this.tabletLandscapeLayout = {
                xPercentage: 0.5,
                anchorTop: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_TABLET_LAYOUT.ANCHOR_TOP,
                scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_TABLET_LAYOUT.SCALE_TO_WIDTH,
                scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_TABLET_LAYOUT.SCALE_TO_HEIGHT
            };
        }
        if (AppConfig.LEVEL_CONFIG.CTA_POSITION_LANDSCAPE == "top_right") {
            this.phoneLandscapeLayout = {
                anchorRight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_PHONE_LAYOUT.ANCHOR_RIGHT,
                anchorTop: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_PHONE_LAYOUT.ANCHOR_TOP,
                scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_PHONE_LAYOUT.SCALE_TO_WIDTH,
                scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_PHONE_LAYOUT.SCALE_TO_HEIGHT
            };
            this.tabletLandscapeLayout = {
                anchorRight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_TABLET_LAYOUT.ANCHOR_RIGHT,
                anchorTop: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_TABLET_LAYOUT.ANCHOR_TOP,
                scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_TABLET_LAYOUT.SCALE_TO_WIDTH,
                scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_TABLET_LAYOUT.SCALE_TO_HEIGHT
            };
        }
        if (AppConfig.LEVEL_CONFIG.CTA_POSITION_LANDSCAPE == "middle_left") {
            this.phoneLandscapeLayout = {
                anchorLeft: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_PHONE_LAYOUT.ANCHOR_LEFT,
                yPercentage: 0.5,
                scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_PHONE_LAYOUT.SCALE_TO_WIDTH,
                scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_PHONE_LAYOUT.SCALE_TO_HEIGHT
            };
            this.tabletLandscapeLayout = {
                anchorLeft: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_TABLET_LAYOUT.ANCHOR_LEFT,
                yPercentage: 0.5,
                scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_TABLET_LAYOUT.SCALE_TO_WIDTH,
                scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_TABLET_LAYOUT.SCALE_TO_HEIGHT
            };
        }
        if (AppConfig.LEVEL_CONFIG.CTA_POSITION_LANDSCAPE == "middle_right") {
            this.phoneLandscapeLayout = {
                anchorRight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_PHONE_LAYOUT.ANCHOR_RIGHT,
                yPercentage: 0.5,
                scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_PHONE_LAYOUT.SCALE_TO_WIDTH,
                scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_PHONE_LAYOUT.SCALE_TO_HEIGHT
            };
            this.tabletLandscapeLayout = {
                anchorRight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_TABLET_LAYOUT.ANCHOR_RIGHT,
                yPercentage: 0.5,
                scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_TABLET_LAYOUT.SCALE_TO_WIDTH,
                scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_TABLET_LAYOUT.SCALE_TO_HEIGHT
            };
        }
        if (AppConfig.LEVEL_CONFIG.CTA_POSITION_LANDSCAPE == "bottom_left") {
            this.phoneLandscapeLayout = {
                anchorLeft: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_PHONE_LAYOUT.ANCHOR_LEFT,
                anchorBottom: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_PHONE_LAYOUT.ANCHOR_BOTTOM,
                scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_PHONE_LAYOUT.SCALE_TO_WIDTH,
                scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_PHONE_LAYOUT.SCALE_TO_HEIGHT
            };
            this.tabletLandscapeLayout = {
                anchorLeft: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_TABLET_LAYOUT.ANCHOR_LEFT,
                anchorBottom: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_TABLET_LAYOUT.ANCHOR_BOTTOM,
                scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_TABLET_LAYOUT.SCALE_TO_WIDTH,
                scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_TABLET_LAYOUT.SCALE_TO_HEIGHT
            };
        }
        if (AppConfig.LEVEL_CONFIG.CTA_POSITION_LANDSCAPE == "bottom_center") {
            this.phoneLandscapeLayout = {
                xPercentage: 0.5,
                anchorBottom: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_PHONE_LAYOUT.ANCHOR_BOTTOM,
                scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_PHONE_LAYOUT.SCALE_TO_WIDTH,
                scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_PHONE_LAYOUT.SCALE_TO_HEIGHT
            };
            this.tabletLandscapeLayout = {
                xPercentage: 0.5,
                anchorBottom: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_TABLET_LAYOUT.ANCHOR_BOTTOM,
                scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_TABLET_LAYOUT.SCALE_TO_WIDTH,
                scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_TABLET_LAYOUT.SCALE_TO_HEIGHT
            };
        }
        if (AppConfig.LEVEL_CONFIG.CTA_POSITION_LANDSCAPE == "bottom_right") {
            this.phoneLandscapeLayout = {
                anchorRight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_PHONE_LAYOUT.ANCHOR_RIGHT,
                anchorBottom: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_PHONE_LAYOUT.ANCHOR_BOTTOM,
                scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_PHONE_LAYOUT.SCALE_TO_WIDTH,
                scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_PHONE_LAYOUT.SCALE_TO_HEIGHT
            };
            this.tabletLandscapeLayout = {
                anchorRight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_TABLET_LAYOUT.ANCHOR_RIGHT,
                anchorBottom: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_TABLET_LAYOUT.ANCHOR_BOTTOM,
                scaleToWidth: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_TABLET_LAYOUT.SCALE_TO_WIDTH,
                scaleToHeight: AppConfig.LEVEL_CONFIG.CTA_LAYOUT_PARAMETERS.LANDSCAPE_TABLET_LAYOUT.SCALE_TO_HEIGHT
            };
        }
        this._resize();
    },

    refresh: function() {
        this.setLayouts();
    },

    layout: function(ratio) {
        //Portrait phone
        if (ratio < .7) {
            return this.phonePortraitLayout;
        }
        // Portrait tablet
        if (ratio <= 1) {
            return this.tabletPortraitLayout;
        }
        //Landscape tablet
        else if (ratio < 1.7) {
            return this.tabletLandscapeLayout;
        }
        //Landscape phone
        else {
            return this.phoneLandscapeLayout;
        }
    }
};
extend("CTA", "SceneObject");