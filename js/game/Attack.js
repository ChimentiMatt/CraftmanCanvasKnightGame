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
        this.weapons = CMP.DispatchGet({type: "GetWeapons"})
        console.log(this.weapons)
        this.gameBoard = CMP.DispatchGet({type: "GetGameBoard"});
    },

    onUpdate: function({delta}){
        if (!this.gameBoard.paused){
            this.weapons = CMP.DispatchGet({type: "GetWeapons"})
            for (let i = 0; i < this.weapons.length; i++){
                this.weapons[i].AttackPattern();
            }
        }
    },
}
extend("Attack", "CMP.DisplayObjectContainer");