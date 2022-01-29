import { makeBoardArray } from './utils.mjs';

export class Board {
  width;
  height;
  board;
  blockDropping;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = makeBoardArray(this.width, this.height);
    this.blockDropping = false;
  }

  toString() {
    var boardString = '';
    for (var i=0; i<this.height; i++ ) {
        var row = this.board[i].join('');
        boardString += row + '\n';
      }  
    return boardString;
  }

 drop(block) {
    if (!this.blockDropping) {
      this.blockDropping = true;
      const placement = Math.ceil(this.width / 2)-1;
      this.board[0][placement] = block.color;
    } else {
      throw 'already falling'
    }
  }

  tick() {
    var rowIndices = [];
    var columnIndices = [];
    var block = 'X';
    for (var i=0; i<this.height; i++ )  {
      var row = this.board[i];
      var idx = row.indexOf(block);
      if (idx != -1) {
        rowIndices.push(i);
        columnIndices.push(idx);
      }
    }
    for (var i=0; i<rowIndices.length; i++ ) {
      var rowIndex = rowIndices[i];
      var columnIndex = columnIndices[i];
      this.board[rowIndex][columnIndex] = '.';
      this.board[rowIndex+1][columnIndex] = 'X';
    }
  }

}
