const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

const publicDir = 'public';
const fileCounter = 'counter.txt';

const pathFile = path.join(__dirname, publicDir, fileCounter);

app.use(express.static(publicDir));

app.use((req, res, next) => {
    let count = 0;
    count = parseInt(fs.readFileSync(pathFile, 'utf8')) || 0;

    res.locals.count = count + 1;

    fs.writeFileSync(pathFile, res.locals.count.toString());

    next();
});

app.get('/index', (req, res) => {
    res.send(`Счетчик посещения ${res.locals.count}.`);
});

app.get('/about', (req, res) => {
    res.send(`Счетчик посещения ${res.locals.count}.`);
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
})