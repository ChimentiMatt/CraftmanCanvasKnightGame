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
        // this.swords = CMP.DispatchGet({type: "GetSwords"});
        this.weapons = CMP.DispatchGet({type: "GetWeapons"})
        console.log(this.weapons)

        this.goblins = CMP.DispatchGet({type: "GetGoblin"});
        this.gameBoard = CMP.DispatchGet({type: "GetGameBoard"});
        this.health =  CMP.DispatchGet({type: "GetHealth"});
        this.experienceGage = CMP.DispatchGet({type: "GetExperienceGage"});
    },

    collision: function(delta) {
        this.companions = CMP.DispatchGet({type: "GetCompanions"})

        for (let j = 0; j < this.goblins.length; j++){
            if (this.goblins[j].visible && this.goblins[j] !== undefined){

                this.weaponCollision(j, delta);
                this.knightCollision(j)
                
                if (this.companions !== undefined){
                    this.companionCollision(j, delta);
                }
            }
        }
    },

    weaponCollision: function(j, delta) {
        this.goblins = CMP.DispatchGet({type: "GetGoblin"});
        this.weapons = CMP.DispatchGet({type: "GetWeapons"})
        for (let i = 0; i < this.weapons.length; i++){
       
            if (this.weapons[i].visible){
                if (this.goblins[j].x >= this.weapons[i].x - this.weapons[i].xOffset && this.goblins[j].x <= this.weapons[i].x + this.weapons[i].xOffset){
                    if (this.goblins[j].y >= this.weapons[i].y - this.weapons[i].yOffset  && this.goblins[j].y <= this.weapons[i].y + this.weapons[i].yOffset ){
                     
                        if (this.weapons[i].inSwing){   
                            if (!this.goblins[j].invulnerable){
                                this.makeGoblinInvulnerable(this.goblins[j])

                                if (this.maxCollisionCheck(this.weapons[i])){
                                    this.goblins[j].invulnerable = true;
                                    this.goblins[j].health--;
                                    this.goblins[j].health--;
                                    this.deadGoblinCheck(this.goblins[j])
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    makeGoblinInvulnerable: function(goblin) {
        setTimeout(() => {
            if (goblin !== undefined){ // could be removed during level up screen
                goblin.invulnerable = false
            }
        }, this.invulnerableTime)
    },

    maxCollisionCheck: function(weapon) {
        if (weapon.maxCollisions > weapon.collisionCount){
            weapon.collisionCount++;

            // stop at last contact, not at the enemy after
            if (weapon.maxCollisions === weapon.collisionCount){ 
                weapon.visible = false;
            }
            return true;
        }
        return false;
    },

    deadGoblinCheck: function(goblin) {
        if (goblin.health <= 0){
            this.gameBoard.removeChild(goblin);

            this.gameBoard.dropExpOrb(goblin.x, goblin.y);

            goblin.visible = false; 
            return true;
        }
        else{
        // this.knockBack(goblin), delta;
        return;
    }
    },

    companionCollision: function(j, delta) {
        this.goblins = CMP.DispatchGet({type: "GetGoblin"});
        for (let i = 0; i < this.companions.length; i++){
            if (this.goblins[j].x >= this.companions[i].x - this.companions[i].xOffset && this.goblins[j].x <= this.companions[i].x + this.companions[i].xOffset){
                if (this.goblins[j].y >= this.companions[i].y - this.companions[i].yOffset  && this.goblins[j].y <= this.companions[i].y + this.companions[i].yOffset ){
                    if (!this.goblins[j].invulnerable){
                        setTimeout(() => {
                            if (this.goblins[j] !== undefined){ // could be removed during level up screen
                                this.goblins[j].invulnerable = false
                            }
                        }, this.invulnerableTime)

                        this.goblins[j].invulnerable = true;
                        this.goblins[j].health = 0;

                        if (this.goblins[j].health <= 0){
                            this.gameBoard.removeChild(this.goblins[j]); // remove goblin from canvas

                            this.gameBoard.dropExpOrb(this.goblins[j].x, this.goblins[j].y);

                            this.goblins[j].visible = false; 

                            // this.goblins.splice(j, 1) // remove goblins from their array
                            return;
                        }
                        else{
                            // this.knockBack(this.goblins[j]), delta;
                            return;
                        }
                    }
                }
            }
        }
    },

    knockBack: function(goblin, delta) {
        for (let i = 0; i < this.goblins.length; i++){

            if (goblin.x < this.knight.x){
                goblin.x -= .1
            }
            if (goblin.x > this.knight.x){
                goblin.x += .1
            }
            if (goblin.y < this.knight.y){
                goblin.y -= .2
            }
            if (goblin.y > this.knight.y){
                goblin.y += .2
            }
        }
    },

    knightCollision: function(i) {
        this.goblins = CMP.DispatchGet({type: "GetGoblin"});
            if (this.goblins[i].x -4 >= this.knight.x - 8 && this.goblins[i].x + 4 <= this.knight.x + 8){
                if (this.goblins[i].y -4 >= this.knight.y - 12 && this.goblins[i].y + 4 <= this.knight.y + 12){
                    
                    this.knight.health --;
                    this.health.text = `health: ${this.knight.health}`;
                    this.gameBoard.removeChild(this.goblins[i]);
                    // this.goblins.splice(i, 1) 

                    this.goblins[i].visible = false; 

                    if (parseInt(this.health.text) < 1) this.gameOver()
                }
            }
    },

    collisionExpOrbs: function() {
        this.gameBoard = CMP.DispatchGet({type: "GetGameBoard"});
        let expOrbs = this.gameBoard.expOrbs;
        for (let i = 0; i < expOrbs.length; i++){
            if (expOrbs[i].visible){
                if (expOrbs[i].x -4 >= this.knight.x - 8 && expOrbs[i].x + 4 <= this.knight.x + 8){
                    if (expOrbs[i].y -4 >= this.knight.y - 12 && expOrbs[i].y + 4 <= this.knight.y + 12){
                        
                        this.gameBoard.removeChild(expOrbs[i]);
                        expOrbs[i].visible = false;

                        this.knight.experience++;
                        this.experienceGage.text = `exp: ${this.knight.experience}`
                    }
                }
            }
        }
    },

    gameOver: function() {
        console.log('game over')
    },

    onUpdate: function({delta}){
        this.collisionTick++;
        this.collisionExpOrbs();
        this.collision(delta);
    },
}
extend("Collisions", "CMP.DisplayObjectContainer");