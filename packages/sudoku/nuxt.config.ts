import { resolve } from 'path';

export default defineNuxtConfig({
    css: ['~/assets/css/main.css'],
    postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    resolve: {
      alias: {
        '@sudoku-gen': resolve(__dirname, './modules/sudoku-gen'),
      },
    },
  },
})
