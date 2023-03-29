Upgrades = function (params) {
    params.width = 8;
    params.height = 8;
    this.construct(params);
    this.init();
};

Upgrades.prototype = {


    init: function() {
        CMP.ListenSet("GetUpgrades", this.GetUpgrades.bind(this));

        this.weapons = CMP.DispatchGet({type: "GetWeapons"});
        this.levelUpScreen = CMP.DispatchGet({type: "GetLevelUpScreen"});
        this.generateChoices();
        console.log(this.weapons[0].name)
    },

    generateChoices: function() {
        // for(let i = 0; i < this.weapons.length; i++){
        // }
        this.levelUpScreen.choiceOne.text = this.weapons[0].name
        this.levelUpScreen.choiceTwo.text = this.weapons[1].name
        this.levelUpScreen.choiceThree.text = this.weapons[2].name
    },

    GetUpgrades: function() {
        return this;
    },


}
extend("Upgrades", "CMP.DisplayObjectContainer");