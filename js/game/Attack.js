Attack = function (params) {
    this.construct(params);
    this.init();
};

Attack.prototype = {
    attackInterval: 0,
    inSwing: false,
    attackSpeed: 150,
    attackDuration: 50,

    init: function() {
        this.addUpdate(this.onUpdate.bind(this));
        this.swords = CMP.DispatchGet({type: "GetSword"});
        this.gameBoard = CMP.DispatchGet({type: "GetGameBoard"});

        CMP.ListenSet("GetInSwing", this.GetInSwing.bind(this));
    },
    
    swordAttackPattern: function() {
    
        this.attackInterval += 1;

        if (this.attackInterval === this.attackSpeed){
            this.inSwing = true;
            for (let i = 0; i < this.swords.length; i++){
                this.swords[i].visible = true;
            }
            this.attackInterval = 0;
        }
        else if (this.attackInterval === this.attackDuration){
            this.inSwing = false;
            for (let i = 0; i < this.swords.length; i++){
                this.swords[i].visible = false;
            }
        }
    },

    GetInSwing: function() {
        return this.inSwing;
    },

    onUpdate: function({delta}){
        if (!this.gameBoard.paused){
            this.swordAttackPattern()
        }
    },
}
extend("Attack", "CMP.DisplayObjectContainer");