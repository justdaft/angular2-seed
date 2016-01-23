/// <reference path='../../../node_modules/phaser/typescript/phaser.comments.d.ts' />
/// <reference path='../../../node_modules/phaser/typescript/pixi.comments.d.ts' />

import {Component} from 'angular2/core';

@Component({
  selector: 'home',
  templateUrl: './home/components/home.html',
  styleUrls: ['./home/components/home.css']
})
export class HomeCmp {
  game:Phaser.Game;
  textValue: Phaser.Text;
  updateCount: number;

  timeCheck: number = 0;
  flipFlag: boolean = false;

  startList: any = [];
  squareList: any = [];

  masterCounter: number = 0;
  squareCounter: number = 0;
  square1Num: any;
  square2Num: any;
  savedSquareX1: any;
  savedSquareY1: any;
  savedSquareX2: any;
  savedSquareY2: any;
  map: any;
  tileset: any;
  layer: any;
  marker: any;
  currentTile: any;
  currentTilePosition: any;
  tileBack: number = 25;
  timesUp: any = '+';
  youWin: any = '+';
  currentNum: number;
  myCountdownSeconds: any;
  constructor() {
    this.game = new Phaser.Game(800, 600, Phaser.CANVAS, 'content', {
      create: this.create,
      preload: this.preload,
      update: this.update,
      render: this.render
    });
  }
  render() {
    // this.game.debug.text('This is drawn in render()', 0, 50);
    return this.render;
  };

  update() {
    //this.textValue.text = (this.updateCount++).toString();
    return this.update;
  };

  preload() {
    this.game.load.tilemap('matching', './assets/phaser_tiles.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('tiles', './assets/phaser_tiles.png');//, 100, 100, -1, 1, 1);
    return this.preload;
  };

  create() {
    //let style = {font: '36px Arial', fill: '#808080', align: 'center'};
    //this.textValue = this.game.add.text(0, 0, '0', style);
    //this.updateCount = 0;
    //return this.create;
    this.map = this.game.add.tilemap('matching');

    this.map.addTilesetImage('Desert', 'tiles');

    //tileset = game.add.tileset('tiles');

    this.layer = this.map.createLayer('Ground');//.tilemapLayer(0, 0, 600, 600, tileset, map, 0);

    //layer.resizeWorld();

    this.marker = this.game.add.graphics();
    this.marker.lineStyle(2, 0x00FF00, 1);
    this.marker.drawRect(0, 0, 100, 100);

    this.randomizeTiles();
  };

  processClick() {
    this.currentTile = this.map.getTile(this.layer.getTileX(this.marker.x), this.layer.getTileY(this.marker.y));
    this.currentTilePosition = ((this.layer.getTileY(this.game.input.activePointer.worldY) + 1) * 6) - (6 - (
    this.layer.getTileX(this.game.input.activePointer.worldX) + 1));

  if (this.game.input.mousePointer.isDown) {
    // check to make sure the tile is not already flipped
    if (this.currentTile.index === this.tileBack) {
      // get the corresponding item out of squareList
      this.currentNum = this.squareList[this.currentTilePosition - 1];
      this.flipOver();
      this.squareCounter++;
      // is the second tile of pair flipped?
      if (this.squareCounter === 2) {
        // reset squareCounter
        this.squareCounter = 0;
        this.square2Num = this.currentNum;
        // check for match
        if (this.square1Num === this.square2Num) {
          this.masterCounter++;

          if (this.masterCounter === 18) {
            // go "win"
            this.youWin = 'Got them all!';
          }
        }
        else {
            this.savedSquareX2 = this.layer.getTileX(this.marker.x);
            this.savedSquareY2 = this.layer.getTileY(this.marker.y);
            this.flipFlag = true;
            this.timeCheck = this.game.time.totalElapsedSeconds();
          }
      }
      else {
        this.savedSquareX1 = this.layer.getTileX(this.marker.x);
        this.savedSquareY1 = this.layer.getTileY(this.marker.y);
        this.square1Num = this.currentNum;
      }
    }
  }
}
  flipOver() {
    this.map.putTile(this.currentNum, this.layer.getTileX(this.marker.x), this.layer.getTileY(this.marker.y));
  }

  flipBack() {
    this.flipFlag = false;
    this.map.putTile(this.tileBack, this.savedSquareX1, this.savedSquareY1);
    this.map.putTile(this.tileBack, this.savedSquareX2, this.savedSquareY2);
  }

  getHiddenTile() {
    let thisTile = this.squareList[this.currentTilePosition-1];
    return thisTile;
}

  randomizeTiles() {
    for (let num = 1; num <= 18; num++) {
      this.startList.push(num);
    }
    for (let num = 1; num <= 18; num++) {
      this.startList.push(num);
    }

    // for debugging
    // let myString1 = this.startList.toString();

    // randomize squareList
    for (let i = 1; i <= 36; i++) {
      let randomPosition = this.game.rnd.integerInRange(0, this.startList.length - 1);
      let thisNumber = this.startList[ randomPosition ];
      this.squareList.push(thisNumber);
      let a = this.startList.indexOf(thisNumber);
      this.startList.splice( a, 1);
    }

    // for debugging
    // let myString2 = this.squareList.toString();

    for (let col = 0; col < 6; col++) {
      for (let row = 0; row < 6; row++) {
        this.map.putTile(this.tileBack, col, row);
      }
    }
  }
}


