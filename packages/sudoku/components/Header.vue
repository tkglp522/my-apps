<template>
    <header class="bg-gray-800 text-gray-100 py-4">
        <nav class="container mx-auto flex justify-between items-center">
            <h1 class="text-xl font-bold">Sudoku Game</h1>
            <div class="flex items-center">
                <button class="bg-gray-700 text-gray-100 px-4 py-2 rounded hover:bg-gray-600" @click="newGame">New
                    Game</button>
                <div class="relative ml-4">
                    <button class="bg-gray-700 text-gray-100 px-4 py-2 rounded hover:bg-gray-600" @click="toggleDropdown">
                        Difficulty
                        <i :class="{ 'fa-chevron-up': dropdownOpen, 'fa-chevron-down': !dropdownOpen }"
                            class="fas fa-chevron-down ml-2"></i>
                    </button>
                    <div v-if="dropdownOpen" class="absolute bg-gray-700 text-gray-100 mt-2 py-2 px-4 rounded shadow-lg">
                        <button class="block py-1 px-2 rounded hover:bg-gray-600" @click="changeDifficulty(1)">Easy</button>
                        <button class="block py-1 px-2 rounded hover:bg-gray-600"
                            @click="changeDifficulty(2)">Medium</button>
                        <button class="block py-1 px-2 rounded hover:bg-gray-600" @click="changeDifficulty(3)">Hard</button>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    data() {
        return {
            dropdownOpen: false,
        };
    },
    methods: {
        newGame() {
            this.$emit('new-game');
            this.dropdownOpen = false;
        },
        toggleDropdown() {
            this.dropdownOpen = !this.dropdownOpen;
        },
        changeDifficulty(difficulty) {
            this.$emit('change-difficulty', difficulty);
            this.dropdownOpen = false;
        },
    },
};
</script>