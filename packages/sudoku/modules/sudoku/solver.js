export function solveSudoku(grid) {
  const emptyCell = findEmptyCell(grid);
  if (!emptyCell) {
    return true;
  }

  const [row, col] = emptyCell;

  for (let num = 1; num <= 9; num++) {
    if (isValidMove(grid, row, col, num)) {
      grid[row][col] = num;

      if (solveSudoku(grid)) {
        return true;
      }

      grid[row][col] = 0;
    }
  }

  return false;
}

function findEmptyCell(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        return [row, col];
      }
    }
  }
  return null;
}

function isValidMove(grid, row, col, num) {
  return (
    !isInRow(grid, row, num) &&
    !isInCol(grid, col, num) &&
    !isInBox(grid, row - (row % 3), col - (col % 3), num)
  );
}

function isInRow(grid, row, num) {
  return grid[row].includes(num);
}

function isInCol(grid, col, num) {
  return grid.some((row) => row[col] === num);
}

function isInBox(grid, row, col, num) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[row + i][col + j] === num) {
        return true;
      }
    }
  }
  return false;
}

