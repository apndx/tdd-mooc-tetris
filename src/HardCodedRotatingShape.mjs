import _ from "lodash";

export class HardCodedRotatingShape {
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
    // expecting 4x4 square shape boards
    this.shape = shape;
    this.shapeAlphabet = this.getShapeAlphabet(shape);
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
    for (var j = 0; j < this.size; j++) {
      for (var i = 0; i < this.size; i++) {
        row.push(this.shapeAlphabet[alphabetIndex]);
        alphabetIndex += 1;
      }
      shapeMatrix[j] = row;
      row = [];
    }
    return shapeMatrix;
  }

  getShapeAlphabet(shape) {
    return shape.replace(/ /g, "").replace(/\n/g, "").split("");
  }

  getNextOrientationRight() {
    const oldOrientation = this.orientation;
    switch (oldOrientation) {
      case "up":
        return "right";
      case "right":
        return "down";
      case "down":
        return "left";
      case "left":
        return "up";
      default:
        return "up";
    }
  }

  getNextOrientationLeft() {
    const oldOrientation = this.orientation;
    switch (oldOrientation) {
      case "up":
        return "left";
      case "left":
        return "down";
      case "down":
        return "right";
      case "right":
        return "up";
      default:
        return "up";
    }
  }

  rotateRight() {
    if (typeof this.color !== "undefined" && this.color === "O") {
      return this;
    } else if (typeof this.color !== "undefined" && this.color === "I") {
      return this.rotateRightI();
    } else {
      return this.rotate("right");
    }
  }

  rotateLeft() {
    if (typeof this.color !== "undefined" && this.color === "O") {
      return this;
    } else if (typeof this.color !== "undefined" && this.color === "I") {
      return this.rotateLeftI();
    } else {
      return this.rotate("left");
    }
  }

  rotate(direction) {
    const orientation =
      direction === "right"
        ? this.getNextOrientationRight()
        : this.getNextOrientationLeft();
    var shapeString = this.getStrings(orientation, this.color);
    return new HardCodedRotatingShape(
      shapeString,
      this.color,
      orientation,
      this.limits,
      this.cornerX,
      this.cornerY
    );
  }

  getStrings(orientation, color) {
    switch (color) {
      case "L":
        return this.getLStrings(orientation);
      case "T":
        return this.getTStrings(orientation);
      case "J":
        return this.getJStrings(orientation);
      case "S":
        return this.getSStrings(orientation);
      case "Z":
        return this.getZStrings(orientation);
      default:
        return this.getTStrings(orientation);
    }
  }

  getZStrings(orientation) {
    switch (orientation) {
      case "up":
        return `..Z.\n.ZZ.\n.Z..\n....\n`;
      case "left":
        return `....\nZZ..\n.ZZ.\n....\n`;
      case "down":
        return `..Z.\n.ZZ.\n.Z..\n....\n`;
      case "right":
        return `....\nZZ..\n.ZZ.\n....\n`;
      default:
        return `....\nZZ..\n.ZZ.\n....\n`;
    }
  }

  getSStrings(orientation) {
    switch (orientation) {
      case "up":
        return `S...\nSS..\n.S..\n....\n`;
      case "left":
        return `....\n.SS.\nSS..\n....\n`;
      case "down":
        return `S...\nSS..\n.S..\n....\n`;
      case "right":
        return `....\n.SS.\nSS..\n....\n`;
      default:
        return `....\n.SS.\nSS..\n....\n`;
    }
  }

  getTStrings(orientation) {
    switch (orientation) {
      case "up":
        return `....\n.T..\nTTT.\n....\n`;
      case "left":
        return `.T..\nTT..\n.T..\n....\n`;
      case "down":
        return `....\nTTT.\n.T..\n....\n`;
      case "right":
        return `.T..\n.TT.\n.T..\n....\n`;
      default:
        return `....\nTTT.\n.T..\n....\n`;
    }
  }

  getLStrings(orientation) {
    switch (orientation) {
      case "up":
        return `....\n..L.\nLLL.\n....\n`;
      case "left":
        return `LL..\n.L..\n.L..\n....\n`;
      case "down":
        return `....\nLLL.\nL...\n....\n`;
      case "right":
        return `.L..\n.L..\n.LL.\n....\n`;
      default:
        return `....\nLLL.\nL...\n....\n`;
    }
  }

  getJStrings(orientation) {
    switch (orientation) {
      case "up":
        return `....\nJ...\nJJJ.\n....\n`;
      case "left":
        return `.J..\n.J..\nJJ..\n....\n`;
      case "down":
        return `....\nJJJ.\n..J.\n....\n`;
      case "right":
        return `.JJ.\n.J..\n.J..\n....\n`;
      default:
        return `....\nJJJ.\n..J.\n....\n`;
    }
  }

  rotateRightI() {
    var transposeMatrix = _.zip(...this.shapeMatrix);
    if (this.orientation === "up") {
      var rotatedRight = transposeMatrix.reverse();
      var rotatedString = this.printRotated(rotatedRight);
      return new HardCodedRotatingShape(
        rotatedString,
        this.color,
        "left",
        this.limits,
        this.cornerX,
        this.cornerY
      );
    } else {
      var rotatedRight = transposeMatrix.map((row) => row.reverse());
      var rotatedString = this.printRotated(rotatedRight);
      return new HardCodedRotatingShape(
        rotatedString,
        this.color,
        "up",
        this.limits,
        this.cornerX,
        this.cornerY
      );
    }
  }

  rotateLeftI() {
    var transposeMatrix = _.zip(...this.shapeMatrix);
    if (this.orientation === "left") {
      var rotatedLeft = transposeMatrix.map((row) => row.reverse());
      var rotatedString = this.printRotated(rotatedLeft);
      return new HardCodedRotatingShape(
        rotatedString,
        this.color,
        "up",
        this.limits,
        this.cornerX,
        this.cornerY
      );
    } else {
      var rotatedLeft = transposeMatrix.reverse();
      var rotatedString = this.printRotated(rotatedLeft);
      return new HardCodedRotatingShape(
        rotatedString,
        this.color,
        "left",
        this.limits,
        this.cornerX,
        this.cornerY
      );
    }
  }

  printRotated(shape) {
    var matrixString = "";
    for (var i = 0; i < this.size; i++) {
      var row = shape[i].join("");
      matrixString += row + "\n";
    }
    return matrixString;
  }

  toString() {
    var matrixString = "";
    for (var i = 0; i < this.size; i++) {
      var row = this.shapeMatrix[i].join("");
      matrixString += row + "\n";
    }
    return matrixString;
  }
}
