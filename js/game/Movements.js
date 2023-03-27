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
    inSwing: false,
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
        let sword = CMP.DispatchGet({type: "GetSword"})
        let knight = CMP.DispatchGet({type: "GetKnight"})
        if (!this.inSwing){
            if (this.pressedUp === 1){
                knight.y -= 1;
                sword.y -= 1;
            }
            if (this.pressedDown === 1){
                knight.y += 1;
                sword.y += 1
            }
            if (this.pressedRight === 1){
                knight.x += 1;
                sword.x += 1
            }
            if (this.pressedLeft === 1){
                knight.x -= 1;
                sword.x -= 1
            }
            if (this.pressedSpace === 1){
                this.inSwing = true;
                let sword = CMP.DispatchGet({type: "GetSword"})
                sword.tweenTo({
                    rotation: 120,
                    y: sword.y + 3.9,
                    x: sword.x + 1.1,
                    duration: .2,
                    rewind: true,
                    onComplete: () => {this.inSwing = false}
                })
            }
        }
    },

    // handleMouseMove() {
    //     onmousemove = function(e){
    //         // console.log("mouse location:", e.clientX, e.clientY)
    //         let sword = CMP.DispatchGet({type: "GetSword"})
    //             console.log('now', sword.x, e.clientX)
    //             if (sword.x  >=  e.clientX){
    //                 console.log('greater')
    //             }
    //     }
    // },

    // updateSwordLocation() {
    //     console.log('now', this.mouseX)
    //     let sword = CMP.DispatchGet({type: "GetSword"})
    //     if (sword.x + 300 >= this.mouseX){
    //         console.log('now', this.mouseX)
    //     }
    // },

    onUpdate: function({delta}){
        // this.handleMouseMove();
        // this.updateSwordLocation();
        this.movement();
    },
}
extend("Movements", "CMP.DisplayObjectContainer");