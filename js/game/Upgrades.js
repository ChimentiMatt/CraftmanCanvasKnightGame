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
        // this.choiceOne = 'Spear'
        // this.choiceTwo = 'Ninja Star'

        
        let randomIndex = Math.floor(Math.random() * (this.duplicatesArray.length - 0 ) + 0);
        console.log(randomIndex)

        this.choiceOne = this.duplicatesArray[randomIndex]
        this.duplicatesArray.splice(randomIndex, 1)
        this.choiceOneLogin();
        
        console.log(this.duplicatesArray)
        
        randomIndex = Math.floor(Math.random() * (this.duplicatesArray.length - 0 ) + 0);
        console.log(randomIndex)

        this.choiceTwo = this.duplicatesArray[randomIndex]
        this.duplicatesArray.splice(randomIndex, 1)
        this.choiceTwoLogin();

        this.duplicatesArray = []
    },

    choiceOneLogin: function() {
        if (this.choiceOne === 'Ninja Star'){
            this.levelUpScreen.choiceOne.weapon =  'Ninja Star'
            
            // if ninja star does not exist yet. default to adding it
            if (this.gameBoard.ninjaStar === undefined){
                this.levelUpScreen.choiceOne.text =  'Ninja Star'
            }
            
            // else get potential upgrades
            else{
                this.levelUpScreen.choiceOne.text = this.gameBoard.ninjaStar.selectPotentialUpgrade();
            }
        }
        else if (this.choiceOne === 'Spear'){
            this.levelUpScreen.choiceOne.weapon =  'Spear'
            
            // if ninja star does not exist yet. default to adding it
            if (this.gameBoard.spear === undefined){
                this.levelUpScreen.choiceOne.text =  'Spear'
            }
            
            // else get potential upgrades
            else{
                this.levelUpScreen.choiceOne.text = this.gameBoard.spear.selectPotentialUpgrade();
            }
        }
    },

    choiceTwoLogin: function() {
        if (this.choiceTwo === 'Ninja Star'){
            this.levelUpScreen.choiceTwo.weapon =  'Ninja Star'
            
            // if ninja star does not exist yet. default to adding it
            if (this.gameBoard.ninjaStar === undefined){
                this.levelUpScreen.choiceTwo.text =  'Ninja Star'
            }
            
            // else get potential upgrades
            else{
                this.levelUpScreen.choiceTwo.text = this.gameBoard.ninjaStar.selectPotentialUpgrade();
            }
        }
        else if (this.choiceTwo === 'Spear'){
            this.levelUpScreen.choiceTwo.weapon =  'Spear'
            
            // if ninja star does not exist yet. default to adding it
            if (this.gameBoard.spear === undefined){
                this.levelUpScreen.choiceTwo.text =  'Spear'
            }
            
            // else get potential upgrades
            else{
                this.levelUpScreen.choiceTwo.text = this.gameBoard.spear.selectPotentialUpgrade();
            }
        }
    },

    selectChoice: function(pointerSelection) {
        if (pointerSelection === 1){ // top selection
            this.handleChoice(this.levelUpScreen.choiceOne.weapon) 
        }
        if (pointerSelection === 0){ // top selection
            this.handleChoice(this.levelUpScreen.choiceTwo.weapon) 
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