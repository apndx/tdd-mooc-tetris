export class Board {
  width;
  height;
  board;
  fallingBlock;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.makeBoardArray(this.width, this.height);
    this.fallingBlock = null;
  }

  toString() {
    var boardString = '';
    for (var i=0; i<this.height; i++ ) {
        var row = this.board[i].join('');
        boardString += row + '\n';
      }  
    return boardString;
  }

  hasFalling() {
    return this.fallingBlock ? true : false;
  }

 drop(block) {
    if (!this.hasFalling()) {
      this.fallingBlock = block;
      const placement = Math.ceil(this.width / 2)-1;
      var size = this.getBlockSize(block.color);
      if (size === 1) {
        this.board[0][placement] = block.color;
      } else {
        var blockStart = Math.ceil(placement-(size/2))
        for (var i=0; i<size; i++) {
          for (var j=0; j<size; j++) {
            this.board[i][blockStart] = block.shapeMatrix[i][j];
            blockStart +=1;
          }
          blockStart = Math.ceil(placement-(size/2))
        }
      }
    } else {
      throw 'already falling'
    }
  }

  getBlockSize(color) {
    switch (color) {
    case 'X':
      return 1;
    case 'T':
      return 3;
    case 'O':
      return 3;
    case 'I':
      return 5;
    default:
      return 1;
    }
  }

  tick() {
    var rowIndices = [];
    var columnIndices = [];
    var blockColor = this.fallingBlock.color;
    for (var i=0; i<this.height; i++ )  {
      var row = this.board[i];
      var idx = row.indexOf(blockColor);
      if (idx != -1) {
        rowIndices.push(i);
        columnIndices.push(idx);
      }
    }
    for (var i=0; i<rowIndices.length; i++ ) {
      var rowIndex = rowIndices[i];
      var columnIndex = columnIndices[i];
      if (rowIndex < this.height-1 && this.isThereSpaceBelowTheBlock(rowIndex, columnIndex)) {
        this.board[rowIndex][columnIndex] = '.';
        this.board[rowIndex+1][columnIndex] = this.fallingBlock.color;
      } else {
        this.fallingBlock = null;
      }
    }
  }

  isThereSpaceBelowTheBlock(rowIdx, colIdx) {
    const emptySpace = this.board[rowIdx+1][colIdx] === ".";
    const lastRow = rowIdx === this.height -1;
    return emptySpace || lastRow;
  }

  makeBoardArray = (width, height) => {
    var row = [];
    var board = [];
    for (var j = 0; j < height; j++) {
      for (var i = 0; i < width; i++) {
        row.push('.');
      }
      board[j] = row;
      row = [];
    }
    return board;
  };

}
