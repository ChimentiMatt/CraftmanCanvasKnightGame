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
        let swords = CMP.DispatchGet({type: "GetSword"})
        let knight = CMP.DispatchGet({type: "GetKnight"})
            if (this.pressedUp === 1){
                knight.y -= 1;
                for (let i = 0; i < swords.length; i++){
                    swords[i].y -= 1;
                }
            }
            if (this.pressedDown === 1){
                knight.y += 1;
                for (let i = 0; i < swords.length; i++){
                    swords[i].y += 1
                }
            }
            if (this.pressedRight === 1){
                knight.scaleX = 1,
                knight.x += 1;
                for (let i = 0; i < swords.length; i++){
                    swords[i].x += 1
                }
            }
            if (this.pressedLeft === 1){
                knight.scaleX = -1,
                knight.x -= 1;
                for (let i = 0; i < swords.length; i++){
                    swords[i].x -= 1
                }
            }
    },
    
    knightSwordCollision: function() {
        let swords = CMP.DispatchGet({type: "GetSword"})
        let goblin = CMP.DispatchGet({type: "GetGoblin"})
        let gameBoard = CMP.DispatchGet({type: "GetGameBoard"})

        for (let i = 0; i < swords.length; i++){
            if (goblin.x >= swords[i].x - 8 && goblin.x <= swords[i].x + 8){
                if (goblin.y >= swords[i].y - 8 && goblin.y <= swords[i].y + 8){
                    if (this.inSwing){
                        console.log('kill')
                        gameBoard.removeChild(goblin);
                    }
                }
            }
        }
    },

    moveTowardsKnight(delta) {
        let goblins = CMP.DispatchGet({type: "GetGoblin"})
        let knight = CMP.DispatchGet({type: "GetKnight"})

        for (let i = 0; i < goblins.length; i++){
            if (goblins[i].y < knight.y){
                goblins[i].y += delta * 0.01;
            }
            if (goblins[i].y > knight.y){
                goblins[i].y -= delta * 0.01;
            }
            if (goblins[i].x < knight.x){
                goblins[i].x += delta * 0.01;
                goblins[i].scaleX = 1;
            }
            if (goblins[i].x > knight.x){
                goblins[i].x -= delta * 0.01;
                goblins[i].scaleX = -1;
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
    // handleMouseMove() {
    //     onmousemove = function(e){
    //         // console.log("mouse location:", e.clientX, e.clientY)
    //         let sword = CMP.DispatchGet({type: "GetSword"})
    //             console.log( sword.x, e.clientX)
    //             if (sword.x  >=  e.clientX){
    //                 console.log('greater')
    //                 sword.x += 5
    //             }
    //     }
    // },

    onUpdate: function({delta}){
        // this.knightSwordCollision();
        this.movement();
        this.moveTowardsKnight(delta);
        // this.collisionMonsterToKnight();


        // this.gravity(delta);
    },
}
extend("Movements", "CMP.DisplayObjectContainer");