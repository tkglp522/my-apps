<script setup>
</script>
<template>
    <div class="mb-8">
    <div class="chat chat-start">
    <div class="chat-image avatar">
        <div class="w-10 rounded-full">
          <img src="~/assets/img/tarot_uranai_woman.png" />
        </div>
      </div>
      <div class="chat-bubble">占いたい内容は何ですか？</div>
    </div>
    <div class="chat chat-start">
    <div class="chat-image avatar">
        <div class="w-10 rounded-full">
          <img src="~/assets/img/tarot_uranai_woman.png" />
        </div>
      </div>
   <div class="card card-side bg-base-200 shadow-xl">
      <figure class="w-36"><img src="~/assets/img/the-high-priestess-tarot-card.webp" alt="Card"/></figure>
      <div class="card-body">
        <h2 class="card-title">New movie is released!</h2>
        <p>Click the button to watch on Jetflix app.</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Watch</button>
        </div>
      </div>
    </div>
    </div>
    <div class="chat chat-end">
      <div class="chat-bubble">You underestimate my power!</div>
    </div>
    </div>
    <input type="text" placeholder="Type here" class="input input-bordered w-full mb-8" />
    <button class="btn btn-primary">占う</button>
</template>
