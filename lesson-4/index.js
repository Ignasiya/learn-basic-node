const express = require('express');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

const app = express();
const port = 3000;

const articles = [
    { title: 'Article 1', description: 'First article' },
    { title: 'Article 2', description: 'Second article' },
    { title: 'Article 3', description: 'Third article' },
]

app.get('/', (req, res) => {
    const pathToTemplate = path.join(
        __dirname,
        '/template/home.handlebars'
    );

    fs.readFile(pathToTemplate, 'utf-8', (err, data) => {
        if (err) {
            res.status(500);
            res.send(err.message);
        } else {
            const template = handlebars.compile(data);
            res.send(template({ articles }));
        }
    });
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
})