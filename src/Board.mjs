import { Block } from './Block.mjs'

export class Board {
  width;
  height;
  board;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = makeBoard(this.width, this.height);
  }

  toString() {
    return this.board;
  }

  drop(block) {
    const placement = Math.ceil(this.width / 2)-1;
    var boardArray = Array.from(this.board);
    boardArray[placement] = block.color;
    this.board = boardArray.join('');
    return this.board;
  }

  tick() {
    var boardArray = Array.from(this.board);
    var indices = [];
    var block = 'X';
    var idx = boardArray.indexOf(block);
    while (idx != -1) {
      indices.push(idx);
      idx = boardArray.indexOf(block, idx + 1);
    }
    for (var i=0; i<indices.length; i++ ) {
      boardArray[indices[i]] = '.';
      boardArray[indices[i]+this.width+1] = 'X';
    }
    this.board = boardArray.join('');
  }
}

export const makeBoard = (width, height) => {
  var row = '';
  var board = '';
  for (var i = 0; i < width; i++) {
    row += '.';
  }
  row += '\n';
  for (var i = 0; i < height; i++) {
    board += row;
  }
  return board;
};
