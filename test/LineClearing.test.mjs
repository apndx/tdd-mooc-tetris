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

  it("the one full row is cleared", () => {
    const shapeI = Tetromino.I_SHAPE_NEW;
    const shapeO = Tetromino.O_SHAPE_NEW;

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

  xit("all the rows above are moved down one step", () => {
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
