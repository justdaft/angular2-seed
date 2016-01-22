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

  startList: any = new Array();
  squareList: any = new Array();

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

  tileBack: any = 25;
  timesUp: any = '+';
  youWin: any = '+';

  myCountdownSeconds: any;
  constructor() {
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', {
      create: this.create,
      preload: this.preload,
      update: this.update,
      render: this.render
    });
  }

  render() {
    this.game.debug.text('This is drawn in render()', 0, 50);
    return this.render;
  };

  update() {
    this.textValue.text = (this.updateCount++).toString();
    return this.update;
  };

  preload() {
    this.game.load.tilemap('matching', './assets/phaser_tiles.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('tiles', './assets/phaser_tiles.png');//, 100, 100, -1, 1, 1);
    return this.preload;
  };

  create() {
    let style = {font: '36px Arial', fill: '#808080', align: 'center'};
    this.textValue = this.game.add.text(0, 0, '0', style);
    this.updateCount = 0;
    return this.create;
  };
}
