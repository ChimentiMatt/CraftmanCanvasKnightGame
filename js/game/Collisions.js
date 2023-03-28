Collisions = function (params) {
    this.construct(params);
    this.init();
};

Collisions.prototype = {
    init: function() {
        this.addUpdate(this.onUpdate.bind(this));
    },
    
    knightSwordCollision: function() {
        let swords = CMP.DispatchGet({type: "GetSword"})
        let goblins = CMP.DispatchGet({type: "GetGoblin"})
        let gameBoard = CMP.DispatchGet({type: "GetGameBoard"})
        let inSwing = CMP.DispatchGet({type: "GetInSwing"})
        
        for (let i = 0; i < swords.length; i++){
            for (let j = 0; j < goblins.length; j++){
                if (goblins[j].x >= swords[i].x - 8 && goblins[j].x <= swords[i].x + 8){
                    if (goblins[j].y >= swords[i].y - 8 && goblins[j].y <= swords[i].y + 8){
                        if (inSwing){
                            console.log('kill')
                            gameBoard.removeChild(goblins[j]);
                        }
                    }
                }
            }
        }
    },

    collisionMonsterToKnight: function() {
        let knight = CMP.DispatchGet({type: "GetKnight"})
        let goblins = CMP.DispatchGet({type: "GetGoblin"})
        let gameBoard = CMP.DispatchGet({type: "GetGameBoard"})

        for (let i = 0; i < goblins.length; i++){
            if (goblins[i].x -4 >= knight.x - 8 && goblins[i].x + 4 <= knight.x + 8){
                if (goblins[i].y -4 >= knight.y - 8 && goblins[i].y + 4 <= knight.y + 8){
                    console.log('hit')
                    gameBoard.removeChild(goblins[i]);
                }
            }
        }
    },

    onUpdate: function({delta}){
        this.knightSwordCollision();
        this.collisionMonsterToKnight();
    },
}
extend("Collisions", "CMP.DisplayObjectContainer");