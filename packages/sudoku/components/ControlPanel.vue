<template>
    <div class="flex justify-center space-x-4">
        <button @click="generatePuzzle"
            class="px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">
            New Puzzle
        </button>
        <button @click="checkSolution"
            class="px-4 py-2 text-white bg-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300">
            Check Solution
        </button>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    setup(_, { emit }) {
        const generatePuzzle = () => {
            emit('generate-puzzle');
        };

        const checkSolution = () => {
            emit('check-solution');
        };

        return {
            generatePuzzle,
            checkSolution,
        };
    },
});
</script>
