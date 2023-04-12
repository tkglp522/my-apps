<template>
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
              :class="`w-12 h-12 text-center ${readonlyCells[rowIndex][colIndex] ? 'font-bold' : ''} ${rowIndex % 3 === 2 ? 'border-b-2' : 'border'} ${colIndex % 3 === 2 ? 'border-r-2' : 'border'} border-gray-300`"
              :readonly="readonlyCells[rowIndex][colIndex]"
              @input="validateInput($event, rowIndex, colIndex)"
            />
          </div>
        </div>
        <div class="flex flex-col mt-4 space-y-2">
      <button @click="generatePuzzle('easy')" class="px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">New Easy Puzzle</button>
      <button @click="generatePuzzle('medium')" class="px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">New Medium Puzzle</button>
      <button @click="generatePuzzle('hard')" class="px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">New Hard Puzzle</button>
      <button @click="checkSolution" class="px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">Check Solution</button>
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

        };
    },

    mounted() {
        this.generatePuzzle('easy');
    },

    methods: {
        generatePuzzle(difficulty) {
            this.grid = generatePuzzle(difficulty);
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

        checkSolution() {
            const solutionGrid = JSON.parse(JSON.stringify(this.grid));
            const isSolved = solveSudoku(solutionGrid);

            if (isSolved) {
                // The puzzle is solved correctly
                console.log("Congratulations! The solution is correct.");
            } else {
                // The puzzle is not solved correctly
                console.log("The solution is incorrect. Please try again.");
            }
        },

        validateInput(event, rowIndex, colIndex) {
            const value = parseInt(event.target.value);
            if (isNaN(value) || value < 1 || value > 9) {
                this.grid[rowIndex][colIndex] = '';
            } else {
                this.grid[rowIndex][colIndex] = value;
            }
        },

        resetInputs() {
            this.grid = this.grid.map((row, rowIndex) => {
                return row.map((cell, colIndex) => {
                    return this.readonlyCells[rowIndex][colIndex] ? cell : '';
                });
            });
        }

    },
};
</script>
