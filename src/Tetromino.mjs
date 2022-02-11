import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  static T_SHAPE = new RotatingShape('.T.\nTTT\n...\n', 'T_SHAPE', 'up');
  static I_SHAPE = new RotatingShape(`.....\n.....\nIIII.\n.....\n.....\n`, 'I_SHAPE', 'left');
}
