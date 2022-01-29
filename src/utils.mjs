export const makeBoardArray = (width, height) => {
  var row = [];
  var board = [];
  for (var j = 0; j < height; j++) {
    for (var i = 0; i < width; i++) {
      row.push('.');
    }
    board[j] = row;
    row = [];
  }
  return board;
};
