Collisions = function (params) {
    this.construct(params);
    this.init();
};

Collisions.prototype = {
    // health: 100,

    init: function() {
        this.addUpdate(this.onUpdate.bind(this));
    },

    swordCollision: function() {
        let knight = CMP.DispatchGet({type: "GetKnight"});
        let swords = CMP.DispatchGet({type: "GetSword"});
        let goblins = CMP.DispatchGet({type: "GetGoblin"});
        let gameBoard = CMP.DispatchGet({type: "GetGameBoard"});
        let inSwing = CMP.DispatchGet({type: "GetInSwing"});
        
        for (let i = 0; i < swords.length; i++){
            for (let j = 0; j < goblins.length; j++){
                if (goblins[j].x >= swords[i].x - 8 && goblins[j].x <= swords[i].x + 8){
                    if (goblins[j].y >= swords[i].y - 4 - 1 && goblins[j].y <= swords[i].y + 4 ){
                        if (inSwing){
                            gameBoard.removeChild(goblins[j]); // remove goblin from canvas

                            gameBoard.dropExpOrb(goblins[j].x, goblins[j].y);

                            goblins.splice(j, 1) // remove goblins from their array
                        }
                    }
                }
            }
        }
    },

    collisionMonsterToKnight: function() {
        let knight = CMP.DispatchGet({type: "GetKnight"});
        let goblins = CMP.DispatchGet({type: "GetGoblin"});
        let health = CMP.DispatchGet({type: "GetHealth"});
        let gameBoard = CMP.DispatchGet({type: "GetGameBoard"});

        for (let i = 0; i < goblins.length; i++){
            if (goblins[i].x -4 >= knight.x - 8 && goblins[i].x + 4 <= knight.x + 8){
                if (goblins[i].y -4 >= knight.y - 12 && goblins[i].y + 4 <= knight.y + 12){
                    
                    knight.health --;
                    health.text = `health: ${knight.health}`;
                    gameBoard.removeChild(goblins[i]);
                    goblins.splice(i, 1) 

                    if (parseInt(health.text) < 1) this.gameOver()
                }
            }
        }
    },

    collisionExpOrbs: function() {
        let gameBoard = CMP.DispatchGet({type: "GetGameBoard"});
        let knight = CMP.DispatchGet({type: "GetKnight"});
        let expOrbs = gameBoard.expOrbs
        let experienceGage = CMP.DispatchGet({type: "GetExperienceGage"});

        for (let i = 0; i < expOrbs.length; i++){
            if (expOrbs[i].x -4 >= knight.x - 8 && expOrbs[i].x + 4 <= knight.x + 8){
                if (expOrbs[i].y -4 >= knight.y - 12 && expOrbs[i].y + 4 <= knight.y + 12){

                    gameBoard.removeChild(expOrbs[i]);
                    expOrbs.splice(i, 1) 

                    knight.experience++;
                    experienceGage.text = `exp: ${knight.experience}`
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