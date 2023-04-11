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
          import { getSudoku } from 'sudoku-gen';
          export const getSudoku = getSudoku;
        `;
      }
    },
  };
}