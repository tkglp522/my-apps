<template>
    <div class="container mx-auto py-10">
        <h1 class="text-4xl font-bold text-center mb-8">Sudoku</h1>
        <ControlPanel @generate-puzzle="generatePuzzle" @check-solution="checkSolution" />
        <SudokuGrid ref="sudokuGrid" />
    </div>
</template>

<script>
import SudokuGrid from '~/components/SudokuGrid.vue';
import ControlPanel from '~/components/ControlPanel.vue';

export default {
    components: {
        SudokuGrid,
        ControlPanel,
    },
    methods: {
        generatePuzzle() {
            this.$refs.sudokuGrid.generatePuzzle();
        },
        checkSolution() {
            this.$refs.sudokuGrid.checkSolution();
        },
    },
};
</script>
