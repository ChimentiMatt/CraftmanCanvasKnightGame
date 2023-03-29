LevelUpScreen = function (params) {
    params.width = 100;
    params.height = 100;
    this.construct(params);
};

LevelUpScreen.prototype = {
    backgroundColor: 'teal',

    customAssets: [
    ],
    customOptions: [
    ],

    init: function() {
        CMP.ListenSet("GetLevelUpScreen", this.GetLevelUpScreen.bind(this));
        this.visible = false,
        this.prompt = this.addChild(new CMP.Text({
            x: this.percentageOfWidth(0.5),
            y: this.percentageOfHeight(0.1),
            lineWidth: 290,
            text: 'Level Up',
            textAlign: "center",
            textBaseline: "middle",
            font: "5pt arial",
            color: "black"
        }));

        this.choiceOne = this.addChild(new CMP.Text({
            x: this.percentageOfWidth(0.5),
            y: this.percentageOfHeight(0.4),
            lineWidth: 290,
            text: 'AttackSpeed ',
            textAlign: "center",
            textBaseline: "middle",
            font: "5pt arial",
            color: "black"
        }));

        this.choiceTwo = this.addChild(new CMP.Text({
            x: this.percentageOfWidth(0.5),
            y: this.percentageOfHeight(0.5),
            lineWidth: 290,
            text: 'MoveSpeed',
            textAlign: "center",
            textBaseline: "middle",
            font: "5pt arial",
            color: "black"
        }));

        this.choiceThree = this.addChild(new CMP.Text({
            x: this.percentageOfWidth(0.5),
            y: this.percentageOfHeight(0.6),
            lineWidth: 290,
            text: 'Um, cat?',
            textAlign: "center",
            textBaseline: "middle",
            font: "5pt arial",
            color: "black"
        }));
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
    // layout: 'match'
};
extend("LevelUpScreen", "SceneObject");