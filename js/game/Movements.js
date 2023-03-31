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
        this.swords = CMP.DispatchGet({type: "GetSwords"})
        // this.weapons = CMP.DispatchGet({type: "GetWeapons"})
        this.knight = CMP.DispatchGet({type: "GetKnight"})
        this.background = CMP.DispatchGet({type: "GetBackground"})
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


          addEventListener('keydown', (event) => {
            if (this.gameBoard.inLevelUpScreen){
                this.levelUpScreen = CMP.DispatchGet({type: "GetLevelUpScreen"});

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
                    this.upgrades.selectChoice(this.pointerUp);
                    this.pointerUp = 0;
                }

            }
        })
    },

    movement: function() {
            let expOrbs = this.gameBoard.expOrbs;

            if (this.pressedUp === 1){
                for (let i = 0; i < this.background.backgroundArray.length; i++){
                    this.background.backgroundArray[i].y += this.knight.movementSpeed;
                }
                for (let i = 0; i < this.goblins.length; i++){
                    this.goblins[i].y += this.knight.movementSpeed
                }

                for (let i = 0; i < expOrbs.length; i++){
                    expOrbs[i].y += this.knight.movementSpeed
                }
            }
            if (this.pressedDown === 1){
                for (let i = 0; i < this.background.backgroundArray.length; i++){
                    this.background.backgroundArray[i].y -= this.knight.movementSpeed
                }
                for (let i = 0; i < this.goblins.length; i++){
                    this.goblins[i].y -= this.knight.movementSpeed
                }
                for (let i = 0; i < expOrbs.length; i++){
                    expOrbs[i].y -= this.knight.movementSpeed
                }
            }
            if (this.pressedRight === 1){
                this.knight.scaleX = 1;
                for (let i = 0; i < this.background.backgroundArray.length; i++){
                    this.background.backgroundArray[i].x -= this.knight.movementSpeed;
                }
                for (let i = 0; i < this.goblins.length; i++){
                    this.goblins[i].x -= this.knight.movementSpeed;
                }
                for (let i = 0; i < expOrbs.length; i++){
                    expOrbs[i].x -= this.knight.movementSpeed
                }
            }
            if (this.pressedLeft === 1){
                this.knight.scaleX = -1
                for (let i = 0; i < this.background.backgroundArray.length; i++){
                    this.background.backgroundArray[i].x += this.knight.movementSpeed;
                }
                for (let i = 0; i < this.goblins.length; i++){
                    this.goblins[i].x += this.knight.movementSpeed;
                }
                for (let i = 0; i < expOrbs.length; i++){
                    expOrbs[i].x += this.knight.movementSpeed
                }
            }
    },

    moveTowardsKnight(delta) {
        for (let i = 0; i < this.goblins.length; i++){
            if (this.goblins[i].y < this.knight.y){
                this.goblins[i].y += delta * this.goblins[i].moveSpeed;
            }
            if (this.goblins[i].y > this.knight.y){
                this.goblins[i].y -= delta * this.goblins[i].moveSpeed;
            }
            if (this.goblins[i].x < this.knight.x){
                this.goblins[i].x += delta * this.goblins[i].moveSpeed;
                this.goblins[i].scaleX = 1;
            }
            if (this.goblins[i].x >this. knight.x){
                this.goblins[i].x -= delta * this.goblins[i].moveSpeed;
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

    repeatBackground: function() {

        for (let i = 0; i < this.background.backgroundArray.length; i++){
            if (this.background.backgroundArray[i].x <= 0){ // out of bounds left
                this.background.backgroundArray[i].x = (450 * 2)
            }
            if (this.background.backgroundArray[i].x > 450 * 2){
                this.background.backgroundArray[i].x = 0 
            }
            if (this.background.backgroundArray[i].y <= 0){ // out of bounds top
                this.background.backgroundArray[i].y = 450 
            }
            if (this.background.backgroundArray[i].y > 450){
                this.background.backgroundArray[i].y = 0 
            }
        }
  
    },

    onUpdate: function({delta}){
        this.gameBoard = CMP.DispatchGet({type: "GetGameBoard"})
        // console.log(this.gameBoard.paused)

        if (!this.gameBoard.paused){
            this.movement();
            this.repeatBackground();
            this.moveTowardsKnight(delta);
        }
        else{
            if (!this.gameBoard.inLevelUpScreen){
                this.gameBoard.inLevelUpScreen = true;
                this.gameBoard.createLevelUpScreen();
                this.upgrades = CMP.DispatchGet({type: "GetUpgrades"})
                this.upgrades.generateChoices();
        
            }
        }

    },
}
extend("Movements", "CMP.DisplayObjectContainer");