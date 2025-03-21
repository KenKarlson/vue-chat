<template>
  <div id="app">
    <HeaderComponent />
    <ChatComponent :messages="messages" />
    <CreateComponent @send-message="handleSendMessage" />
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import ChatComponent from './components/ChatComponent.vue';
import CreateComponent from './components/CreateComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    ChatComponent,
    CreateComponent,
  },
  data() {
    return {
      messages: [],
      ws: null,
    };
  },
  created() {
    // Подключение к WebSocket
    this.ws = new WebSocket('ws://localhost:8080');

    this.ws.onmessage = (event) => {
      // Если данные пришли в формате Blob, преобразуем их в строку
      if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          this.messages.push(reader.result);
        };
        reader.readAsText(event.data);
      } else {
        // Если данные уже в текстовом формате, просто добавляем их
        this.messages.push(event.data);
      }
    };
  },
  methods: {
    handleSendMessage(message) {
      this.ws.send(message);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
