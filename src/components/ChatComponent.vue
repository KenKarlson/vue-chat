<template>
  <div class="chat">
    <div v-for="(message, index) in messages" :key="index" class="message">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatComponent',
  props: {
    messages: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.chat {
  height: 300px;
  overflow-y: auto;
  margin-bottom: 10px;
}

.message {
  margin-bottom: 5px;
  padding: 5px;
  background-color: #e0e0e0;
  border-radius: 4px;
  word-wrap: break-word; /* Перенос длинных слов */
}
</style>