export function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

export function tryToMoveOverTheEdge(board, direction) {
  for (let i = 0; i < 7; i++) {
    board.move(direction);
  }
}

export function moveDown(board, times) {
  for (let i = 0; i < times; i++) {
    board.move("down");
  }
}
