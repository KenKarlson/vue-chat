const chatController = {
    getMessages: (req, res) => {
        // Здесь можно вернуть историю сообщений (если нужно)
        res.json({ messages: [] });
    },
};

module.exports = chatController;
