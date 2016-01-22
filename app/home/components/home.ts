/// <reference path='../../../node_modules/phaser/typescript/phaser.comments.d.ts' />
/// <reference path='../../../node_modules/phaser/typescript/pixi.comments.d.ts' />

import {Component} from 'angular2/core';

@Component({
  selector: 'home',
  templateUrl: './home/components/home.html',
  styleUrls: ['./home/components/home.css']
})
export class HomeCmp {
  game: Phaser.Game;

  constructor() {
    this.game = new Phaser.Game(800, 800, Phaser.AUTO, 'content', {
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
      return this.preload;
      };

  create() {
      let style = { font: '36px Arial', fill: '#808080', align: 'center' };
      this.textValue = this.game.add.text(0, 0, '0', style);
      this.updateCount = 0;
      // return this.create;
      };
}
