export class Board {
  width;
  height;
  board;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = '';
  }
  
  toString() {
    this.board = makeBoard(this.width, this.height);
    return this.board;
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
