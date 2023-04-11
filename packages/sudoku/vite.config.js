export default defineConfig({
  build: {
    rollupOptions: {
      // https://rollupjs.org/configuration-options/
         external: ['sudoku-gen'],
    },
  },
})