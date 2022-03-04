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
