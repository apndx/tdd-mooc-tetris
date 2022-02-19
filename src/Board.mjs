export class Board {
  width;
  height;
  board;
  fallingBlock;
  placement;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.makeBoardArray(this.width, this.height);
    this.fallingBlock = null;
    this.placement = Math.ceil(this.width / 2)-1;
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
      var size = this.getBlockSize(block.color);
      if (size === 1) {
        this.board[0][this.placement] = block.color;
      } else {
        var blockStart = Math.ceil(this.placement-(size/2))
        for (var i=0; i<size; i++) {
          for (var j=0; j<size; j++) {
            this.board[i][blockStart] = block.shapeMatrix[i][j];
            blockStart +=1;
          }
          blockStart = Math.ceil(this.placement-(size/2))
        }
        const limits = block.limits;
        const newLimits = {...limits, right: block.limits.right+this.placement, left: block.limits.left + this.placement }
        this.fallingBlock = {...block, limits: newLimits};
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
    if (this.fallingBlock) {
      var size = this.getBlockSize(this.fallingBlock.color);
      if (size ===1) {
        this.tick1();
      } else {
        this.moveBlockDownIfItShould();
      }
    }
  }

  tick1() {
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
      if (rowIndex < this.height-1 && this.isThereSpaceBelow(rowIndex, columnIndex)) {
        this.board[rowIndex][columnIndex] = '.';
        this.board[rowIndex+1][columnIndex] = this.fallingBlock.color;
      } else {
        this.fallingBlock = null;
      }
    }
  }

  moveBlockDownIfItShould() {
    var right = this.fallingBlock.limits.right;
    var down = this.fallingBlock.limits.down;
    var left = this.fallingBlock.limits.left;
    for (var i=left; i<right; i++) {
      if (!(down < this.height-1 && this.isThereSpaceBelow(down, i))) {
        this.fallingBlock = null;
        break;
      }
    }
    this.moveBlockDown(this.fallingBlock);
    this.updateFallingBlockLimits(this.fallingBlock);
  }

  moveBlockDown(block) {
    if (block !== null) {
      const up = block.limits.up;
      const right = block.limits.right;
      const down = block.limits.down;
      const left = block.limits.left;

      for (var i=down; i>up-1; i--) {
        for (var j=left; j<right+1; j++) {
          this.board[i+1][j] = this.board[i][j];
        }
      }
      // clean the previous row
      for (var k=left; k<right+1; k++) {
        this.board[up][k] = ".";
      }
    }
  }

  updateFallingBlockLimits(block) {
    if (block !== null) {
      const limits = block.limits;
      const newLimits = {...limits, up: block.limits.up +1, down: block.limits.down + 1 }
      this.fallingBlock = {...block, limits: newLimits};
    }
  }

  isThereSpaceBelow(rowIdx, colIdx) {
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

  move(direction) {
    if (this.fallingBlock !== null) {
      const block = this.fallingBlock;
      const up = block.limits.up;
      const right = block.limits.right;
      const down = block.limits.down;
      const left = block.limits.left;
      if (direction === 'left') {
        for (var i=down; i>up-1; i--) {
          for (var j=left; j<right+1; j++) {
            this.board[i][j-1] = this.board[i][j];
          }
        }
        // clean the right column
        for (var k=down; k>up; k--) {
          this.board[k][right] = ".";
        }
      } else if (direction === 'right') {
        for (var i=down; i>up-1; i--) {
          for (var j=right; j>left-1; j--) {
            this.board[i][j+1] = this.board[i][j];
          }
        }

        // clean the left column
        for (var k=down; k>up; k--) {
          this.board[k][left] = ".";
        }
      } else {
        this.tick();
      }
    }
  }

}
