AppConfig = {
	TITLE: "Playable",
	VERSION: 0.1,
	PRODUCTION: false,
	ENGINE_MIN: true,
	LOG_LEVEL: 3,
	JS_DEPENDENCIES: true,
	USE_STAGEGL: false,
	TRANSPARENT_WEBGL_STAGE: false,
	ADVERTISER: 'NA', // e.g. Backflip          // Be sure this field and the two below it are relatively short
	CAMPAIGN: 'Learning', // e.g. Dragonvale            // When making Google builds, these fields are used to title the files
	CREATIVE_NAME: 'Auto Runner Learning', // e.g. Concept1    // And Google doesn't like them being too long
	LEVEL_CONFIG: {
		CTA_LINKS: {
			android: "craftsmanplus.com",
			iOS: "craftsmanplus.com"
		},
		CTA_ANIM: "rotate",
		CTA_ANIM_STRENGTH_MULTIPLIER: 1,

		CTA_POSITION_PORTRAIT: "bottom_center",
		CTA_POSITION_LANDSCAPE: "bottom_right",
		LOGO_POSITION_PORTRAIT: "top_center",
		LOGO_POSITION_LANDSCAPE: "top_left",

		CTA_LAYOUT_PARAMETERS: {
			PORTRAIT_PHONE_LAYOUT: {
				ANCHOR_RIGHT: 0.015,
				ANCHOR_LEFT: 0.015,
				ANCHOR_TOP: 0.015,
				ANCHOR_BOTTOM: 0.015,
				SCALE_TO_WIDTH: 0.5,
				SCALE_TO_HEIGHT: 0.2
			},
			PORTRAIT_TABLET_LAYOUT: {
				ANCHOR_RIGHT: 0.015,
				ANCHOR_LEFT: 0.015,
				ANCHOR_TOP: 0.015,
				ANCHOR_BOTTOM: 0.015,
				SCALE_TO_WIDTH: 0.4,
				SCALE_TO_HEIGHT: 0.12
			},
			LANDSCAPE_PHONE_LAYOUT: {
				ANCHOR_RIGHT: 0.02,
				ANCHOR_LEFT: 0.02,
				ANCHOR_TOP: 0.03,
				ANCHOR_BOTTOM: 0.03,
				SCALE_TO_WIDTH: 0.2,
				SCALE_TO_HEIGHT: 0.2
			},
			LANDSCAPE_TABLET_LAYOUT: {
				ANCHOR_RIGHT: 0.01,
				ANCHOR_LEFT: 0.01,
				ANCHOR_TOP: 0.01,
				ANCHOR_BOTTOM: 0.01,
				SCALE_TO_WIDTH: 0.2,
				SCALE_TO_HEIGHT: 0.2
			}
		},
		LOGO_LAYOUT_PARAMETERS: {
			PORTRAIT_PHONE_LAYOUT: {
				ANCHOR_RIGHT: 0.025,
				ANCHOR_LEFT: 0.025,
				ANCHOR_TOP: 0.025,
				ANCHOR_BOTTOM: 0.025,
				SCALE_TO_WIDTH: 0.7,
				SCALE_TO_HEIGHT: 0.2
			},
			PORTRAIT_TABLET_LAYOUT: {
				ANCHOR_RIGHT: 0.015,
				ANCHOR_LEFT: 0.015,
				ANCHOR_TOP: 0.015,
				ANCHOR_BOTTOM: 0.015,
				SCALE_TO_WIDTH: 0.6,
				SCALE_TO_HEIGHT: 0.12
			},
			LANDSCAPE_PHONE_LAYOUT: {
				ANCHOR_RIGHT: 0.02,
				ANCHOR_LEFT: 0.02,
				ANCHOR_TOP: 0.03,
				ANCHOR_BOTTOM: 0.03,
				SCALE_TO_WIDTH: 0.3,
				SCALE_TO_HEIGHT: 0.2
			},
			LANDSCAPE_TABLET_LAYOUT: {
				ANCHOR_RIGHT: 0.01,
				ANCHOR_LEFT: 0.01,
				ANCHOR_TOP: 0.02,
				ANCHOR_BOTTOM: 0.01,
				SCALE_TO_WIDTH: 0.4,
				SCALE_TO_HEIGHT: 0.2
			}
		}
	},
	Image: [
		{id: "knight", src: "assets/images/knight.png"},
		{id: "sword", src: "assets/images/sword.png"},
		{id: "spear", src: "assets/images/spear.png"},
		{id: "cat", src: "assets/images/cat.png"},
		{id: "goblin", src: "assets/images/goblin.png"},
		{id: "exp", src: "assets/images/exp.png"},
		{id: "pointer", src: "assets/images/pointer.png"},
	],
	CUSTOMIZABLE: [
		{
			id: "customizable_example",
			enabled: true,
			src: "customizable_example.png",
			name: "Customizable Image Example",
			dimensions: {width: 400, height: 400},
			suggestedSize: 13600,
			key: null,
			url: null
		}
	],
	DEFERRED: {
	},
	PLUGINS: [
		"CMP.CustomShape.js",
		"CMP.ImageNumber.js"
	],
	DevFiles: [
		"AutomatedTester.js"
	],
	JsFile: [
		{src: "js/game/Scene/UpdateManager.js"},
		{src: "js/game/Scene/AudioManager.js"},
		{src: "js/game/Scene/ConfigManager.js"},
		{src: "js/game/Scene/SceneManager.js"},
		{src: "js/game/Scene/SceneObject.js"},
		{src: "js/game/Scene/CustomButton.js"},

		{src: "js/game/Intro/Intro.js"},
		{src: "js/game/Intro/IntroButton.js"},

		{src: "js/game/Knight.js"},
		{src: "js/game/Sword.js"},
		{src: "js/game/Spear.js"},
		{src: "js/game/Cat.js"},
		{src: "js/game/Goblin.js"},
		{src: "js/game/Movements.js"},
		{src: "js/game/Collisions.js"},
		{src: "js/game/Attack.js"},
		{src: "js/game/ExpOrb.js"},
		{src: "js/game/LevelUpScreen.js"},
		{src: "js/game/Upgrades.js"},

		{src: "js/game/Playable.js"},
		{src: "js/game/Background.js"},

		{src: "js/game/GameBoard.js"},
		{src: "js/game/Logo.js"},
		{src: "js/game/CTA.js"},
		{src: "js/game/EndLogo.js"},
		{src: "js/game/EndCTA.js"},
		{src: "js/game/BGElement.js"},

		{src: "js/SceneConfig.js"}
	],
	Audio: [
	]
};