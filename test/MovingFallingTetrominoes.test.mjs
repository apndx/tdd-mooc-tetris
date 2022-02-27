import { expect } from "chai";
import { NewBoard } from "../src/NewBoard.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { tryToMoveOverTheEdge, moveDown } from "./Helpers.mjs";

describe("A falling tetrominoe", () => {
  let board;
  beforeEach(() => {
    board = new NewBoard(10, 6);
  });

  it("can be moved left", () => {
    const shape = Tetromino.T_SHAPE_NEW;
    board.drop(shape);
    board.move("left");
    expect(board.toString()).to.equalShape(
      `..TTT.....
       ...T......
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("can be moved right", () => {
    const shape = Tetromino.T_SHAPE_NEW;
    board.drop(shape);
    board.move("right");
    expect(board.toString()).to.equalShape(
      `....TTT...
       .....T....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("can be moved down", () => {
    const shape = Tetromino.T_SHAPE_NEW;
    board.drop(shape);
    board.move("down");
    expect(board.toString()).to.equalShape(
      `..........
       ...TTT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  it("cannot be moved left beyond the board", () => {
    const shape = Tetromino.T_SHAPE_NEW;
    board.drop(shape);
    tryToMoveOverTheEdge(board, "left");
    expect(board.toString()).to.equalShape(
      `TTT.......
       .T........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("cannot be moved right beyond the board", () => {
    const shape = Tetromino.T_SHAPE_NEW;
    board.drop(shape);
    tryToMoveOverTheEdge(board, "right");
    expect(board.toString()).to.equalShape(
      `.......TTT
       ........T.
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("cannot be moved down beyond the board", () => {
    const shape = Tetromino.T_SHAPE_NEW;
    board.drop(shape);
    moveDown(board, 6);
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ...ttt....
       ....t.....`
    );
  });

  it("cannot be moved left through other blocks", () => {
    const shape = Tetromino.T_SHAPE_NEW;
    board.drop(shape);
    tryToMoveOverTheEdge(board, "left");
    moveDown(board, 6);
    board.drop(shape);
    moveDown(board, 4);
    tryToMoveOverTheEdge(board, "left");
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       tttTTT....
       .t..T.....`
    );
  });

  it("cannot be moved right through other blocks", () => {
    const shape = Tetromino.T_SHAPE_NEW;
    board.drop(shape);
    tryToMoveOverTheEdge(board, "right");
    moveDown(board, 6);
    board.drop(shape);
    moveDown(board, 4);
    tryToMoveOverTheEdge(board, "right");
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....TTTttt
       .....T..t.`
    );
  });

  it("cannot be moved down through other blocks", () => {
    const shape = Tetromino.T_SHAPE_NEW;
    board.drop(shape);
    moveDown(board, 6);
    board.drop(shape);
    moveDown(board, 6);
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
