import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  static T_SHAPE = new RotatingShape('.T.\nTTT\n...\n', 'T', 'up');
  static I_SHAPE = new RotatingShape(`.....\n.....\nIIII.\n.....\n.....\n`, 'I', 'left', );
  static O_SHAPE = new RotatingShape(`.OO\n.OO\n...\n`, 'O', 'up');
}
