export default function generateSudoku() {
  const grid = Array.from({ length: 81 }, () => 0);

  function isValid(grid, row, col, num) {
    const blockRow = Math.floor(row / 3) * 3;
    const blockCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 9; i++) {
      if (grid[row * 9 + i] === num) return false;
      if (grid[i * 9 + col] === num) return false;
      const rowOffset = Math.floor(i / 3);
      const colOffset = i % 3;
      const blockIndex = (blockRow + rowOffset) * 9 + blockCol + colOffset;
      if (grid[blockIndex] === num) return false;
    }

    return true;
  }

  function fillCell(grid, row, col) {
    if (row === 9) return true;

    const nextCol = col === 8 ? 0 : col + 1;
    const nextRow = nextCol === 0 ? row + 1 : row;

    if (grid[row * 9 + col] !== 0) {
      return fillCell(grid, nextRow, nextCol);
    }

    const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    for (let i = 0; i < numbers.length; i++) {
      const num = numbers[i];

      if (isValid(grid, row, col, num)) {
        grid[row * 9 + col] = num;

        if (fillCell(grid, nextRow, nextCol)) {
          return true;
        }

        grid[row * 9 + col] = 0;
      }
    }

    return false;
  }

  fillCell(grid, 0, 0);

  return grid;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

