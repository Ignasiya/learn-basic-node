const express = require('express');

const app = express();
const port = 3000;

let uniqueID = 0;
const articles = [];

app.get('/articles', (req, res) => {
    res.send({ articles });
});

app.get('/articles/:id', (req, res) => {
    const article = articles.find((article) => article.id === Number(req.params.id));

    if (article) {
        res.send({ article })
    } else {
        res.status(404);
        res.send({ article: null });
    }
});

app.post('/articles', (req, res) => {
    uniqueID += 1;

    articles.push({
        id: uniqueID,
        ...req.body
    });

    res.send({ id: uniqueID });
});

app.put('/articles/:id', (req, res) => {
    const article = articles.find((article) => article.id === Number(req.params.id));

    if (article) {
        article.title = req.body.title;
        article.content = req.body.content;

        res.send({ article })
    } else {
        res.status(404);
        res.send({ article: null });
    }
});

app.delete('/articles/:id', (req, res) => {
    const article = articles.find((article) => article.id === Number(req.params.id));

    if (article) {
        const articleIndex = articles.indexOf(article);
        articles.splice(articleIndex, 1);

        res.send({ article })
    } else {
        res.status(404);
        res.send({ article: null });
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
})