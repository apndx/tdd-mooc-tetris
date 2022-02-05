import _ from 'lodash';

export class RotatingShape {
  shapeAlphabet;
  shapeMatrix;
  size;

  constructor(shape) {
    // expecting square shapes
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
    this.shapeMatrix = rotatedRight;
    return this
  }

  rotateLeft() {
    var transposeMatrix = _.zip(...this.shapeMatrix);
    var rotatedLeft = transposeMatrix.reverse();
    this.shapeMatrix = rotatedLeft;
    return this
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
