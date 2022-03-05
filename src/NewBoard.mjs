import { HardCodedRotatingShape } from "./HardCodedRotatingShape.mjs";

export class NewBoard {
  width;
  height;
  board;
  fallingBlock;
  placement;
  oldies = ["t", "i", "o", "x", "l", "j", "y", "s", "z"];

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.makeBoardArray(this.width, this.height);
    this.fallingBlock = null;
    this.placement = Math.ceil(this.width / 2) - 1;
  }

  toString() {
    var boardString = "";
    for (var i = 0; i < this.height; i++) {
      var row = this.board[i].join("");
      boardString += row + "\n";
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
        const cornerX = Math.ceil(this.placement - size / 2) + 1;
        const cornerY = -1;
        const limits = block.limits;
        const newLimits = {
          ...limits,
          right: block.limits.right + this.placement,
          left: block.limits.left + this.placement,
        };
        this.fallingBlock = new HardCodedRotatingShape(
          block.shape,
          block.color,
          block.orientation,
          newLimits,
          cornerX,
          cornerY
        ); 
        var hasRoom = this.doesNewShapeFitWithOldOnes(this.fallingBlock); 
        if (hasRoom) {
          var blockStart = Math.ceil(this.placement - size / 2) + 1;
          for (var i = 0; i < size - 1; i++) {
            for (var j = 0; j < size; j++) {
              if (!this.oldies.includes(this.board[i][blockStart])) {
                this.board[i][blockStart] = block.shapeMatrix[i + 1][j];
              }
              blockStart += 1;
            }
            blockStart = Math.ceil(this.placement - size / 2) + 1;
          }
        } else if (!hasRoom) {
          throw "game over"
        }
      }
    } else {
      throw "already falling";
    }
  }

  getBlockSize(color) {
    switch (color) {
      case "X":
        return 1;
      case "Y":
        return 1;
      default:
        return 4;
    }
  }

  getJLTRightRotationLimits(limits, newBlock) {
    const newOrientation = newBlock.orientation;
    switch (newOrientation) {
      case "up":
        return { ...limits, up: limits.up + 1, right: limits.right + 1 };
      case "right":
        return { ...limits, left: limits.left + 1, up: limits.up - 1 };
      case "down":
        return { ...limits, up: limits.up + 1, left: limits.left - 1 };
      case "left":
        return { ...limits, right: limits.right - 1, up: limits.up - 1 };
      default:
        return limits;
    }
  }

  getJLTLeftRotationLimits(limits, newBlock) {
    const newOrientation = newBlock.orientation;
    switch (newOrientation) {
      case "up":
        return { ...limits, up: limits.up + 1, left: limits.left - 1 };
      case "right":
        return { ...limits, left: limits.left + 1, up: limits.up - 1 };
      case "down":
        return { ...limits, up: limits.up + 1, right: limits.right + 1 };
      case "left":
        return { ...limits, up: limits.up - 1, right: limits.right - 1 };
      default:
        return limits;
    }
  }

  getSRotationLimits(limits, newBlock) {
    const newOrientation = newBlock.orientation;
    switch (newOrientation) {
      case "up":
        return { ...limits, up: limits.up - 1, right: limits.right - 1 };
      case "left":
        return { ...limits, up: limits.up + 1, right: limits.right - 1 };
      case "down":
        return { ...limits, up: limits.up - 1, right: limits.right - 1 };
      case "right":
        return { ...limits, up: limits.up + 1, right: limits.right - 1 };
      default:
        return limits;
    }
  }

  getZRotationLimits(limits, newBlock) {
    const newOrientation = newBlock.orientation;
    switch (newOrientation) {
      case "up":
        return { ...limits, up: limits.up - 1, left: limits.left + 1 };
      case "left":
        return { ...limits, up: limits.up + 1, left: limits.left - 1 };
      case "down":
        return { ...limits, up: limits.up - 1, left: limits.left + 1 };
      case "right":
        return { ...limits, up: limits.up + 1, left: limits.left - 1 };
      default:
        return limits;
    }
  }

  getIRotationLimits(limits, newBlock) {
    const newOrientation = newBlock.orientation;
    switch (newOrientation) {
      case "up":
        return {
          down: limits.down + 2,
          left: limits.left + 2,
          up: limits.up - 1,
          right: limits.right - 1,
        };
      case "left":
        return {
          down: limits.down - 2,
          left: limits.left - 2,
          up: limits.up + 1,
          right: limits.right + 1,
        };
      default:
        return limits;
    }
  }

  tick() {
    if (this.hasFalling()) {
      var size = this.getBlockSize(this.fallingBlock.color);
      if (size === 1) {
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
    for (var i = 0; i < this.height; i++) {
      var row = this.board[i];
      var idx = row.indexOf(blockColor);
      if (idx != -1) {
        rowIndices.push(i);
        columnIndices.push(idx);
      }
    }
    for (var i = 0; i < rowIndices.length; i++) {
      var rowIndex = rowIndices[i];
      var columnIndex = columnIndices[i];
      if (
        rowIndex < this.height - 1 &&
        this.isThereSpaceBelow(rowIndex, columnIndex)
      ) {
        this.board[rowIndex][columnIndex] = ".";
        this.board[rowIndex + 1][columnIndex] = this.fallingBlock.color;
      } else {
        this.changeColorForStoppedBlocks();
        this.clearingCheck(rowIndex, rowIndex);
        this.fallingBlock = null;
      }
    }
  }

  clearingCheck(down, up) {
    for (var i = down; i >= up; i--) {
      if (!this.board[i].includes('.')) {
        this.clearRow(i);
        this.moveBoardAfterClear(i, up+1);
        break;
      } 
    } 
  }

  moveBoardAfterClear(startRow, endRow) {
    for (var i = startRow; i > 0; i--) {
      for (var j = 0; j < this.width; j++) {
        this.board[i][j] = this.board[i-1][j];
      }
    } 
    // clear the top row
    for (var j = 0; j < this.width; j++) {
      this.board[0][j] = '.';
    }
    this.clearingCheck(startRow, endRow);
  }

  clearRow(toCheck) {
    for (var j = 0; j < this.width; j++) {
      this.board[toCheck][j] = '.';
    }
  }

  moveBlockDownIfItShould() {
    var down = this.fallingBlock.limits.down;
    var up = this.fallingBlock.limits.up;
    if (down >= this.height - 1) {  
      this.changeColorForStoppedBlocks();
      this.clearingCheck(down, up);
      this.fallingBlock = null;
    } else {
      const newLimits = {
        ...this.fallingBlock,
        up: up + 1,
        down: down + 1,
      };
      const newBlock = new HardCodedRotatingShape(
        this.fallingBlock.shape,
        this.fallingBlock.color,
        this.fallingBlock.orientation,
        newLimits,
        this.fallingBlock.cornerX,
        this.fallingBlock.cornerY+1
      ); 
      if (!this.doesNewShapeFitWithOldOnes(newBlock)) {
        this.changeColorForStoppedBlocks();
        this.clearingCheck(down, up);
        this.fallingBlock = null;
      } else {
        this.moveBlockDown(this.fallingBlock);
        this.updateFallingBlockLimits(this.fallingBlock);
      }
    }
  }

  moveBlockDown(block) {
    if (block !== null) {
      const up = block.limits.up;
      const right = block.limits.right;
      const down = block.limits.down;
      const left = block.limits.left;

      for (var i = down; i > up - 1; i--) {
        for (var j = left; j < right + 1; j++) {
          if (!this.oldies.includes(this.board[i + 1][j])) {
            // do not overwrite old blocks
            this.board[i + 1][j] = this.board[i][j];
          }
        }
      }
      // clean the previous row
      for (var k = left; k < right + 1; k++) {
        this.board[up][k] = ".";
      }
    }
  }

  updateFallingBlockLimits(block) {
    if (block !== null) {
      const limits = block.limits;
      const newLimits = {
        ...limits,
        up: block.limits.up + 1,
        down: block.limits.down + 1,
      };
      this.fallingBlock = new HardCodedRotatingShape(
        block.shape,
        block.color,
        block.orientation,
        newLimits,
        block.cornerX,
        block.cornerY + 1
      );
    }
  }

  updateBlockLimitsMovingHorizontal(block, direction) {
    if (block !== null) {
      const limits = block.limits;
      const change = direction === "left" ? -1 : +1;
      const newLimits = {
        ...limits,
        left: limits.left + change,
        right: limits.right + change,
      };
      this.fallingBlock = new HardCodedRotatingShape(
        block.shape,
        block.color,
        block.orientation,
        newLimits,
        block.cornerX + change,
        block.cornerY
      );
    }
  }

  isThereSpaceBelow(rowIdx, colIdx) {
    const emptySpace = this.board[rowIdx + 1][colIdx] === ".";
    const lastRow = rowIdx === this.height - 1;
    return emptySpace || lastRow;
  }

  isThereSpaceHorizontal(rowIdx, colIdx, direction) {
    const checkedIdx = direction === "left" ? colIdx - 1 : colIdx + 1;
    return this.board[rowIdx][checkedIdx] === ".";
  }

  makeBoardArray = (width, height) => {
    var row = [];
    var board = [];
    for (var j = 0; j < height; j++) {
      for (var i = 0; i < width; i++) {
        row.push(".");
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
      if (direction === "left") {
        this.moveLeft(up, right, down, left);
      } else if (direction === "right") {
        this.moveRight(up, right, down, left);
      } else {
        this.tick();
      }
    }
  }

  moveLeft(up, right, down, left) {
    var stillRoom = true;
    for (var i = up; i < down + 1; i++) {
      if (left < 1 || !this.isThereSpaceHorizontal(i, left, "left")) {
        stillRoom = false;
        break;
      }
    }
    if (stillRoom) {
      for (var i = down; i > up - 1; i--) {
        for (var j = left; j < right + 1; j++) {
          this.board[i][j - 1] = this.board[i][j];
        }
      }
      // clean the right column
      for (var k = down; k > up - 1; k--) {
        this.board[k][right] = ".";
      }
      this.updateBlockLimitsMovingHorizontal(this.fallingBlock, "left");
    }
  }

  moveRight(up, right, down, left) {
    var stillRoom = true;
    for (var i = up; i < down + 1; i++) {
      if (right > this.width - 2 || !this.isThereSpaceHorizontal(i, right, "right")) {
        stillRoom = false;
        break;
      }
    }
    if (stillRoom) {
      for (var i = down; i > up - 1; i--) {
        for (var j = right; j > left - 1; j--) {
          this.board[i][j + 1] = this.board[i][j];
        }
      }
      // clean the left column
      for (var k = down; k > up - 1; k--) {
        this.board[k][left] = ".";
      }
      this.updateBlockLimitsMovingHorizontal(this.fallingBlock, "right");
    }
  }

  rotateFallingRight() {
    if (this.fallingBlock !== null && this.fallingBlock.color !== "O") {
      const oldLimits = this.fallingBlock.limits;
      const newBlock = this.fallingBlock.rotateRight();
      const newLimits = this.chooseLimits(oldLimits, newBlock, "right");
      const up = newLimits.up;
      const right = newLimits.right;
      const down = newLimits.down;
      const left = newLimits.left;
      const room = this.isThereRoomToRotate(newBlock, up, right, down, left);
      if (room === "all good") {
        this.fallingBlock = new HardCodedRotatingShape(
          newBlock.shape,
          newBlock.color,
          newBlock.orientation,
          newLimits,
          newBlock.cornerX,
          newBlock.cornerY
        );
        this.drawBoardAfterRightRotation();
      } else if (room === "wall kick right") {
        this.move("left");
        this.rotateFallingRight();
      } else if (room === "wall kick left") {
        this.move("right");
        this.rotateFallingRight();
      } else if (room === "wall kick down") {
        this.tick();
        this.rotateFallingRight();
      }
    }
  }

  rotateFallingLeft() {
    if (this.fallingBlock !== null && this.fallingBlock.color !== "O") {
      const oldLimits = this.fallingBlock.limits;
      const newBlock = this.fallingBlock.rotateLeft();
      const newLimits = this.chooseLimits(oldLimits, newBlock, "left");
      const up = newLimits.up;
      const right = newLimits.right;
      const down = newLimits.down;
      const left = newLimits.left;
      const newBlockWithLimits = new HardCodedRotatingShape(
        newBlock.shape,
        newBlock.color,
        newBlock.orientation,
        newLimits,
        newBlock.cornerX,
        newBlock.cornerY
      );
      const room = this.isThereRoomToRotate(newBlockWithLimits, up, right, down, left);
      if (room === "all good") {
        this.fallingBlock = newBlockWithLimits;
        this.drawBoardAfterRightRotation();
      } else if (room === "wall kick right") {
        this.move("left");
        this.rotateFallingLeft();
      } else if (room === "wall kick left") {
        this.move("right");
        this.rotateFallingLeft();
      } else if (room === "wall kick down") {
        this.tick();
        this.rotateFallingLeft();
      }
    }
  }

  chooseLimits(oldLimits, newBlock, direction) {
    const color = newBlock.color;
    switch (color) {
      case "T":
        return direction === "left"
          ? this.getJLTLeftRotationLimits(oldLimits, newBlock)
          : this.getJLTRightRotationLimits(oldLimits, newBlock);
      case "L":
        return direction === "left"
          ? this.getJLTLeftRotationLimits(oldLimits, newBlock)
          : this.getJLTRightRotationLimits(oldLimits, newBlock);
      case "J":
        return direction === "left"
          ? this.getJLTLeftRotationLimits(oldLimits, newBlock)
          : this.getJLTRightRotationLimits(oldLimits, newBlock);
      case "I":
        return this.getIRotationLimits(oldLimits, newBlock);
      case "S":
        return this.getSRotationLimits(oldLimits, newBlock);
      case "Z":
        return this.getZRotationLimits(oldLimits, newBlock);  
      default:
        return oldLimits;
    }
  }

  drawBoardAfterRightRotation() {
    if (this.fallingBlock !== null) {
      const block = this.fallingBlock;
      const size = block.size;
      const startX = block.cornerX;
      const startY = block.cornerY;
      const adjustment1 = startY === -1 ? 1 : 0; //after drop upper row of the block is outside the board
      for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
          if (i + startY < this.height && j + startX < this.width) {
            if (
              !this.oldies.includes(
                this.board[i + startY + adjustment1][j + startX]
              )
            ) {
              // if this coordinate is not occupied by an existing shape
              // it can be updated with the the new shape
              this.board[i + startY + adjustment1][j + startX] =
                block.shapeMatrix[i][j];
            }
          }
        }
      }
    }
  }

  isThereRoomToRotate(newBlock, up, right, down, left) {
    const fitsWithOldShapes = this.doesNewShapeFitWithOldOnes(newBlock);
    const fitsWell =
      fitsWithOldShapes &&
      up > -1 &&
      right < this.width &&
      down < this.height &&
      left > -1;

    const kicksRightWall =
      fitsWithOldShapes &&
      up > -1 &&
      down < this.height - 1 &&
      right > this.width - 1;

    const kicksLeftWall =
      fitsWithOldShapes && up > -1 && down < this.height - 1 && left < 0;

    const tooFarUp =
      fitsWithOldShapes && left > -1 && right < this.width && up < 0;

    if (fitsWell) {
      return "all good";
    } else if (kicksLeftWall) {
      return "wall kick left";
    } else if (kicksRightWall) {
      return "wall kick right";
    } else if (tooFarUp) {
      return "wall kick down";
    } else {
      return "no room";
    }
  }

  doesNewShapeFitWithOldOnes(newShape) {
    const startY = newShape.cornerY;
    const startX = newShape.cornerX;
    const size = newShape.size;
    const adjustment1 = startY === -1 ? 1 : 0; //after drop upper row of the block is outside the board
    for (var i = 0; i < size - 1; i++) {
      for (var j = 0; j < size - 1; j++) {
        if(startY + i + adjustment1 < this.height-1 && startY + i + adjustment1 > -1) {
          const boardPiece = this.board[startY + i + adjustment1][startX + j];
          const newShapePiece = newShape.shapeMatrix[i + adjustment1][j];
          if (
            this.oldies.includes(boardPiece) &&
            newShapePiece === newShape.color
          ) {
            // old shape prevents this rotation
            return false;
          }
        }
      }
    }
    return true;
  }

  changeColorForStoppedBlocks() {
    for (var j = 0; j < this.width; j++) {
      for (var i = 0; i < this.height; i++) {
        this.board[i][j] = this.board[i][j].toLowerCase();
      }
    }
  }
}
