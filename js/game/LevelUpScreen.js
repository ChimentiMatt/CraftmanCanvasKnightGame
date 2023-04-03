LevelUpScreen = function (params) {
    params.width = 100;
    params.height = 100;
    this.construct(params);
};

LevelUpScreen.prototype = {
    backgroundColor: 'teal',
    prompt: '',
    choiceOne: '',
    choiceTwo: '',
    choiceThree: '',

    customAssets: [
    ],
    customOptions: [
    ],

    init: function() {
        CMP.ListenSet("GetLevelUpScreen", this.GetLevelUpScreen.bind(this));

        this.prompt = this.addChild(new CMP.Text({
            x: this.percentageOfWidth(0.5),
            y: this.percentageOfHeight(0.1),
            lineWidth: 290,
            text: 'Level Up',
            textAlign: "center",
            textBaseline: "middle",
            font: "5pt arial",
            color: "black",
            backgroundColor: 'blue'
        }));

        this.choiceOne = this.addChild(new CMP.Text({
            x: this.percentageOfWidth(0.5),
            y: this.percentageOfHeight(0.3),
            lineWidth: 290,
            text: 'na',
            textAlign: "center",
            textBaseline: "middle",
            font: "5pt arial",
            color: "black"
        }));

        this.choiceTwo = this.addChild(new CMP.Text({
            x: this.percentageOfWidth(0.5),
            y: this.percentageOfHeight(0.5),
            lineWidth: 290,
            text: 'na',
            textAlign: "center",
            textBaseline: "middle",
            font: "5pt arial",
            color: "black"
        }));

        this.choiceThree = this.addChild(new CMP.Text({
            x: this.percentageOfWidth(0.5),
            y: this.percentageOfHeight(0.7),
            lineWidth: 290,
            text: 'na',
            textAlign: "center",
            textBaseline: "middle",
            font: "5pt arial",
            color: "black"
        }));

        this.pointer = this.addChild(new CMP.SizedSprite({
            width: 8,
            height: 8,
            image: 'pointer',
            x: this.percentageOfWidth(0),
            y: this.percentageOfHeight(0.5),
            // scale: 30.75
        }))

        // console.log(this.pointer)
    },

    GetLevelUpScreen: function() {
        return this;
    },

    layout: {
        xPercentage: 0.5,
        yPercentage: 0.5,
        scaleToWidth: .8,
        scaleToHeight: .8
    }
};
extend("LevelUpScreen", "SceneObject");