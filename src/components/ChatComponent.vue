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
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
.message {
  margin-bottom: 5px;
}
</style>