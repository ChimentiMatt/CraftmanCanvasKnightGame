BGElement = function (params) {
    this.construct(params);
    this.init();
};

BGElement.prototype = {
    init: function() {
    },

    GameStarted: function() {
      if (!this.gameStarted){
        this.gameStarted = true;
        this.moving = true

        // the tick
        this.addUpdate(this.onUpdate.bind(this));
      }
    },

    setUpBuildings: function() {
      if (this.created) {return}
      this.created = true;
      let leftMostLCoord = this.globalToLocal(0,0);
      console.log("left most", leftMostLCoord.x)
      let imageWidth = this.localToGlobal(this.tileWidth, 0).x;
      console.log('TW',this.tileWidth)

      this.leftMostTile = this.addChild(new CMP.SizedSprite({
        width: this.tileWidth,
        height: this.tileHeight,
        x: leftMostLCoord.x,
        y: this.percentageOfHeight(0.5),
        registrationX: 0,
        // image: this.buildingsArray[this.currentInd]
        image: ['buildings']
      }));

      this.tileCounter++
      // used for the location of the next tile
      this.tailPosX = this.leftMostTile.x + this.leftMostTile.width - 1;
      this.buildingsArray.push(this.leftMostTile)
      this.appendSecondTitle();
    },

    appendSecondTitle: function() {
      tile = this.addChild(new CMP.SizedSprite({
        width: this.tileWidth,
        height: this.tileHeight,
        x: this.tailPosX,
        y: this.percentageOfHeight(0.5),
        registrationX: 0,
        image: ['buildings']
      }));

      this.tailPosX = tile.x + tile.width - 1;
      this.buildingsArray.push(tile)

    },

    checkLeftMostTileBound: function() {
      let gLeftEnd = this.localToGlobal(this.leftMostTile.x + this.leftMostTile.width, 0).x;
      if (gLeftEnd < 0) {
        this.outOfField = true;
        this.leftMostTile.markForRemoval();
        this.leftMostTile = this.buildingsArray.shift();
        this.appendSecondTitle();
        this.outOfField = false;
      }
    },

    // moves the building tiles
    onUpdate: function({delta}){
      // this.x += (this.xSpeed * delta / this.width) * this.speedModifier;
      // console.log('dd', this.xSpeed)

      if (!this.moving) {return;}
      if (!this.gameStarted) {return;}
      this.x += (this.xSpeed * delta / this.width) * this.speedModifier;
      if (!this.outOfField) {
        this.checkLeftMostTileBound();
      }

    },

};
extend("BGElement", "CMP.DisplayObjectContainer");