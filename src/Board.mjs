import { RotatingShape } from "./RotatingShape.mjs";

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
 
      var size = this.getBlockSize(block.color);
      if (size === 1) {
        this.fallingBlock = block;
        this.board[0][this.placement] = block.color;
      } else {
        this.fallingBlock = new RotatingShape(block.shape, block.color, block.orientation, block.limits);
        var blockStart = Math.ceil(this.placement-(size/2))
        for (var i=0; i<size; i++) {
          for (var j=0; j<size; j++) {
            this.board[i][blockStart] = block.shapeMatrix[i][j];
            blockStart +=1;
          }
          blockStart = Math.ceil(this.placement-(size/2))
        }
        const cornerX = Math.ceil(this.placement-(size/2));
        const cornerY = 0;
        const limits = block.limits;
        const newLimits = {...limits, right: block.limits.right+this.placement, left: block.limits.left + this.placement }
        this.fallingBlock = new RotatingShape(block.shape, block.color, block.orientation, newLimits, cornerX, cornerY);
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

  getTRightRotationLimits(limits) {
    const newOrientation = this.fallingBlock.orientation;
    switch (newOrientation) {
    case 'up':
      return {...limits, down: limits.down-1, right: limits.right+1};
    case 'right':
      return {...limits, left: limits.left+1, down: limits.down+1};
    case 'down':
      return {...limits, up: limits.up+1, left: limits.left-1};
    case 'left':
      return {...limits, right: limits.right-1, up: limits.up-1};
    default:
      return limits;
    }
  }

  getTLeftRotationLimits(limits) {
    const newOrientation = this.fallingBlock.orientation;
    switch (newOrientation) {
    case 'up':
      return {...limits, down: limits.down-1, left: limits.left-1};
    case 'right':
      return {...limits, left: limits.left+1, down: limits.down+1};
    case 'down':
      return {...limits, up: limits.up+1, right: limits.right+1};
    case 'left':
      return {...limits, down: limits.down+1, right: limits.right-1};
    default:
      return limits;
    }
  }

  getIRotationLimits(limits) {
    const newOrientation = this.fallingBlock.orientation;
    switch (newOrientation) {
    case 'up':
      return {...limits, down: limits.down+1, left: limits.left-2, up: limits.up+2, right: limits.right+1};
    case 'left':
      return {...limits, down: limits.down-1, left: limits.left+2, up: limits.up-2, right: limits.right-1};
    default:
      return limits;
    }
  }

  tick() {
    if (this.hasFalling()) {
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
      const newLimits = {...limits, up: block.limits.up +1, down: block.limits.down +1 }
      this.fallingBlock = new RotatingShape(block.shape, block.color, block.orientation, newLimits, block.cornerX, block.cornerY +1 );
    }
  }

  updateBlockLimitsMovingHorizontal(block, direction) {
    if (block !== null) {
      const limits = block.limits;
      const change = direction === 'left' ? -1 : +1;
      const newLimits = {...limits, left: limits.left+change, right: limits.right+change};
      this.fallingBlock = new RotatingShape(block.shape, block.color, block.orientation, newLimits, block.cornerX+change, block.cornerY );
    }
  }

  isThereSpaceBelow(rowIdx, colIdx) {
    const emptySpace = this.board[rowIdx+1][colIdx] === ".";
    const lastRow = rowIdx === this.height -1;
    return emptySpace || lastRow;
  }

  isThereSpaceHorizontal(rowIdx, colIdx, direction) {
    const checkedIdx = direction === 'left' ? colIdx-1 : colIdx+1;
    return this.board[rowIdx][checkedIdx] === ".";
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
        this.moveLeft(up, right, down, left);
      } else if (direction === 'right') {
        this.moveRight(up, right, down, left);
      } else {
        this.tick();
      }
    }
  }

  moveLeft(up, right, down, left) {
    var stillRoom = true;
    for (var i=up; i<down+1; i++) {
      if ((left < 1) || !(this.isThereSpaceHorizontal(i, left, 'left'))) {
        stillRoom = false;
        break;
      }
    }
    if (stillRoom) {
      for (var i=down; i>up-1; i--) {
        for (var j=left; j<right+1; j++) {
          this.board[i][j-1] = this.board[i][j];
        }
      }
      // clean the right column
      for (var k=down; k>up; k--) {
        this.board[k][right] = ".";
      }
      this.updateBlockLimitsMovingHorizontal(this.fallingBlock, 'left');
    }
  }

  moveRight(up, right, down, left) {
    var stillRoom = true;
    for (var i=up; i<down+1; i++) {
      if ((right > this.width-2) || !(this.isThereSpaceHorizontal(i, right, 'right'))) {
        stillRoom = false;
        break;
      }
    }
    if (stillRoom) {
      for (var i=down; i>up-1; i--) {
        for (var j=right; j>left-1; j--) {
          this.board[i][j+1] = this.board[i][j];
        }
      }
      // clean the left column
      for (var k=down; k>up; k--) {
        this.board[k][left] = ".";
      }
      this.updateBlockLimitsMovingHorizontal(this.fallingBlock, 'right');
    }
  }

  rotateFallingRight() {
    if (this.fallingBlock !== null && this.fallingBlock.color !== 'O') {
      const oldLimits = this.fallingBlock.limits;
      this.fallingBlock =  this.fallingBlock.rotateRight();
      const newLimits = this.fallingBlock.color === 'T' ? this.getTRightRotationLimits(oldLimits) : this.getIRotationLimits(oldLimits);
      this.fallingBlock = new RotatingShape(this.fallingBlock.shape, this.fallingBlock.color, this.fallingBlock.orientation, newLimits, this.fallingBlock.cornerX, this.fallingBlock.cornerY);
      this.drawBoardAfterRightRotation();
    }
  }

  rotateFallingLeft() {
    if (this.fallingBlock !== null && this.fallingBlock.color !== 'O') {
      const oldLimits = this.fallingBlock.limits;
      this.fallingBlock  = this.fallingBlock.rotateLeft();
      const newLimits = this.fallingBlock.color === 'T' ? this.getTLeftRotationLimits(oldLimits) : this.getIRotationLimits(oldLimits);
      this.fallingBlock = new RotatingShape(this.fallingBlock.shape, this.fallingBlock.color, this.fallingBlock.orientation, newLimits, this.fallingBlock.cornerX, this.fallingBlock.cornerY);
      this.drawBoardAfterRightRotation();
    }
  }


  drawBoardAfterRightRotation() {
    if (this.fallingBlock !== null) {
      const block = this.fallingBlock;
      const up = block.limits.up;
      const right = block.limits.right;
      const down = block.limits.down;
      const left = block.limits.left;
      const size = block.size;
      const startX = block.cornerX;
      const startY = block.cornerY;
      if (this.isThereRoomToRotate(up, right, down, left)) {
        for (var i=0; i<size; i++) {
          for (var j=0; j<size; j++) {
            if (i+startY<this.height-1 && j+startX < this.width-1) {
              this.board[i+startY][j+startX] = block.shapeMatrix[i][j];
            }
          }
        }
      }
    }
  }

  isThereRoomToRotate(up, right, down, left) {
    return (up > -1 && right < this.width-1 && down < this.height-1 && left > -1) ?
      true : 
      false;
    }
  
}
