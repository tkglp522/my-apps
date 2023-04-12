export function generatePuzzle(difficulty) {
  const baseGrid = generateBaseGrid();
  const shuffledGrid = shuffleGrid(baseGrid);

  return shuffledGrid;
}

function generateBaseGrid() {
  const baseGrid = new Array(9).fill(null).map(() => new Array(9).fill(0));

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      baseGrid[i][j] = ((i * 3 + Math.floor(i / 3) + j) % 9) + 1;
    }
  }

  return baseGrid;
}

function shuffleGrid(grid) {
  const shuffledGrid = JSON.parse(JSON.stringify(grid));

  // Shuffle rows
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 3; j++) {
      const row1 = i + j;
      const row2 = i + ((j + Math.floor(Math.random() * 2) + 1) % 3);
      [shuffledGrid[row1], shuffledGrid[row2]] = [shuffledGrid[row2], shuffledGrid[row1]];
    }
  }

  // Shuffle columns
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 3; j++) {
      const col1 = i + j;
      const col2 = i + ((j + Math.floor(Math.random() * 2) + 1) % 3);

      for (let row = 0; row < 9; row++) {
        [shuffledGrid[row][col1], shuffledGrid[row][col2]] = [shuffledGrid[row][col2], shuffledGrid[row][col1]];
      }
    }
  }

  return shuffledGrid;
}
