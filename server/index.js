// #region Global Imports
const next = require('next');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
require('dotenv').config();
// #endregion Global Imports

// #region Local Imports
const apolloServer = require('./data/server');
// #endregion Local Imports

const PORT = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV === 'development';
const app = next({ dev });
const handle = app.getRequestHandler();

mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('Подключение к БД успешно установлено')
}).catch((err) => {
    console.error('Ошибка подключения');
});

app.prepare().then(() => {
    const server = express();
    server.use(cors());
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
                mongooseConnection: mongoose.connection
            })
        })
    );

    server.post('/logout', (req, res) => {
        res.cookie('token', '', { maxAge: -1 });
        req.session.destroy(() => res.redirect('/'));
    });

    server.get('*', (req, res) => {
        return handle(req, res)
    });

    apolloServer.applyMiddleware({
        app: server,
        path: "/graphql"
    });

    server.listen(PORT, err => {
        if (err) throw err;
        console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error(err.stack);
    process.exit(1);
});
