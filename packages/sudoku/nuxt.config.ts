import sudokuGenPlugin from './plugins/sudoku-gen-plugin.client';

export default defineNuxtConfig({
    css: ['~/assets/css/main.css'],
    postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    plugins: [sudokuGenPlugin()],
  },
})
