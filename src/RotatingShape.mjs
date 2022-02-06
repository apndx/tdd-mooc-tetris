import _ from 'lodash';

export class RotatingShape {
  shapeAlphabet;
  shapeMatrix;
  size;

  constructor(shape) {
    // expecting square boards
    this.shapeAlphabet= this.getShapeAlphabet(shape);
    this.shapeMatrix = this.initializeShape();
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
    var transposeMatrix = _.zip(...this.shapeMatrix);
    var rotatedRight = transposeMatrix.map(row => row.reverse());
    var rotatedString = this.printRotated(rotatedRight);
    var shape = new RotatingShape(rotatedString);
    return shape;
  }

  rotateLeft() {
    var transposeMatrix = _.zip(...this.shapeMatrix);
    var rotatedLeft = transposeMatrix.reverse();
    var rotatedString = this.printRotated(rotatedLeft);
    var shape = new RotatingShape(rotatedString);
    return shape;
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
