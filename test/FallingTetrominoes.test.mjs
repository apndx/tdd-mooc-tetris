import { expect } from "chai";
import { NewBoard } from "../src/NewBoard.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { fallToBottom } from "./Helpers.mjs";

describe("Falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new NewBoard(10, 6);
  });

  it("start from the top middle", () => {
    board.drop(Tetromino.T_SHAPE_NEW);
    expect(board.toString()).to.equalShape(
      `...TTT....
       ....T.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("stop when they hit the bottom", () => {
    board.drop(Tetromino.T_SHAPE_NEW);
    fallToBottom(board);
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ...ttt....
       ....t.....`
    );
  });

  it("stop when they land on another block", () => {
    board.drop(Tetromino.T_SHAPE_NEW);
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE_NEW);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ...ttt....
       ....t.....
       ...ttt....
       ....t.....`
    );
  });
});
