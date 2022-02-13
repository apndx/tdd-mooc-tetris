import _ from 'lodash';

export class RotatingShape {
  shapeAlphabet;
  shapeMatrix;
  size;
  color;
  orientation;

  constructor(shape, color, orientation) {
    // expecting square boards
    this.shapeAlphabet= this.getShapeAlphabet(shape);
    this.shapeMatrix = this.initializeShape();
    this.color = color;
    this.orientation = orientation;
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
      return new RotatingShape(rotatedString);
    }
  }

  rotateRightI() {
    var transposeMatrix = _.zip(...this.shapeMatrix);
    if (this.orientation === 'up') {
      var rotatedRight = transposeMatrix.reverse();
      var rotatedString = this.printRotated(rotatedRight);
      return new RotatingShape(rotatedString, this.color, 'left');
    } else {
      var rotatedRight = transposeMatrix.map(row => row.reverse());
      var rotatedString = this.printRotated(rotatedRight);
      return new RotatingShape(rotatedString, this.color, 'up');
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
      return new RotatingShape(rotatedString);
    }
  }

  rotateLeftI() {
    var transposeMatrix = _.zip(...this.shapeMatrix);
    if (this.orientation === 'left') {
      var rotatedLeft = transposeMatrix.map(row => row.reverse());
      var rotatedString = this.printRotated(rotatedLeft);
      return new RotatingShape(rotatedString, this.color, 'up');
    } else {
      var rotatedLeft = transposeMatrix.reverse();
      var rotatedString = this.printRotated(rotatedLeft);
      return new RotatingShape(rotatedString, this.color, 'left');
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
