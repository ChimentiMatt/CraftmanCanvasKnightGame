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
        let goblin = CMP.DispatchGet({type: "GetGoblin"})
        let gameBoard = CMP.DispatchGet({type: "GetGameBoard"})
        let inSwing = CMP.DispatchGet({type: "GetInSwing"})
        console.log(inSwing)
        
        for (let i = 0; i < swords.length; i++){
            if (goblin.x >= swords[i].x - 8 && goblin.x <= swords[i].x + 8){
                if (goblin.y >= swords[i].y - 8 && goblin.y <= swords[i].y + 8){
                    if (inSwing){
                        console.log('kill')
                        gameBoard.removeChild(goblin);
                    }
                }
            }
        }
    },

    collisionMonsterToKnight: function() {
        let knight = CMP.DispatchGet({type: "GetKnight"})
        let goblin = CMP.DispatchGet({type: "GetGoblin"})
        let gameBoard = CMP.DispatchGet({type: "GetGameBoard"})

        if (goblin.x -4 >= knight.x - 8 && goblin.x + 4 <= knight.x + 8){
            if (goblin.y -4 >= knight.y - 8 && goblin.y + 4 <= knight.y + 8){
                console.log('hit')
                gameBoard.removeChild(goblin);
            }
        }
    },

    onUpdate: function({delta}){
        this.knightSwordCollision();
        this.collisionMonsterToKnight();

        // this.gravity(delta);
    },
}
extend("Collisions", "CMP.DisplayObjectContainer");