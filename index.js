const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const TOKEN = process.env.BOT_TOKEN;
const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL; // 👈 вот здесь будет адрес Make

app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
    const chatId = req.body.message?.chat?.id;
    const message = req.body.message?.text;

    if (chatId && message) {
        console.log(`Получено сообщение от пользователя: ${message}`);

        // ⬇️ Отправка в Make
        try {
            await axios.post(MAKE_WEBHOOK_URL, {
                chatId,
                message
            });
            console.log('Сообщение отправлено в Make');
        } catch (error) {
            console.error('Ошибка при отправке в Make:', error.message);
        }
    }

    res.sendStatus(200);
});

app.get('/', (req, res) => {
    res.send('Telegram server is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
