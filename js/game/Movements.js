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
    mouseX: 0,
    mouseY: 0,
    
    init: function() {
        this.levelUpScreen = CMP.DispatchGet({type: "GetLevelUpScreen"});
        this.swords = CMP.DispatchGet({type: "GetSword"})
        this.knight = CMP.DispatchGet({type: "GetKnight"})
        // this.goblin = CMP.DispatchGet({type: "GetGoblin"})
        this.goblins = CMP.DispatchGet({type: "GetGoblin"})
        this.gameBoard = CMP.DispatchGet({type: "GetGameBoard"})

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
    },

    movement: function() {
            if (this.pressedUp === 1){
                this.knight.y -= this.knight.movementSpeed;
                for (let i = 0; i < this.swords.length; i++){
                    this.swords[i].y -= this.knight.movementSpeed;
                }
            }
            if (this.pressedDown === 1){
                this.knight.y += this.knight.movementSpeed
                for (let i = 0; i < this.swords.length; i++){
                    this.swords[i].y += this.knight.movementSpeed
                }
            }
            if (this.pressedRight === 1){
                this.knight.scaleX = 1;
                this.knight.x += this.knight.movementSpeed;
                for (let i = 0; i < this.swords.length; i++){
                    this.swords[i].x += this.knight.movementSpeed
                }
            }
            if (this.pressedLeft === 1){
                this.knight.scaleX = -1,
                this.knight.x -= this.knight.movementSpeed;
                for (let i = 0; i < this.swords.length; i++){
                    this.swords[i].x -= this.knight.movementSpeed
                }
            }
    },

    moveTowardsKnight(delta) {
        for (let i = 0; i < this.goblins.length; i++){
            if (this.goblins[i].y < this.knight.y){
                this.goblins[i].y += delta * 0.01;
            }
            if (this.goblins[i].y > this.knight.y){
                this.goblins[i].y -= delta * 0.01;
            }
            if (this.goblins[i].x < this.knight.x){
                this.goblins[i].x += delta * 0.01;
                this.goblins[i].scaleX = 1;
            }
            if (this.goblins[i].x >this. knight.x){
                this.goblins[i].x -= delta * 0.01;
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
        console.log('in menu')
    },

    onUpdate: function({delta}){
        let gameBoard = CMP.DispatchGet({type: "GetGameBoard"})
        if (!gameBoard.paused){
            this.movement();
            this.moveTowardsKnight(delta);
        }
        else{
            this.levelUpScreen.visible = true
            this.menuControls();
        }
    },
}
extend("Movements", "CMP.DisplayObjectContainer");