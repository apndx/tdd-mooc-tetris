import { HardCodedRotatingShape } from "./HardCodedRotatingShape.mjs";

export class Tetromino {
  // initial limits: how far from central coordinate the limit is

  static T_SHAPE_NEW = new HardCodedRotatingShape(
    "....\nTTT.\n.T..\n....\n",
    "T",
    "down",
    { up: 0, right: 1, down: 1, left: -1 }
  );

  static I_SHAPE_NEW = new HardCodedRotatingShape(
    `....\nIIII\n....\n....\n`,
    "I",
    "left",
    { up: 0, right: 2, down: 0, left: -1 }
  );

  static O_SHAPE_NEW = new HardCodedRotatingShape(
    `....\n.OO.\n.OO.\n....\n`,
    "O",
    "up",
    { up: 0, right: 1, down: 1, left: 0 }
  );

  static L_SHAPE_NEW = new HardCodedRotatingShape(
    `....\nLLL.\nL...\n....\n`,
    "L",
    "down",
    { up: 0, right: 2, down: 1, left: 1 }
  );
}
