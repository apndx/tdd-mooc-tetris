import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { fallToBottom } from "./Helpers.mjs";
import { tryToMoveOverTheEdge } from "./Helpers.mjs";

describe("Falling T-Shape", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("can be rotated right/clockwise", () => {
    const shape = Tetromino.T_SHAPE;
    board.drop(shape);
    board.rotateFallingRight();
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
    board.rotateFallingLeft();
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
    board.rotateFallingRight();
    expect(board.toString()).to.equalShape(
      `....I.....
       ....I.....
       ....I.....
       ....I.....
       ..........
       ..........`
    );
  });

  it("can be rotated left/counter-clockwise", () => {
    const shape = Tetromino.I_SHAPE;
    board.drop(shape);
    board.rotateFallingLeft();
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

describe("Falling O-Shape", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("cannot be rotated right/clockwise", () => {
    const shape = Tetromino.O_SHAPE;
    board.drop(shape);
    board.rotateFallingRight();
    expect(board.toString()).to.equalShape(
      `....OO....
       ....OO....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("cannot be rotated left/counter-clockwise", () => {
    const shape = Tetromino.O_SHAPE;
    board.drop(shape);
    board.rotateFallingLeft();
    expect(board.toString()).to.equalShape(
      `....OO....
       ....OO....
       ..........
       ..........
       ..........
       ..........`
    );
  });
});

describe("Rotating T-Shape", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("should not effect existing shapes", () => {
    const shape = Tetromino.T_SHAPE;
    board.drop(shape);
    fallToBottom(board);
    board.drop(shape);
    board.move("left");
    board.tick();
    board.tick();
    board.rotateFallingRight();
    console.log(board.toString());
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ...T......
       ...TT.....
       ...Tt.....
       ...ttt....`
    );
  });
});

describe("Falling T-Shape", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("gets a wall kick if rotated too near the right wall", () => {
    const shape = Tetromino.T_SHAPE;
    board.drop(shape);
    board.rotateFallingLeft();
    tryToMoveOverTheEdge(board, "right");
    board.rotateFallingRight();

    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("gets a wall kick if rotated too near the left wall", () => {
    const shape = Tetromino.T_SHAPE;
    board.drop(shape);
    board.rotateFallingRight();
    tryToMoveOverTheEdge(board, "left");
    board.rotateFallingLeft();

    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
    );
  });
});
