Background = function (params) {
    params.width = 450;
    params.height = 225;
    // params.backgroundColor = "#63B4F5";
    this.construct(params);
};

Background.prototype = {
    customAssets: [
    ],
    customOptions: [
    ],
    init: function() {
        this.addUpdate(this.onUpdate.bind(this));

        this.topLeft = this.addChild(new CMP.SizedSprite({
            width: this.width,
            height: this.height,
            image: 'background',
            x: this.percentageOfWidth(.5),
            y: this.percentageOfHeight(0.5)
        }));
        console.log(this.percentageOfWidth(.5))

        this.topRight = this.addChild(new CMP.SizedSprite({
            width: this.width,
            height: this.height,
            image: 'background',
            x: this.percentageOfWidth(1.5),
            y: this.percentageOfHeight(0.5) 
        }));

        this.bottomLeft = this.addChild(new CMP.SizedSprite({
            width: this.width,
            height: this.height,
            image: 'background',
            x: this.percentageOfWidth(.5),
            y: this.percentageOfHeight(1.5) 
        }));

        this.bottomRight = this.addChild(new CMP.SizedSprite({
            width: this.width,
            height: this.height,
            image: 'background',
            x: this.percentageOfWidth(1.5) ,
            y: this.percentageOfHeight(1.5)
        }));

        this.backgroundArray = [this.topLeft, this.topRight, this.bottomLeft, this.bottomRight]

    },

    addCenterRight: function() {

       this.centerRight = this.addChild(new CMP.SizedSprite({
            width: this.width,
            height: this.height,
            image: 'background',
            x: this.percentageOfWidth(2),
            y: this.percentageOfHeight(0.5)
        }));
    },

    onUpdate: function({delta}){

    },
    

    layout: {
        xPercentage: 0,
        yPercentage: 0,
        scaleToWidth: 1,
        scaleToHeight: 1
    }
};
extend("Background", "SceneObject");
