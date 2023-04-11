<template>
    <div class="grid grid-cols-9 gap-0.5">
        <div v-for="(cell, index) in cells" :key="index" class="w-12 h-12 text-center">
            <input
          v-model="cell.value"
          type="number"
          min="1"
          max="9"
          class="w-full h-full border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 text-center"
          :readonly="cell.readonly"
          @input="updateCellValue(index)"
            />
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import Sudoku from '~/sudoku';
import { onMounted } from 'vue';

export default {
    setup() {

        onMounted(() => {
            generatePuzzle();
        });

        const cells = ref([]);
        const puzzle = ref('');

        const generatePuzzle = () => {
            puzzle.value = Sudoku.generate('medium');
            cells.value = puzzle.value.split('').map((cell, index) => ({
                value: cell !== '.' ? parseInt(cell) : '',
                readonly: cell !== '.',
            }));
        };

        const checkSolution = () => {
            const solution = Sudoku.solve(puzzle.value);
            const userSolution = cells.value.map(cell => cell.value).join('');

            if (solution === userSolution) {
                alert('Congratulations!You have solved the puzzle correctly!');
} else {
                alert('Incorrect solution. Please try again.');
            }
        };

        const updateCellValue = (index) => {
            const value = cells.value[index].value;

            if (value < 1 || value > 9) {
                cells.value[index].value = '';
            }
        };

        return {
             cells,
            generatePuzzle,
            checkSolution,
            updateCellValue,
        };
    },
};

</script>

