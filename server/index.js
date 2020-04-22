const express = require('express')
const next = require('next')
const mongoose = require('mongoose')

require('dotenv').config();

const PORT = parseInt(process.env.PORT, 10) || 5000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('Подключение к БД успешно установлено')
}).catch((err) => {
    console.error.bind(console, 'Ошибка подключения:');
});

app.prepare().then(() => {
    const server = express()

    server.all('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(PORT, err => {
        if (err) throw err
        console.log(`Сервер запущен по адресу http://localhost:${PORT}`)
    })
})
