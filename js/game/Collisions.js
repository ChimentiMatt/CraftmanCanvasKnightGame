Collisions = function (params) {
    this.construct(params);
    this.init();
};

Collisions.prototype = {
    collisionTick: 0,
    invulnerableTime: 500,
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

    swordCollision: function(delta) {
        let inSwing = CMP.DispatchGet({type: "GetInSwing"});
  
        for (let i = 0; i < this.swords.length; i++){
            for (let j = 0; j < this.goblins.length; j++){
                if (this.goblins[j].x >= this.swords[i].x - 8 && this.goblins[j].x <= this.swords[i].x + 8){
                    if (this.goblins[j].y >= this.swords[i].y - 4 - 1 && this.goblins[j].y <= this.swords[i].y + 4 ){
                        if (inSwing){   
                            if (!this.goblins[j].invulnerable)
                            {
                                setTimeout(() => {
                                    this.goblins[j].invulnerable = false
                                }, this.invulnerableTime)

                                this.goblins[j].invulnerable = true;
                                this.goblins[j].health--;
                                this.knockBack(this.goblins[j]), delta;

                                if (this.goblins[j].health <= 0){
                                    this.gameBoard.removeChild(this.goblins[j]); // remove goblin from canvas
        
                                    this.gameBoard.dropExpOrb(this.goblins[j].x, this.goblins[j].y);
        
                                    this.goblins.splice(j, 1) // remove goblins from their array
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    knockBack: function(goblin, delta) {
        for (let i = 0; i < this.goblins.length; i++){


            if (goblin.x < this.knight.x){
                goblin.x -= 2
            }
            if (goblin.x > this.knight.x){
                goblin.x += 2
            }
            if (goblin.y < this.knight.y){
                goblin.y -= .5
            }
            if (goblin.y > this.knight.y){
                goblin.y += .5
            }
 
            // if (goblin.y < this.knight.y){
            //     goblin.y += delta * 0.1;
            // }
            // if (goblin.y > this.knight.y){
            //     goblin.y -= delta * 0.1;
            // }
            // if (goblin.x < this.knight.x){
            //     goblin.x += delta * 0.1;
            //     goblin.scaleX = 1;
            // }
            // if (goblin.x >this. knight.x){
            //     goblin.x -= delta * 0.1;
            //     goblin.scaleX = -1;
            // }
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
        this.collisionTick++;
        this.collisionMonsterToKnight();
        this.collisionExpOrbs();
        this.swordCollision(delta);
    },
}
extend("Collisions", "CMP.DisplayObjectContainer");