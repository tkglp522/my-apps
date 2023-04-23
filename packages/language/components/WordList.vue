<template>
  <div>
  <div class="grid grid-cols-2 gap-4 border p-4">
      <div class="font-semibold">
        単語
      </div>
      <div class="font-semibold">
        日本語訳
      </div>
      <template v-for="(item, index) in wordList" :key="index">
        <div class="text-sm font-medium text-gray-300">
          {{ item.word }}
        </div>
        <div class="text-sm text-gray-300">
          {{ item.meaning }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  wordList: {
    type: Array,
  },
})
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}
</style>