<template>
    <div class="grid grid-cols-9 gap-1">
        <div v-for="i in 81" :key="i" class="p-2 text-center border border-gray-300">
            {{ cells[i - 1] }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        cells: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style>
/* Add any custom styles here */
</style>

