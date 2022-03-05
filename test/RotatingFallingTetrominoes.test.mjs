import { expect } from "chai";
import { NewBoard } from "../src/NewBoard.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { fallToBottom } from "./Helpers.mjs";
import { tryToMoveOverTheEdge } from "./Helpers.mjs";

describe("Falling T-Shape", () => {
  let board;
  beforeEach(() => {
    board = new NewBoard(10, 6);
  });

  it("can be rotated right/clockwise", () => {
    const shape = Tetromino.T_SHAPE_NEW;
    board.drop(shape);
    board.rotateFallingRight();
    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  it("can be rotated left/counter-clockwise", () => {
    const shape = Tetromino.T_SHAPE_NEW;
    board.drop(shape);
    board.rotateFallingLeft();
    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
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
    board = new NewBoard(10, 6);
  });

  it("can be rotated right/clockwise", () => {
    const shape = Tetromino.I_SHAPE_NEW;
    board.drop(shape);
    board.rotateFallingRight();
    expect(board.toString()).to.equalShape(
      `.....I....
       .....I....
       .....I....
       .....I....
       ..........
       ..........`
    );
  });

  it("can be rotated left/counter-clockwise", () => {
    const shape = Tetromino.I_SHAPE_NEW;
    board.drop(shape);
    board.rotateFallingLeft();
    expect(board.toString()).to.equalShape(
      `.....I....
       .....I....
       .....I....
       .....I....
       ..........
       ..........`
    );
  });
});

describe("Falling O-Shape", () => {
  let board;
  beforeEach(() => {
    board = new NewBoard(10, 6);
  });

  it("cannot be rotated right/clockwise", () => {
    const shape = Tetromino.O_SHAPE_NEW;
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
    const shape = Tetromino.O_SHAPE_NEW;
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
  const board = new NewBoard(10, 6);

  it("should not effect existing shapes", () => {
    // rotate first T 180 and drop down
    // rotate second T to left, move left and drop down

    const shape = Tetromino.T_SHAPE_NEW;
    board.drop(shape);
    board.rotateFallingRight();
    board.rotateFallingRight();
    fallToBottom(board);

    board.drop(shape);
    board.rotateFallingLeft();
    board.move("left");
    board.tick();
    board.tick();
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
    board = new NewBoard(10, 6);
  });

  it("gets a wall kick if rotated too near the right wall", () => {
    const shape = Tetromino.T_SHAPE_NEW;
    board.drop(shape);
    board.rotateFallingLeft();
    tryToMoveOverTheEdge(board, "right");
    board.rotateFallingRight();

    expect(board.toString()).to.equalShape(
      `..........
       .......TTT
       ........T.
       ..........
       ..........
       ..........`
    );
  });

  it("gets a wall kick if rotated too near the left wall", () => {
    const shape = Tetromino.T_SHAPE_NEW;
    board.drop(shape);
    board.rotateFallingRight();
    tryToMoveOverTheEdge(board, "left");
    board.rotateFallingLeft();

    expect(board.toString()).to.equalShape(
      `..........
       TTT.......
       .T........
       ..........
       ..........
       ..........`
    );
  });
});

describe("Falling L-Shape", () => {
  let board;
  beforeEach(() => {
    board = new NewBoard(10, 6);
  });

  it("gets a wall kick if rotated too near the right wall", () => {
    const shape = Tetromino.L_SHAPE_NEW;
    board.drop(shape);
    board.rotateFallingRight();
    tryToMoveOverTheEdge(board, "right");
    board.rotateFallingLeft();

    expect(board.toString()).to.equalShape(
      `..........
       .......LLL
       .......L..
       ..........
       ..........
       ..........`
    );
  });

});
