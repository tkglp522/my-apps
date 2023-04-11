<template>
    <div class="container mx-auto my-8">
        <Grid :cells="cells" />
    </div>
</template>

<script>
import Grid from '@/components/Grid.vue';
import  generateSudoku  from '@/plugins/utils.js';

export default {
    components: {
        Grid,
    },
    data() {
        return {
            cells: [],
        };
    },
    mounted() {
        this.cells = generateSudoku();
    },
};
</script>