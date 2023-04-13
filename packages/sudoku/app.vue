<template>
    <div class="container mx-auto py-6">
        <h1 class="text-xl font-bold text-center mb-4">Sudoku</h1>
        <SudokuGrid ref="sudokuGrid" />
    </div>
</template>

<script>
import SudokuGrid from '~/components/SudokuGrid.vue';

export default {
    components: {
        SudokuGrid,
    },
};
</script>
