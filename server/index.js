// #region Global Imports
import next from 'next';
import path from "path";
import express from 'express';
import bodyParser from 'body-parser';
const cookieParser = require('cookie-parser');
import mongoose from 'mongoose';
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

require('dotenv').config();
// #endregion Global Imports

// #region Local Imports

// #endregion Local Imports

const PORT = parseInt(process.env.PORT, 10) || '3000';
const dev = process.env.NODE_DEV === 'development';
const app = next({ dev });
const handle = app.getRequestHandler();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useFindAndModify: false});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Ошибка подключения:'));
db.once('open', () => {
    console.log('Подключение к БД успешно установлено')
});

app.prepare().then(() => {
    const server = express();

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(express.static(path.join(__dirname, "../static")));
    server.use(cookieParser());

    server.use(
        session({
            secret: process.env.SESSION_SECRET,
            key: 'token',
            resave: false,
            saveUninitialized: false,
            store: new MongoStore({
                url: process.env.MONGO_URI,
                autoReconnect: true
            })
        })
    );

    server.post('/logout', (req, res) => {
        req.logout();
        res.cookie('token', '', { maxAge: -1 });
        req.session.destroy(() => res.redirect('/'));
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`Сервер запущен на порту ${PORT}`);
    });
}).catch((err) => {
    console.error(err.stack);
    process.exit(1);
});
