import _ from 'lodash';

export class RotatingShape {
  shapeAlphabet;
  shapeMatrix;
  size;
  type;
  orientation;

  constructor(shape, type, orientation) {
    // expecting square boards
    this.shapeAlphabet= this.getShapeAlphabet(shape);
    this.shapeMatrix = this.initializeShape();
    this.type = type;
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
    if (typeof this.type !== "undefined" && this.type === 'I_SHAPE') {
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
      return new RotatingShape(rotatedString, this.type, 'left');
    } else {
      var rotatedRight = transposeMatrix.map(row => row.reverse());
      var rotatedString = this.printRotated(rotatedRight);
      return new RotatingShape(rotatedString, this.type, 'up');
    }
  }

  rotateLeft() {
    if (typeof this.type !== "undefined" && this.type === 'I_SHAPE') {
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
      return new RotatingShape(rotatedString, this.type, 'up');
    } else {
      var rotatedLeft = transposeMatrix.reverse();
      var rotatedString = this.printRotated(rotatedLeft);
      return new RotatingShape(rotatedString, this.type, 'left');
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
