Knight = function (params) {
    params.width = 8;
    params.height = 8;
    this.construct(params);
    this.init();
};

Knight.prototype = {
    // backgroundColor: 'teal',
    pressedUp: 0,
    pressedDown: 0,
    pressedLeft: 0,
    pressedRight: 0,
    
    init: function() {
        this.knight = this.addChild(new CMP.SizedSprite({
            width: 8,
            height: 8,
            image: 'knight',
            x: this.percentageOfWidth(0.5),
            y: this.percentageOfHeight(0.5),
            // scale: 30.75
        }))

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
          })
    },

    movement: function() {
        if (this.pressedUp === 1){
                this.knight.y -= 1
        }
        if (this.pressedDown === 1){
            this.knight.y += 1
        }
        if (this.pressedRight === 1){
            this.knight.x += 1
        }
        if (this.pressedLeft === 1){
            this.knight.x -= 1
        }
    },

    onUpdate: function({delta}){
        this.movement();
    },
}
extend("Knight", "CMP.DisplayObjectContainer");