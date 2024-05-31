const http = require('http');

// Объект для хранения счетчиков просмотров страниц
const viewCounts = {
    '/': 0,
    '/about': 0
};

const server = http.createServer((req, res) => {
    switch (req.url) {
        case '/':
            viewCounts['/']++;

            res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
            res.end(`
        <h1>Главная страница</h1>
        <a href="/about">Перейти на страницу "О сайте"</a>
        <p>Количество просмотров: ${viewCounts['/']}</p>
      `);
            break;

        case '/about':
            viewCounts['/about']++;

            res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
            res.end(`
        <h1>О сайте</h1>
        <a href="/">Перейти на главную страницу</a>
        <p>Количество просмотров: ${viewCounts['/about']}</p>
      `);
            break;

        default:
            res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
            res.end('<h1>Страница не найдена</h1>');
            break;
    }
});

server.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});