<template>
  <div id="app">
    <HeaderComponent />
    <div class="chat-container">
      <div v-if="!userName">
        <input v-model="tempUserName" placeholder="Введите ваше имя" />
        <button @click="setUserName">Подтвердить</button>
      </div>
      <div v-else>
        <ChatComponent :messages="messages" />
        <CreateComponent @send-message="handleSendMessage" />
      </div>
    </div>
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
      userName: '', // Имя текущего пользователя
      tempUserName: '', // Временное имя для ввода
    };
  },
  created() {
    // Подключение к WebSocket
    this.ws = new WebSocket('ws://localhost:8080');

    this.ws.onmessage = (event) => {
      let data = event.data;

      // Если данные пришли в формате Blob, преобразуем их в текст
      if (data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          const text = reader.result;
          this.handleMessage(text);
        };
        reader.readAsText(data);
      } else {
        // Если данные уже в текстовом формате, обрабатываем их
        this.handleMessage(data);
      }
    };
  },
  methods: {
    // Обработка сообщений
    handleMessage(data) {
      try {
        const message = JSON.parse(data);

        // Если получено сообщение
        if (message.type === 'message') {
          this.messages.push(message.text);
        }
      } catch (error) {
        console.error('Ошибка при обработке сообщения:', error);
      }
    },
    // Установка имени пользователя
    setUserName() {
      if (this.tempUserName.trim()) {
        this.userName = this.tempUserName;
        this.ws.send(JSON.stringify({ type: 'setName', name: this.userName }));
      }
    },
    // Отправка сообщения
    handleSendMessage(message) {
      if (message.trim()) {
        this.ws.send(JSON.stringify({ type: 'message', text: message }));
      }
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

.chat-container {
  max-width: 500px;
  /* Ограничиваем ширину чата */
  margin: 0 auto;
  /* Центрируем чат на странице */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}
</style>
