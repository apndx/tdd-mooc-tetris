import _ from 'lodash';

export class RotatingShape {
  shape;
  shapeAlphabet;
  shapeMatrix;
  size;
  color;
  orientation;
  limits;
  cornerX; // upper corner x of the rotating shape board
  cornerY; // upper corner y of the rotating shape board

  constructor(shape, color, orientation, limits, cornerX, cornerY) {
    // expecting square shape boards
    this.shape = shape;
    this.shapeAlphabet= this.getShapeAlphabet(shape);
    this.shapeMatrix = this.initializeShape();
    this.color = color;
    this.orientation = orientation;
    this.limits = limits;
    this.cornerX = cornerX;
    this.cornerY = cornerY;
  }

  initializeShape() {
      var row = [];
      var shapeMatrix = [];
      var alphabetIndex = 0;
      this.size = Math.sqrt(this.shapeAlphabet.length);
      for (var j = 0; j < this.size ; j++) {
        for (var i = 0; i < this.size ; i++) {
          row.push(this.shapeAlphabet[alphabetIndex]);
          alphabetIndex +=1;
        }
        shapeMatrix[j] = row;
        row = [];
      }
      return shapeMatrix;
  };

  getShapeAlphabet(shape) {
    return shape.replace(/ /g, '').replace(/\n/g, '').split('');
  }

  getNextOrientationRight() {
    const oldOrientation = this.orientation;
    switch (oldOrientation) {
      case 'up':
        return 'right';
      case 'right':
        return 'down';
      case 'down':
        return 'left';
      case 'left':
        return 'up';
      default:
        return 'up'
      }
  }

  getNextOrientationLeft() {
    const oldOrientation = this.orientation;
    switch (oldOrientation) {
      case 'up':
        return 'left';
      case 'left':
        return 'down';
      case 'down':
        return 'right';
      case 'right':
        return 'up';
      default:
        return 'up'
      }
  }


  rotateRight() {
    if (typeof this.color !== "undefined" && this.color === 'O') {
      return this;
    }
    else if (typeof this.color !== "undefined" && this.color === 'I') {
      return this.rotateRightI()
    } else {
      var transposeMatrix = _.zip(...this.shapeMatrix);
      var rotatedRight = transposeMatrix.map(row => row.reverse());
      var rotatedString = this.printRotated(rotatedRight);
      return new RotatingShape(rotatedString, this.color, this.getNextOrientationRight(), this.limits, this.cornerX, this.cornerY);
    }
  }

  rotateRightI() {
    var transposeMatrix = _.zip(...this.shapeMatrix);
    if (this.orientation === 'up') {
      var rotatedRight = transposeMatrix.reverse();
      var rotatedString = this.printRotated(rotatedRight);
      return new RotatingShape(rotatedString, this.color, 'left', this.limits, this.cornerX, this.cornerY);
    } else {
      var rotatedRight = transposeMatrix.map(row => row.reverse());
      var rotatedString = this.printRotated(rotatedRight);
      return new RotatingShape(rotatedString, this.color, 'up', this.limits, this.cornerX, this.cornerY);
    }
  }

  rotateLeft() {
    if (typeof this.color !== "undefined" && this.color === 'O') {
      return this;
    }
    else if (typeof this.color !== "undefined" && this.color === 'I') {
      return this.rotateLeftI()
    } else {
      var transposeMatrix = _.zip(...this.shapeMatrix);
      var rotatedLeft = transposeMatrix.reverse();
      var rotatedString = this.printRotated(rotatedLeft);
      return new RotatingShape(rotatedString, this.color, this.getNextOrientationLeft(), this.limits, this.cornerX, this.cornerY);
    }
  }

  rotateLeftI() {
    var transposeMatrix = _.zip(...this.shapeMatrix);
    if (this.orientation === 'left') {
      var rotatedLeft = transposeMatrix.map(row => row.reverse());
      var rotatedString = this.printRotated(rotatedLeft);
      return new RotatingShape(rotatedString, this.color, 'up', this.limits, this.cornerX, this.cornerY);
    } else {
      var rotatedLeft = transposeMatrix.reverse();
      var rotatedString = this.printRotated(rotatedLeft);
      return new RotatingShape(rotatedString, this.color, 'left', this.limits, this.cornerX, this.cornerY);
    }
  }

  printRotated(shape) { 
    var matrixString = '';
    for (var i=0; i<this.size; i++ ) {
        var row = shape[i].join('');
        matrixString += row + '\n';
      }  
    return matrixString;
  }

  toString() { 
    var matrixString = '';
    for (var i=0; i<this.size; i++ ) {
        var row = this.shapeMatrix[i].join('');
        matrixString += row + '\n';
      }  
    return matrixString;
  }

}
