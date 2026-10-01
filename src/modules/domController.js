export function renderBoard(containerEl, board, isEnemy = false, onCellClick = null) {
  containerEl.innerHTML = '';

  for (let y = 0; y < board.size; y++) {
    for (let x = 0; x < board.size; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.x = x;
      cell.dataset.y = y;

      const cellValue = board.grid[y][x];

      if (cellValue === 'hit') {
        cell.classList.add('hit');
      } else if (cellValue === 'miss') {
        cell.classList.add('miss');
      } else if (cellValue !== null && !isEnemy) {
        cell.classList.add('ship'); // Show player's ships on their own board
      }

      if (isEnemy && cellValue !== 'hit' && cellValue !== 'miss' && onCellClick) {
        cell.addEventListener('click', () => onCellClick(x, y));
      }

      containerEl.appendChild(cell);
    }
  }
}