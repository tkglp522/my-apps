import Sudoku from 'sudoku-umd';

const sudoku = {
  generate(difficulty) {
    return Sudoku.generate(difficulty);
  },
  solve(puzzle) {
    return Sudoku.solve(puzzle);
  },
};

export default sudoku;