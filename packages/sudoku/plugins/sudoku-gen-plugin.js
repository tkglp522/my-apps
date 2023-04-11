export default function sudokuGenPlugin() {
  return {
    name: 'sudoku-gen-plugin',
    resolveId(id) {
      if (id === 'sudoku-gen') {
        return id;
      }
    },
    load(id) {
      if (id === 'sudoku-gen') {
        return `
          import { Sudoku } from 'sudoku-gen';
          export const getSudoku = Sudoku.getSudoku;
        `;
      }
    },
  };
}