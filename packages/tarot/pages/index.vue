<script setup lang="ts">
const promptHistory = ref<Array<string | null>>([])
const userHistory = ref<Array<string | null>>([])
const message = ref<string>('')
const pending = ref<boolean>(false)

const sendMessage = async () => {
    const question = message.value
    pending.value = true
    userHistory.value.push(message.value)
    message.value = ''
    const res = await useFetch('/api/openai', {
    method: "POST",
    body: {
    question: question
    }
  })
  const data = await res.data.value
  promptHistory.value.push(data)
  pending.value = false
}


</script>
<template>
<div>
    <div class="mb-8">
    <div class="chat chat-start">
    <div class="chat-image avatar">
        <div class="w-10 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
          <img src="~/assets/img/tarot_uranai_woman.png" />
        </div>
      </div>
      <div class="chat-bubble">占いたい内容は何ですか？</div>
    </div>
    <div v-for="userMessage, index in userHistory">
      <div  class="chat chat-end">
        <div class="chat-bubble">{{ userMessage }}</div>
      </div>
      <div v-if="promptHistory[index]" class="chat chat-start">
        <div class="chat-image avatar">
            <div class="w-10 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
              <img src="~/assets/img/tarot_uranai_woman.png" />
            </div>
        </div>
        <div class="card card-side bg-base-200 shadow-xl">
          <figure class="h-full"><img src="~/assets/img/the-high-priestess-tarot-card.webp" alt="Card"/></figure>
          <div class="card-body">
            <h2 class="card-title">New movie is released!</h2>
            <p>{{promptHistory[index]}}</p>
          </div>
        </div>
      </div>
    </div>
    </div>
    <input v-model="message" type="text" placeholder="Type here" class="input input-bordered w-full mb-8" />
    <button class="btn btn-primary w-full" @click="sendMessage" :disabled="pending">占う</button>
</div>
</template>
