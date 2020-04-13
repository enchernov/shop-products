// #region Global Imports
import next from 'next';
import path from "path";
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
// #endregion Global Imports

// #region Local Imports

// #endregion Local Imports

const MONGO_URI = 'mongodb://localhost:27017/Photos';
const PORT = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_DEV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false});

app.prepare().then(() => {
    const server = express();

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(express.static(path.join(__dirname, "../static")));

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(PORT, err => {
        if (err) throw err;
        console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
    });
});
