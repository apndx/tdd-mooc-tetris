export class RotatingShape {
  shapeString;

  constructor(shapeString) {
    // max size to be 5x5, all shapes are square
    this.shapeString = shapeString.replace(/ /g, '')+'\n';
  }

  toString() { 
    return this.shapeString;
  }

}
