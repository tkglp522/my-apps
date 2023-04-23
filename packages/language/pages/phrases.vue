<template>
  <div class="container mx-auto px-4">
    <h1 class="text-center text-2xl font-semibold mb-8">旅に役立つフレーズ一覧</h1>
    <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <li v-for="item in data" :key="item.id">
        <div class="card bg-primary shadow-xl p-4">
          <div class="card-body">
            <h2 class="card-title text-xl font-semibold">{{ item.phrase }}</h2>
            <span class="text-xs">{{ item.pronounce }}</span>
            <div class="divider"></div>
            <p>{{ item.meaning }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import words from '@/assets/json/data.json'

const data = ref([])
data.value = words._rawValue
</script>