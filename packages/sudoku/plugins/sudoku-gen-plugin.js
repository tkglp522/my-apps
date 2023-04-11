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
          import * as sudokuGenModule from 'sudoku-gen';
          export const { getSudoku } = sudokuGenModule;
        `;
      }
    },
  };
}
