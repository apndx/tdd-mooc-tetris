
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Falling T-Shape", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("can be rotated right/clockwise", () => {
    const shape = Tetromino.T_SHAPE;
    board.drop(shape);
    board.rotateFallingRight(shape);
    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  it("can be rotated left/counter-clockwise", () => {
    const shape = Tetromino.T_SHAPE;
    board.drop(shape);
    board.rotateFallingLeft(shape);
    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });
});

describe("Falling I-Shape", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("can be rotated right/clockwise", () => {
    const shape = Tetromino.I_SHAPE;
    board.drop(shape);
    board.rotateFallingRight(shape);
    expect(board.toString()).to.equalShape(
      `....I.....
       ....I.....
       ....I.....
       ....I.....
       ..........
       ..........`
    );
  });

  xit("can be rotated left/counter-clockwise", () => {
    const shape = Tetromino.I_SHAPE;
    board.drop(shape);
    board.rotateFallingLeft(shape);
    expect(board.toString()).to.equalShape(
      `....I.....
       ....I.....
       ....I.....
       ....I.....
       ..........
       ..........`
    );
  });
});


// Falling I-Shape can be rotated right/clockwise
// Falling I-Shape can be rotated left/counter-clockwise
// Falling O-Shape can be rotated right/clockwise
// Falling O-Shape can be rotated left/counter-clockwise

// Falling T-Shape cannot be rotated when there is no room to rotate on the right
// Falling T-Shape cannot be rotated when there is no room to rotate on the left

// Falling T-Shape gets a wall kick if rotated too near the right wall
// Falling T-Shape gets a wall kick if rotated too near the left wall