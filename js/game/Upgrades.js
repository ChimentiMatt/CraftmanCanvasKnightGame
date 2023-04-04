Upgrades = function (params) {
    params.width = 8;
    params.height = 8;
    this.construct(params);
    this.init();
};

Upgrades.prototype = {
    
    // weapons or companions not yet in kit
    potentialAdditions: [
        'Ninja Star',
        'Spear',
        // 'sword',
        // 'Cat Companion',
    ],
    
    choiceOne: {
        'text': '',
        'weapon': ''
    },
    choiceTwo: {
        'text': '',
        'weapon': ''
    },
    choiceThree: {
        'text': '',
        'weapon': ''
    },

    init: function() {
        CMP.ListenSet("GetUpgrades", this.GetUpgrades.bind(this));

        this.gameBoard = CMP.DispatchGet({type: "GetGameBoard"})
        this.weapons = CMP.DispatchGet({type: "GetWeapons"});
        this.levelUpScreen = CMP.DispatchGet({type: "GetLevelUpScreen"});
        // this.generateChoices();
    },
    
    generateChoices: function() {
        this.levelUpScreen =  CMP.DispatchGet({type: "GetLevelUpScreen"});
        this.duplicatesArray = [...this.potentialAdditions]

        let randomIndex = Math.floor(Math.random() * (this.duplicatesArray.length - 0 ) + 0);
        this.choiceOne.weapon = this.duplicatesArray[randomIndex]
        this.duplicatesArray.splice(randomIndex, 1)
        
        randomIndex = Math.floor(Math.random() * (this.duplicatesArray.length - 0 ) + 0);
        this.choiceTwo.weapon = this.duplicatesArray[randomIndex]
        this.duplicatesArray.splice(randomIndex, 1)

        for (let i = 0; i < 3; i++){
            if (i === 0) this.menuLogics(this.choiceOne.weapon, i)
            if (i === 1) this.menuLogics(this.choiceTwo.weapon, i)
        }

        this.duplicatesArray = []
    },

    menuLogics: function(choice, slot) {
        let text = '';
        let newEquipment = false;


        if (choice === 'Ninja Star'){
            text = 'Ninja Star'
            if (this.gameBoard.ninjaStar === undefined){
                newEquipment = true
            }
        }
        if (choice === 'Spear'){
            text = 'Spear'
            if (this.gameBoard.spear === undefined){
                newEquipment = true
            }
        }

        if (slot === 0){
            if (newEquipment){
                this.levelUpScreen.choiceOne.text =  text
            }
            else{
                if (text === 'Ninja Star') this.levelUpScreen.choiceOne.text = this.gameBoard.ninjaStar.selectPotentialUpgrade();
                if (text === 'Spear') this.levelUpScreen.choiceOne.text = this.gameBoard.spear.selectPotentialUpgrade();
            }
        }
        else if (slot === 1){
            if (newEquipment){
                this.levelUpScreen.choiceTwo.text =  text
            }
            else{
                if (text === 'Ninja Star') this.levelUpScreen.choiceTwo.text = this.gameBoard.ninjaStar.selectPotentialUpgrade();
                if (text === 'Spear') this.levelUpScreen.choiceTwo.text = this.gameBoard.spear.selectPotentialUpgrade();
            }
        }
        else if (slot === 2){
            if (newEquipment){
                this.levelUpScreen.choiceThree.text =  text
            }
            else{
                if (text === 'Ninja Star')  this.levelUpScreen.choiceThree.text = this.gameBoard.ninjaStar.selectPotentialUpgrade();
                if (text === 'Spear')  this.levelUpScreen.choiceThree.text = this.gameBoard.spear.selectPotentialUpgrade();
            }
        }
    },

    selectChoice: function(pointerSelection) {
        if (pointerSelection === 1){ // top selection
            this.handleChoice(this.choiceOne.weapon) 
        }
        if (pointerSelection === 0){ // top selection
            this.handleChoice(this.choiceTwo.weapon) 
        }
    },
    
    handleChoice: function(choice, choiceSlot) {        
        if (choice === 'Ninja Star'){
        
            if (this.gameBoard.ninjaStar === undefined){
                this.gameBoard.initNinjaStar();
            }
            else{
                this.gameBoard.ninjaStar.implementUpgrade();
            }
        }
        if (choice === 'Spear'){
        
            if (this.gameBoard.spear === undefined){
                this.gameBoard.initSpear();
            }
            else{   
                this.gameBoard.spear.implementUpgrade();
            }
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