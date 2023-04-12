<template>
    <div class="container mx-auto py-10">
        <h1 class="text-4xl font-bold text-center mb-8">Sudoku</h1>
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
