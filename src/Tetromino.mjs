import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino { 
  static T_SHAPE = new RotatingShape('.T.\nTTT\n...\n', 'T', 'up', {up:0, right:1, down:1, left:-1});
  static I_SHAPE = new RotatingShape(`.....\n.....\nIIII.\n.....\n.....\n`, 'I', 'left', {up:0,right:0,down:3,left:0});
  static O_SHAPE = new RotatingShape(`.OO\n.OO\n...\n`, 'O', 'up', {up:0,right:1,down:1,left:0});
}
