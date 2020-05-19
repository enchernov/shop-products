// #region Global Imports
const next = require('next');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressPlayground = require("graphql-playground-middleware-express").default;
// #endregion Global Imports

// #region Local Imports
const apolloServer = require('./apollo/apolloServer');
const userMiddleware = require('./middleware/user');
const authMiddleware = require('./middleware/auth');
// #endregion Local Imports

const PORT = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV === 'development';
const app = next({ dev });
const handle = app.getRequestHandler();

mongoose.Promise = global.Promise;
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

const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function() {
    return this.toString();
};

app.prepare().then(() => {
    const server = express();
    server.use(cors());
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(express.static(path.join(__dirname, "../public")));
    server.use(cookieParser());
    server.use(userMiddleware);

    server.use('/profile', authMiddleware)

    server.get('*', (req, res) => {
        return handle(req, res)
    });

    apolloServer.applyMiddleware({
        app: server,
        path: "/graphql"
    });

    server.get('/playground', expressPlayground({
        endpoint: "/graphql"
    }));

    server.listen(PORT, err => {
        if (err) throw err;
        console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error(err.stack);
    process.exit(1);
});
