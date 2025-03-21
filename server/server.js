const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Подключение маршрутов
app.use('/api', chatRoutes);

// Обработка WebSocket соединений
wss.on('connection', (ws) => {
    console.log('Новое подключение');

    ws.on('message', (message) => {
        console.log(`Получено сообщение: ${message}`);
        // Рассылаем сообщение всем подключенным клиентам
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Подключение закрыто');
    });
});

// Запуск сервера
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});