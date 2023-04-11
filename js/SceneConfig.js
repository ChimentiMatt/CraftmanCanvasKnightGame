SceneConfig = {
	scenes: [
		{
			name: 'intro',
			description: 'before the game',
			children: [
				{
					class_name: Intro,
					status: 'enabled',
					layer: 0
				},
				{
					class_name: IntroButton,
					status: 'enabled',
					layer: 0
				},
			]
		},
		{
			name: 'tutorial',
			description: 'Tutorial',
			children: [
				{
					class_name: GameBoard,
					status: 'enabled',
					layer: 2
				},

			]
		},
		{
			name: 'freeplay',
			description: 'Free Play',
			children: [
				{
					class_name: Background,
					status: 'enabled',
					layer: 0
				},
				{
					class_name: GameBoard,
					status: 'enabled',
					layer: 1
				},
				{
					class_name: CTA,
					status: 'enabled',
					layer: 3
				}
			]
		},
	],
	first_scene: 'intro',
	// first_scene: 'buttons',
	live: true
};