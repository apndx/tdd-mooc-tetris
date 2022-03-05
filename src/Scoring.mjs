export class Scoring {
  
  scores;

  constructor() {
    this.scores = 0;
  }

  update(level, clearedRows) {
    this.scores += this.scoreCalculator(level, clearedRows);
  }

  scoreCalculator(level, clearedRows) {
    switch (clearedRows) {
      case 1:
        return 40*(level+1);
      case 2:
        return 100*(level+1);
      case 3:
        return 300*(level+1);
      case 4:
        return 1200*(level+1);
      default:
        return 0;
    }
  }

}
