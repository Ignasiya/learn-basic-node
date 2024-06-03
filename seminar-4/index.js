const express = require('express');
const fs = require('fs');
const path = require('path');
const joi = require('joi');
const fileName = "users.json";
const pathFile = path.join(__dirname, fileName);

const app = express();
const port = 3000;
let uniqueID = 3;

const userSchema = joi.object({
    name: joi.string().min(1).required(),
    surname: joi.string().min(1).required(),
    age: joi.number().min(0).required(),
    city: joi.string(),
});

app.use(express.json());

app.get('/users', (req, res) => {
    const users = JSON.parse(fs.readFileSync(pathFile));
    res.send({ users });
});

app.get('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(pathFile));
    const user = users.find((user) => user.id === Number(req.params.id));

    if (user) {
        res.send({ user })
    } else {
        res
            .status(404)
            .send({ user: null, error: "пользователь не найден", status: "error" });
    }
});

app.put('/users/:id', (req, res) => {
    const validation = userSchema.validate(req.body);

    if (validation.error) {
        return res
            .status(500)
            .send({ error: validation.error.details, status: "error" });
    }

    const users = JSON.parse(fs.readFileSync(pathFile));
    const user = users.find((user) => user.id === Number(req.params.id));

    if (user) {
        user.name = req.body.name;
        user.surname = req.body.surname;
        user.age = req.body.age;
        user.city = req.body.city;
        fs.writeFileSync(pathFile, JSON.stringify(users, null, 4));

        res.send({ user })
    } else {
        res
            .status(404)
            .send({ user: null, error: "пользователь не найден", status: "error" });
    }
});

app.post('/users', (req, res) => {
    const validation = userSchema.validate(req.body);

    if (validation.error) {
        return res
            .status(500)
            .send({ error: validation.error.details, status: "error" });
    }

    const users = JSON.parse(fs.readFileSync(pathFile));

    const user = {
        id: uniqueID,
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age,
        city: req.body.city,
    };

    uniqueID++;

    users.push(user);

    fs.writeFileSync(pathFile, JSON.stringify(users, null, 4));

    res.send(user);
});

app.delete('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(pathFile));
    const userIndex = users.findIndex((user) => user.id === Number(req.params.id));

    if (userIndex > -1) {
        users.splice(userIndex, 1);

        fs.writeFileSync(pathFile, JSON.stringify(users, null, 4));

        res.send({ status: 'ok' });
    } else {
        res
            .status(404)
            .send({ user: null, error: "пользователь не найден", status: "error" });
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
})