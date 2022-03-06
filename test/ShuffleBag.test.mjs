import { expect } from "chai";
import { ShuffleBag } from "../src/ShuffleBag.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

const shapeI = Tetromino.I_SHAPE_NEW;
const shapeT = Tetromino.T_SHAPE_NEW;
const shapeL = Tetromino.L_SHAPE_NEW;
const shapeJ = Tetromino.J_SHAPE_NEW;
const shapeS = Tetromino.S_SHAPE_NEW;
const shapeZ = Tetromino.Z_SHAPE_NEW;
const shapeO = Tetromino.O_SHAPE_NEW;

const shapes = [shapeI, shapeT, shapeL, shapeJ, shapeS, shapeZ, shapeO];

function distinctTetrominoes(shuffleBag, testSize) {
  const distinct = new Set();
  for (let i = 0; i < testSize; i++) {
    const next = shuffleBag.next();
    distinct.add(next);
  }
  return distinct;
}

function getTetrominoeBatch(shuffleBag, batchSize) {
  const batch = [];
  for (let i = 0; i < batchSize + 1; i++) {
    batch.push(shuffleBag.next());
  }
  console.log(batch[0])
  return batch;
}

function addToShuffleBag(items, shuffleBag, amount) {
  for (var i = 0; i < items.length; i++) {
    shuffleBag.add(items[i], amount);
  }
  return shuffleBag;
}

describe("When a shuffle bag is initialized with tetrominoes", () => {
  var shuffleBag = new ShuffleBag();

  it("all types of the tetrominoes are found from the bag", () => {
    shuffleBag = addToShuffleBag(shapes, shuffleBag, 1);
    const foundTetrominoes = distinctTetrominoes(shuffleBag, 100);
    expect(foundTetrominoes.size).to.equal(7);
  });
});

describe("When values are required from the shuffle bag", () => {
  var shuffleBag = new ShuffleBag();

  it("they are returned in an unpredictable order", () => {
    shuffleBag = addToShuffleBag(shapes, shuffleBag, 50);
    const batch1 = getTetrominoeBatch(shuffleBag, 20);
    const batch2 = getTetrominoeBatch(shuffleBag, 20);
    expect(batch1).to.not.equal(batch2);
    expect(batch1.length).equal(batch2.length);
  });
});

describe("When values are required from the shuffle bag", () => {
  var shuffleBag = new ShuffleBag();

  it("the frequency of T-shape values is right", () => {
    shuffleBag = addToShuffleBag(shapes, shuffleBag, 100);
    const batch = getTetrominoeBatch(shuffleBag, 700);
    const tShapes = batch.filter(n => n.color === 'T');
    expect(tShapes.length).to.be.within(80, 120);
  });
});

describe("When all existing values are required from the shuffle bag", () => {
  var shuffleBag = new ShuffleBag();

  it("all the values are equally represented", () => {
    shuffleBag = addToShuffleBag(shapes, shuffleBag, 1);
    const batch = distinctTetrominoes(shuffleBag, 7);
    expect(batch.size).to.equal(7);
  });
});
