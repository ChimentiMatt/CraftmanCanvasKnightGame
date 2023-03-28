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
        CMP.ListenSet("GetInSwing", this.GetInSwing.bind(this));
    },
    
    swordAttackPattern: function() {
        let swords = CMP.DispatchGet({type: "GetSword"})
        this.attackInterval += 1;
        // console.log(this.attackInterval)

        if (this.attackInterval === this.attackSpeed){
            this.inSwing = true;
            for (let i = 0; i < swords.length; i++){
                swords[i].visible = true;
            }
            this.attackInterval = 0;
        }
        else if (this.attackInterval === this.attackDuration){
            this.inSwing = false;
            for (let i = 0; i < swords.length; i++){
                swords[i].visible = false;
            }
        }
    },

    GetInSwing: function() {
        return this.inSwing;
    },

    onUpdate: function({delta}){
        this.swordAttackPattern()
    },
}
extend("Attack", "CMP.DisplayObjectContainer");