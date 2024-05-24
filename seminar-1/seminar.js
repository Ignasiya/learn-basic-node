const http = require('http');

function serverHandler(req, res) {
    switch (req.url) {
        case '/':
            res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
            res.end('<h1>Главная страница</h1>');
            break;
        case '/about':
            res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
            res.end('<h1>О сайте</h1>');
            break;
        default:
            res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
            res.end('<h1>Страница не найдена</h1>');
            break;
    }
}

const server = http.createServer(serverHandler);

// const server = http.createServer((req, res) => {
//     console.log("Запрос получен");

//     res.writeHead(200, {
//         "Content-Type": "text/html; charset=UTF-8",
//     });
//     res.end("<h1>Мой сервер работает!</h1>");
// });

const port = 3000;

server.listen(port, () => { console.log(`Сервер запущен на порту ${port}`) });