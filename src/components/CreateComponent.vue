<template>
  <div class="create">
    <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Введите сообщение" />
    <button @click="sendMessage">Отправить</button>
  </div>
</template>

<script>
export default {
  name: 'CreateComponent',
  data() {
    return {
      newMessage: '',
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim()) {
        this.$emit('send-message', this.newMessage);
        this.newMessage = '';
      }
    },
  },
};
</script>

<style scoped>
.create {
  display: flex;
}
input {
  flex: 1;
  padding: 5px;
}
button {
  margin-left: 10px;
}
</style>