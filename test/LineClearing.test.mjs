import { expect } from "chai";
import { NewBoard } from "../src/NewBoard.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { fallToBottom } from "./Helpers.mjs";
import { tryToMoveOverTheEdge } from "./Helpers.mjs";

describe("If one row becomes full", () => {
  let board;
  beforeEach(() => {
    board = new NewBoard(10, 6);
  });

  const shapeI = Tetromino.I_SHAPE_NEW;
  const shapeO = Tetromino.O_SHAPE_NEW;

  it("the one full row is cleared", () => {
    board.drop(shapeI);
    tryToMoveOverTheEdge(board, "left");
    fallToBottom(board);

    board.drop(shapeI);
    tryToMoveOverTheEdge(board, "right");
    fallToBottom(board);

    board.drop(shapeO);
    fallToBottom(board);

    board.rotateFallingRight();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ....oo....`
    );
  });

  it("the order of blocks does not affect row clearing", () => {
    board.drop(shapeI);
    tryToMoveOverTheEdge(board, "left");
    fallToBottom(board);

    board.drop(shapeO);
    fallToBottom(board);

    board.drop(shapeI);
    tryToMoveOverTheEdge(board, "right");
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ....oo....`
    );
  });

  it("all rows are moved down after clearing", () => {
    board.drop(shapeI);
    tryToMoveOverTheEdge(board, "left");
    fallToBottom(board);

    board.drop(shapeO);
    fallToBottom(board);

    board.drop(shapeO);
    fallToBottom(board);

    board.drop(shapeI);
    tryToMoveOverTheEdge(board, "right");
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ....oo....
       ....oo....
       ....oo....`
    );
  });

});


describe("If two rows become full", () => {
  let board;
  beforeEach(() => {
    board = new NewBoard(10, 6);
  });

  const shapeO = Tetromino.O_SHAPE_NEW;

  it("both two rows are cleared", () => {
    board.drop(shapeO);
    tryToMoveOverTheEdge(board, "left");
    fallToBottom(board);

    board.drop(shapeO);
    tryToMoveOverTheEdge(board, "right");
    fallToBottom(board);

    board.drop(shapeO);
    board.move("left");
    board.move("left");
    fallToBottom(board);

    board.drop(shapeO);
    board.move("right");
    board.move("right");
    fallToBottom(board);

    board.drop(shapeO);
    fallToBottom(board);

    board.rotateFallingRight();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });

});

describe("If three rows become full", () => {
  let board;
  beforeEach(() => {
    board = new NewBoard(10, 10);
  });

  const shapeO = Tetromino.O_SHAPE_NEW;
  const shapeI = Tetromino.I_SHAPE_NEW;
  const shapeL = Tetromino.L_SHAPE_NEW;
  const shapeT = Tetromino.T_SHAPE_NEW;

  it("all three rows are cleared", () => {
    board.drop(shapeO);
    tryToMoveOverTheEdge(board, "left");
    fallToBottom(board);
  
  
    board.drop(shapeO);
    board.move("left");
    board.move("left");
    fallToBottom(board);
  
    board.drop(shapeO);
    fallToBottom(board);
  
    board.drop(shapeI);
    tryToMoveOverTheEdge(board, "left");
    fallToBottom(board);
  
    board.drop(shapeO);
    board.move("right");
    board.move("right");
    fallToBottom(board);
  
    board.drop(shapeL);
    board.rotateFallingRight();
    tryToMoveOverTheEdge(board, "right");
    board.move("left");
    fallToBottom(board);

    board.drop(shapeT);
    board.rotateFallingRight();
    board.rotateFallingRight();
    board.move("right");
    fallToBottom(board);

    board.drop(shapeI);
    board.rotateFallingRight();
    tryToMoveOverTheEdge(board, "right");
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........
       ..........
       ..........
       ..........
       .....t...i`
    );
  });
});

describe("If four rows become full", () => {
  let board;
  beforeEach(() => {
    board = new NewBoard(4, 10);
  });

  const shapeI = Tetromino.I_SHAPE_NEW;

  it("all four rows are cleared", () => {
    board.drop(shapeI);
    board.rotateFallingRight();
    tryToMoveOverTheEdge(board, "left");
    fallToBottom(board);

    board.drop(shapeI);
    board.rotateFallingRight();
    tryToMoveOverTheEdge(board, "right");
    fallToBottom(board);

    board.drop(shapeI);
    board.rotateFallingRight();
    board.move("left");
    fallToBottom(board);

    board.drop(shapeI);
    board.rotateFallingRight();
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `....
       ....
       ....
       ....
       ....
       ....
       ....
       ....
       ....
       ....`
    );
  });
});