Collisions = function (params) {
    this.construct(params);
    this.init();
};

Collisions.prototype = {
    // health: 100,

    init: function() {
        this.addUpdate(this.onUpdate.bind(this));
        this.knight = CMP.DispatchGet({type: "GetKnight"});
        this.swords = CMP.DispatchGet({type: "GetSword"});
        this.goblins = CMP.DispatchGet({type: "GetGoblin"});
        this.gameBoard = CMP.DispatchGet({type: "GetGameBoard"});
        this.health =  CMP.DispatchGet({type: "GetHealth"});
        this.experienceGage = CMP.DispatchGet({type: "GetExperienceGage"});
    },

    swordCollision: function() {
        let inSwing = CMP.DispatchGet({type: "GetInSwing"});
        
        for (let i = 0; i < this.swords.length; i++){
            for (let j = 0; j < this.goblins.length; j++){
                if (this.goblins[j].x >= this.swords[i].x - 8 && this.goblins[j].x <= this.swords[i].x + 8){
                    if (this.goblins[j].y >= this.swords[i].y - 4 - 1 && this.goblins[j].y <= this.swords[i].y + 4 ){
               
                        if (inSwing){
                            this.gameBoard.removeChild(this.goblins[j]); // remove goblin from canvas

                            this.gameBoard.dropExpOrb(this.goblins[j].x, this.goblins[j].y);

                            this.goblins.splice(j, 1) // remove goblins from their array
                        }
                    }
                }
            }
        }
    },

    collisionMonsterToKnight: function() {
        for (let i = 0; i < this.goblins.length; i++){
            if (this.goblins[i].x -4 >= this.knight.x - 8 && this.goblins[i].x + 4 <= this.knight.x + 8){
                if (this.goblins[i].y -4 >= this.knight.y - 12 && this.goblins[i].y + 4 <= this.knight.y + 12){
                    
                    this.knight.health --;
                    this.health.text = `health: ${this.knight.health}`;
                    this.gameBoard.removeChild(this.goblins[i]);
                    this.goblins.splice(i, 1) 

                    if (parseInt(this.health.text) < 1) this.gameOver()
                }
            }
        }
    },

    collisionExpOrbs: function() {
        let expOrbs = this.gameBoard.expOrbs

        for (let i = 0; i < expOrbs.length; i++){
            if (expOrbs[i].x -4 >= this.knight.x - 8 && expOrbs[i].x + 4 <= this.knight.x + 8){
                if (expOrbs[i].y -4 >= this.knight.y - 12 && expOrbs[i].y + 4 <= this.knight.y + 12){

                    this.gameBoard.removeChild(expOrbs[i]);
                    expOrbs.splice(i, 1) 

                    this.knight.experience++;
                    this.experienceGage.text = `exp: ${this.knight.experience}`
                }
            }
        }
    },

    gameOver: function() {
        console.log('game over')
    },

    onUpdate: function({delta}){
        this.swordCollision();
        this.collisionMonsterToKnight();
        this.collisionExpOrbs();
    },
}
extend("Collisions", "CMP.DisplayObjectContainer");