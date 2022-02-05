import _ from 'lodash';

export class RotatingShape {
  shapeString;
  shapeAlphabet;
  shapeMatrix;
  size;

  constructor(shape) {
    // expecting square shapes
    this.shapeString = shape.replace(/ /g, '')+'\n';
    this.shapeAlphabet= this.getShapeAlphabet(shape);
    this.shapeMatrix = this.initializeShape();
    console.log('matrix', this.shapeMatrix )
  }

  initializeShape() {
      var row = [];
      var shapeMatrix = [];
      var alphabetIndex = 0;
      this.size = Math.sqrt(this.shapeAlphabet.length)
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
    var rotatedRight = transposeMatrix.map(row => row.reverse())
    console.log('right', rotatedRight)
    this.shapeMatrix = rotatedRight;
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
