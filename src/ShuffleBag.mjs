export class ShuffleBag {
  data;
  currentItem;
  currentPosition;

  constructor() {
    this.data = [];
    this.currentPosition = -1;
  }

  add(item, amount) {
    for (var i = 0; i < amount; i++) {
      this.data = this.data.concat(item);
    }
    this.currentPosition = this.size() - 1;
  }

  size() {
    return this.data.length;
  }

  next() {
    if (this.currentPosition < 1) {
      this.currentPosition = this.size() - 1;
      this.currentItem = this.data[0];
      return this.currentItem;
    }
    var position = Math.floor(Math.random() * this.currentPosition);

    this.currentItem = this.data[position];
    this.data[position] = this.data[this.currentPosition];
    this.data[this.currentPosition] = this.currentItem;
    this.currentPosition--;
    return this.currentItem;
  }
}
