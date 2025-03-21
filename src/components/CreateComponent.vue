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
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3aa876;
}
</style>