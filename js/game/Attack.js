Attack = function (params) {
    this.construct(params);
    this.init();
};

Attack.prototype = {
    // attackInterval: 0,
    // inSwing: false,
    // attackSpeed: 150,
    // attackDuration: 50,

    init: function() {
        this.addUpdate(this.onUpdate.bind(this));
        this.swords = CMP.DispatchGet({type: "GetSwords"});
        this.weapons = CMP.DispatchGet({type: "GetWeapons"})
        this.gameBoard = CMP.DispatchGet({type: "GetGameBoard"});
    },

    onUpdate: function({delta}){
        if (!this.gameBoard.paused){
            this.weapons = CMP.DispatchGet({type: "GetWeapons"})
            for (let i = 0; i < this.weapons.length; i++){
                this.weapons[i].AttackPattern();
            }
            // this.swords[0].AttackPattern()
            // this.swords[1].AttackPattern()
        }
    },
}
extend("Attack", "CMP.DisplayObjectContainer");