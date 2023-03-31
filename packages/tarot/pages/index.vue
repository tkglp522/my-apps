<script setup lang="ts">
const promptHistory = ref<Array<string | null>>([])
const userHistory = ref<Array<string | null>>([])
const message = ref<string>('')

const sendMessage = async () => {
    userHistory.value.push(message.value)
    message.value = ''
    const res = await useFetch('/api/openai', {
    method: "POST",
    body: {
    message: message.value
    }
  })
  const data = await res.data.value
  promptHistory.value.push(data)
}


</script>
<template>
<div>
    <div class="mb-8 bg-secondary">
    <div class="chat chat-start">
    <div class="chat-image avatar">
        <div class="w-10 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
          <img src="~/assets/img/tarot_uranai_woman.png" />
        </div>
      </div>
      <div class="chat-bubble">占いたい内容は何ですか？</div>
    </div>
    <div>
      <div v-for="userMessage in userHistory" class="chat chat-end">
        <div class="chat-bubble">{{ userMessage }}</div>
      </div>
    <div v-if="promptHistory[0]" class="chat chat-start">
        <div class="chat-image avatar">
            <div class="w-10 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
              <img src="~/assets/img/tarot_uranai_woman.png" />
            </div>
        </div>
        <div class="card card-side bg-base-200 shadow-xl">
          <figure class="w-36"><img src="~/assets/img/the-high-priestess-tarot-card.webp" alt="Card"/></figure>
          <div class="card-body">
            <h2 class="card-title">New movie is released!</h2>
            <p>{{promptHistory[0]}}</p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">Watch</button>
            </div>
          </div>
        </div>
    </div>
    </div>
    </div>
    <input v-model="message" type="text" placeholder="Type here" class="input input-bordered w-full mb-8" />
    <button class="btn btn-primary w-full" @click="sendMessage">占う</button>
</div>
</template>
