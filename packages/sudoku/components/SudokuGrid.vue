<template>
       <div class="result-message flex justify-center mb-4" :class="resultClass">
        {{ resultMessage }}
      </div>
      <div class="flex flex-col items-center">
        <div class="flex flex-col items-center">
          <div
            v-for="(row, rowIndex) in grid"
            :key="rowIndex"
            class="flex"
          >
          <input
      v-for="(cell, colIndex) in row"
      :key="colIndex"
      v-model.number="grid[rowIndex][colIndex]"
      :class="`border ${selectedCell.row === rowIndex && selectedCell.col === colIndex ? 'bg-yellow-100' : ''}
      w-8 md:w-12 h-8 md:h-12 text-center ${readonlyCells[rowIndex][colIndex] ? 'font-bold' : ''} ${rowIndex % 3 === 2 ? 'border-b-2' : 'border'} ${colIndex % 3 === 2 ? 'border-r-2' : 'border'} border-gray-300`"
      readonly
      @click="selectCell(rowIndex, colIndex)"
    />
          </div>
        </div>
        <div class="number-buttons flex flex-wrap justify-center mt-4 space-x-1 md:space-x-2">
      <button
        v-for="number in 9"
        :key="number"
        @click="insertNumber(number)"
        class="w-9 md:w-12 h-9 md:h-12 text-white bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        {{ number }}
      </button>
    </div>
        <div class="flex flex-col mt-4 space-y-2">
      <button @click="generatePuzzle('easy')" class="px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">New Easy Puzzle</button>
      <button @click="generatePuzzle('medium')" class="px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">New Medium Puzzle</button>
      <button @click="generatePuzzle('hard')" class="px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">New Hard Puzzle</button>
      <button @click="resetInputs" class="px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">Reset Input</button>
    </div>
  </div>
</template>

<script>
import { generatePuzzle } from '~/modules/sudoku/generator';
import { solveSudoku } from '~/modules/sudoku/solver';

export default {
    data() {
        return {
            grid: [],
            readonlyCells: [],
            selectedCell: {
                row: null,
                col: null,
            },
            originalGrid: [],
            resultMessage: '',
            resultClass: '',
        };
    },

    mounted() {
        this.generatePuzzle('easy');
    },

    methods: {
        generatePuzzle(difficulty) {
            this.resultMessage =  ''
            this.resultClass = ''
            this.grid = generatePuzzle(difficulty);
            this.originalGrid = JSON.parse(JSON.stringify(this.grid));
            this.eraseCells(difficulty);
            this.readonlyCells = this.grid.map(row => row.map(cell => cell !== ""));
        },

        eraseCells(difficulty) {
            const cellsToErase = {
                easy: 30,
                medium: 40,
                hard: 50,
            };

            const count = cellsToErase[difficulty];

            for (let i = 0; i < count; i++) {
                const row = Math.floor(Math.random() * 9);
                const col = Math.floor(Math.random() * 9);

                this.grid[row][col] = "";
            }
        },
        selectCell(row, col) {
            if (!this.readonlyCells[row][col]) {
                this.selectedCell = { row, col };
            }
        },
        insertNumber(number) {
            if (this.selectedCell.row !== null && this.selectedCell.col !== null) {
                this.grid[this.selectedCell.row][this.selectedCell.col] = number;
                this.validateInput({ target: { value: number } }, this.selectedCell.row, this.selectedCell.col);
            }
        },
        checkSolution() {
            const solvedGrid = JSON.parse(JSON.stringify(this.originalGrid));
            solveSudoku(solvedGrid);
            let isCorrect = true;


            // Compare the user-filled grid with the solved grid
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    if (this.grid[row][col] !== solvedGrid[row][col]) {
                        isCorrect = false;
                        break;
                    }
                }
                if (!isCorrect) break;
            }

            if (isCorrect) {
                // The solution is correct
                this.resultMessage = "Congratulations! The solution is correct.";
                this.resultClass = "text-green-600";
            } else {
                // The solution is incorrect
                this.resultMessage = "The solution is incorrect. Please try again.";
                this.resultClass = "text-red-600";
            }
        },

        validateInput(event, rowIndex, colIndex) {
            const value = parseInt(event.target.value);
            if (isNaN(value) || value < 1 || value > 9) {
                this.grid[rowIndex][colIndex] = '';
            } else {
                this.grid[rowIndex][colIndex] = value;
            }
            let filledCells = 0;
            for (const row of this.grid) {
                for (const cell of row) {
                    if (cell !== "") filledCells++;
                    }
            }

            if (filledCells === 81) {
                    this.checkSolution();
                }
        },

        resetInputs() {
            this.resultMessage =  ''
            this.resultClass = ''
            this.grid = this.grid.map((row, rowIndex) => {
                return row.map((cell, colIndex) => {
                    return this.readonlyCells[rowIndex][colIndex] ? cell : '';
                });
            });
        }

    },
};
</script>

<style scoped>
input[readonly] {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>