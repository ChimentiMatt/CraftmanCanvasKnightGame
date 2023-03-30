Upgrades = function (params) {
    params.width = 8;
    params.height = 8;
    this.construct(params);
    this.init();
};

Upgrades.prototype = {
    options: {
        swords: ''
    },


    init: function() {
        CMP.ListenSet("GetUpgrades", this.GetUpgrades.bind(this));

        this.weapons = CMP.DispatchGet({type: "GetWeapons"});
        this.levelUpScreen = CMP.DispatchGet({type: "GetLevelUpScreen"});
        this.generateChoices();
    },

    generateChoices: function() {
        let swordLeftUpgrades = this.weapons[0].potentialUpgrades()
        let swordRightUpgrades = this.weapons[0].potentialUpgrades()

        console.log(swordLeftUpgrades[0][0].text)

        let levelUpScreen =  CMP.DispatchGet({type: "GetLevelUpScreen"});
        if (levelUpScreen !== undefined){

            levelUpScreen.choiceOne.text = swordLeftUpgrades[0][0].text
            levelUpScreen.choiceTwo.text = swordLeftUpgrades[0][1].text
            levelUpScreen.choiceThree.text = swordRightUpgrades[0][0].text
        }
    },



    GetUpgrades: function() {
        return this;
    },


}
extend("Upgrades", "CMP.DisplayObjectContainer");