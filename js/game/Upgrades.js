Upgrades = function (params) {
    params.width = 8;
    params.height = 8;
    this.construct(params);
    this.init();
};

Upgrades.prototype = {
    potentialAdditions: [
        'cat companion',
        'spear',
        'ninja start'
    ],


    init: function() {
        CMP.ListenSet("GetUpgrades", this.GetUpgrades.bind(this));

        this.gameBoard = CMP.DispatchGet({type: "GetGameBoard"})
        this.weapons = CMP.DispatchGet({type: "GetWeapons"});
        this.levelUpScreen = CMP.DispatchGet({type: "GetLevelUpScreen"});
        this.generateChoices();
    },

    generateChoices: function() {
        this.swordRightUpgrades = this.weapons[0].potentialUpgrades()
        // alert(this.swordRightUpgrades[0][0].text)
        this.swordLeftUpgrades = this.weapons[1].potentialUpgrades()
        console.log(this.swordLeftUpgrades[0][0].text )

        this.levelUpScreen =  CMP.DispatchGet({type: "GetLevelUpScreen"});
        if (this.levelUpScreen !== undefined){

            this.levelUpScreen.choiceOne.text = this.swordRightUpgrades[0][0].text
            this.levelUpScreen.choiceTwo.text = this.potentialAdditions[0]
            this.levelUpScreen.choiceThree.text = this.swordLeftUpgrades[0][0].text 
        }
    },

    selectChoice: function(pointerSelection) {
        if (pointerSelection === -1){ // top selection
            this.handleChoice(this.levelUpScreen.choiceThree.text) 
        }
        else if (pointerSelection === 0){ // middle selection
            this.handleChoice(this.levelUpScreen.choiceTwo.text)
        }
        else if (pointerSelection === 1){ // bottom selection
            this.handleChoice(this.levelUpScreen.choiceOne.text)
        }
    },

    handleChoice: function(choice) {
        if (choice === 'cat companion'){
            this.potentialAdditions.splice(0, 1)
            this.gameBoard.initCat();
        }
        if (choice === 'Right Sword Attack Speed'){
            // this.weapons[0].attackInterval = 0; // resets interval so 
            this.weapons[0].attackSpeed -= 10;
            console.log(choice)

   
        }


        this.gameBoard.paused = false;

        this.gameBoard.removeChild(this.levelUpScreen);
        this.gameBoard.inLevelUpScreen = false;
    },


    GetUpgrades: function() {
        return this;
    },


}
extend("Upgrades", "CMP.DisplayObjectContainer");