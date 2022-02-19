
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";


describe("A falling tetrominoe", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("can be moved left", () => {
    const shape = Tetromino.T_SHAPE;
    board.drop(shape);
    board.move('left');
    expect(board.toString()).to.equalShape(
      `...T......
       ..TTT.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("can be moved right", () => {
    const shape = Tetromino.T_SHAPE;
    board.drop(shape);
    board.move('right');
    expect(board.toString()).to.equalShape(
      `.....T....
       ....TTT...
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("can be moved down", () => {
    const shape = Tetromino.T_SHAPE;
    board.drop(shape);
    board.move('down');
    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TTT....
       ..........
       ..........
       ..........`
    );
  });

});

