export function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}
