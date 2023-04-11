<template>
  <div>
    <Header @new-game="startNewGame" @change-difficulty="changeDifficulty" />
    <main class="container mx-auto px-4 py-8">
      <Grid :cells="cells" :disabled="disabled" @cell-clicked="onCellClicked" />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
import Grid from '~/components/Grid.vue';
import  generateSudoku  from '@/plugins/utils.js';

export default {
  components: {
    Header,
    Footer,
    Grid,
  },
  data() {
    return {
      cells: [],
      disabled: true,
    };
  },
  methods: {
    startNewGame() {
      this.cells = generateSudoku();
      this.disabled = false;
    },
    changeDifficulty(difficulty) {
      this.cells = generateSudoku(difficulty);
      this.disabled = false;
    },
    onCellClicked(row, col) {
      console.log(`Cell (${row}, ${col}) clicked`);
    },
  },
};
</script>
