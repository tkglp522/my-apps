<template>
    <footer class="bg-gray-800 text-gray-100 py-4">
        <div class="container mx-auto text-center">
            <p>&copy; {{ currentYear }} Sudoku Game</p>
            <p class="mt-2"><a href="https://github.com/your-github-username/sudoku-game"
                    class="underline hover:text-gray-300">View Source Code on GitHub</a></p>
        </div>
    </footer>
</template>

<script>
export default {
    computed: {
        currentYear() {
            return new Date().getFullYear();
        },
    },
};
</script>
