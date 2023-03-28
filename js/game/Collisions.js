Collisions = function (params) {
    this.construct(params);
    this.init();
};

Collisions.prototype = {
    health: 100,

    init: function() {
        this.addUpdate(this.onUpdate.bind(this));
    },

    swordCollision: function() {
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
                    health.text = parseInt(health.text) - 1 // update health
                    gameBoard.removeChild(goblins[i]); // remove goblin from canvas
                    goblins.splice(i, 1) // remove goblins from their array

                    if (parseInt(health.text) < 1) this.gameOver()
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
    },
}
extend("Collisions", "CMP.DisplayObjectContainer");