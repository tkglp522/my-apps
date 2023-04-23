<template>
    <header class="bg-gray-800 text-white py-4">
        <nav class="container mx-auto px-4">
            <ul class="flex space-x-4">
                <li>
                    <nuxt-link class="hover:text-blue-400" to="/planning">
                        Planning
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link class="hover:text-blue-400" to="/words">
                        Words
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link class="hover:text-blue-400" to="/word-quiz">
                        Word Quiz
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link class="hover:text-blue-400" to="/sentence-quiz">
                        Sentence Quiz
                    </nuxt-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script setup>
</script>

<style scoped></style>
