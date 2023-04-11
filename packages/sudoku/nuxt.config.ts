// https://nuxt.com/docs/api/configuration/nuxt-config
import sudokuGenPlugin from './plugins/sudoku-gen-plugin';

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
