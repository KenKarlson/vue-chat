const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Хранение подключенных пользователей
const users = new Map();

// Подключение маршрутов
app.use('/api', chatRoutes);

// Обработка WebSocket соединений
wss.on('connection', (ws) => {
  console.log('Новое подключение');

  // Обработка сообщений от клиента
  ws.on('message', (data) => {
    const message = JSON.parse(data);

    // Если пользователь отправляет свое имя
    if (message.type === 'setName') {
      users.set(ws, message.name); // Сохраняем имя пользователя
      console.log(`Пользователь ${message.name} подключен`);
      return;
    }

    // Если пользователь отправляет сообщение
    if (message.type === 'message') {
      const userName = users.get(ws); // Получаем имя пользователя
      const fullMessage = `${userName}: ${message.text}`; // Формируем полное сообщение

      // Рассылаем сообщение всем подключенным клиентам
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'message', text: fullMessage }));
        }
      });
    }
  });

  // Обработка закрытия соединения
  ws.on('close', () => {
    const userName = users.get(ws);
    console.log(`Пользователь ${userName} отключен`);
    users.delete(ws); // Удаляем пользователя из хранилища
  });
});

// Запуск сервера
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});