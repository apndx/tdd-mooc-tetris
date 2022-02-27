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
    } else if (typeof this.color !== "undefined" && this.color === "T") {
      return this.rotateT("right");
    } else if (typeof this.color !== "undefined" && this.color === "L") {
      return this.rotateL("right");
    } else {
      return this;
    }
  }

  rotateT(direction) {
    const orientation =
      direction === "right"
        ? this.getNextOrientationRight()
        : this.getNextOrientationLeft();
    const defaultT = new HardCodedRotatingShape(
      "....\nTTT.\n.T..\n....\n",
      "T",
      "down",
      this.limits,
      this.cornerX,
      this.cornerY
    );
    switch (orientation) {
      case "up":
        return new HardCodedRotatingShape(
          "....\n.T..\nTTT.\n....\n",
          "T",
          "up",
          this.limits,
          this.cornerX,
          this.cornerY
        );
      case "left":
        return new HardCodedRotatingShape(
          ".T..\nTT..\n.T..\n....\n",
          "T",
          "left",
          this.limits,
          this.cornerX,
          this.cornerY
        );
      case "right":
        return new HardCodedRotatingShape(
          ".T..\n.TT.\n.T..\n....\n",
          "T",
          "right",
          this.limits,
          this.cornerX,
          this.cornerY
        );
      case "down":
        return defaultT;
      default:
        return defaultT;
    }
  }

  rotateL(direction) {
    const orientation =
      direction === "right"
        ? this.getNextOrientationRight()
        : this.getNextOrientationLeft();
    const defaultL = new HardCodedRotatingShape(
      `....\nLLL.\nL...\n....\n`,
      "L",
      "down",
      this.limits,
      this.cornerX,
      this.cornerY
    );
    switch (orientation) {
      case "up":
        return new HardCodedRotatingShape(
          "....\n..L.\nLLL.\n....\n",
          "L",
          "up",
          this.limits,
          this.cornerX,
          this.cornerY
        );
      case "left":
        return new HardCodedRotatingShape(
          "LL..\n.L..\n.L..\n....\n",
          "L",
          "left",
          this.limits,
          this.cornerX,
          this.cornerY
        );
      case "right":
        return new HardCodedRotatingShape(
          ".L..\n.L..\n.LL.\n....\n",
          "L",
          "right",
          this.limits,
          this.cornerX,
          this.cornerY
        );
      case "down":
        return defaultL;
      default:
        return defaultL;
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

  rotateLeft() {
    if (typeof this.color !== "undefined" && this.color === "O") {
      return this;
    } else if (typeof this.color !== "undefined" && this.color === "I") {
      return this.rotateLeftI();
    } else if (typeof this.color !== "undefined" && this.color === "T") {
      return this.rotateT("left");
    } else if (typeof this.color !== "undefined" && this.color === "L") {
      return this.rotateL("left");
    } else {
      return this;
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
