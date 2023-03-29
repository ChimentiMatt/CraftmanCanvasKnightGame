Movements = function (params) {
    this.construct(params);
    this.init();
};

Movements.prototype = {
    // backgroundColor: 'teal',
    pressedUp: 0,
    pressedDown: 0,
    pressedLeft: 0,
    pressedRight: 0,
    pointerUp: 0,
    pointerDown: 0,
    
    init: function() {
        this.levelUpScreen = CMP.DispatchGet({type: "GetLevelUpScreen"});
        this.swords = CMP.DispatchGet({type: "GetSwords"})
        this.weapons = CMP.DispatchGet({type: "GetWeapons"})
        this.knight = CMP.DispatchGet({type: "GetKnight"})
        this.goblins = CMP.DispatchGet({type: "GetGoblin"})
        this.gameBoard = CMP.DispatchGet({type: "GetGameBoard"})
        // this.upgrades = CMP.DispatchGet({type: "GetUpgrades"})

        this.addUpdate(this.onUpdate.bind(this));
        addEventListener('keydown', (event) => {
            if (event.code === 'ArrowUp'){
                this.pressedUp = 1;
            }
            if (event.code === 'ArrowDown'){
                this.pressedDown = 1;
            }
            if (event.code === 'ArrowRight'){
                this.pressedRight = 1;
            }
            if (event.code === 'ArrowLeft'){
                this.pressedLeft = 1;
            }
            if (event.code === 'Space'){
                this.pressedSpace = 1;
            }
          })

          addEventListener('keyup', (event) => {
            if (event.code === 'ArrowUp'){
                this.pressedUp = 0;
            }
            if (event.code === 'ArrowDown'){
                this.pressedDown = 0;
            }
            if (event.code === 'ArrowRight'){
                this.pressedRight = 0;
            }
            if (event.code === 'ArrowLeft'){
                this.pressedLeft = 0;
            }
            if (event.code === 'Space'){
                this.pressedSpace = 0;
            }
          })


          addEventListener('keydown', (event) => {
                if (this.levelUpScreen.visible){
                    if (event.code === 'ArrowUp'){
                        if (this.pointerUp < 1 ){
                            this.levelUpScreen.pointer.y -= 20;
                            this.pointerUp++
                        }
                    }
                    if (event.code === 'ArrowDown'){
                        if (this.pointerUp > -1 ){
                            this.levelUpScreen.pointer.y += 20;
                            this.pointerUp--
                        }
                    }
                    if (event.code === 'Space'){
                
                    }
                }
            })
    },

    movement: function() {
            if (this.pressedUp === 1){
                this.knight.y -= this.knight.movementSpeed;
                for (let i = 0; i < this.weapons.length; i++){
                    this.weapons[i].y -= this.knight.movementSpeed;
                }
            }
            if (this.pressedDown === 1){
                this.knight.y += this.knight.movementSpeed
                for (let i = 0; i < this.weapons.length; i++){
                    this.weapons[i].y += this.knight.movementSpeed
                }
            }
            if (this.pressedRight === 1){
                this.knight.scaleX = 1;
                this.knight.x += this.knight.movementSpeed;
                for (let i = 0; i < this.weapons.length; i++){
                    this.weapons[i].x += this.knight.movementSpeed
                }
            }
            if (this.pressedLeft === 1){
                this.knight.scaleX = -1,
                this.knight.x -= this.knight.movementSpeed;
                for (let i = 0; i < this.weapons.length; i++){
                    this.weapons[i].x -= this.knight.movementSpeed
                }
            }
    },

    moveTowardsKnight(delta) {
        for (let i = 0; i < this.goblins.length; i++){
            if (this.goblins[i].y < this.knight.y){
                this.goblins[i].y += delta * 0.02;
            }
            if (this.goblins[i].y > this.knight.y){
                this.goblins[i].y -= delta * 0.02;
            }
            if (this.goblins[i].x < this.knight.x){
                this.goblins[i].x += delta * 0.02;
                this.goblins[i].scaleX = 1;
            }
            if (this.goblins[i].x >this. knight.x){
                this.goblins[i].x -= delta * 0.02;
                this.goblins[i].scaleX = -1;
            }
        }
    },

    collisionMonsterToKnight: function() {
        for (let i = 0; i < this.goblins.length; i++){
            if (this.goblins[i].x -4 >= this.knight.x - 8 && this.goblins[i].x + 4 <= this.knight.x + 8){
                if (this.goblins[i].y -4 >= this.knight.y - 8 && this.goblins[i].y + 4 <= this.knight.y + 8){
                    console.log('hit')
                    gameBoard.removeChild(this.goblins[i]);
                }
            }
        }
    },

    menuControls: function() {

    },

    onUpdate: function({delta}){
        let gameBoard = CMP.DispatchGet({type: "GetGameBoard"})
        if (!gameBoard.paused){
            this.movement();
            this.moveTowardsKnight(delta);
        }
        else{
            this.levelUpScreen.visible = true;
            let upgrades = CMP.DispatchGet({type: "GetUpgrades"})
            upgrades.generateChoices();
            this.menuControls();
        }
    },
}
extend("Movements", "CMP.DisplayObjectContainer");