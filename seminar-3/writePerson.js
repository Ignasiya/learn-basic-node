const fs = require('fs');
const path = require('path');
const fileName = "person.json";
const pathFile = path.join(__dirname, fileName);

const obj = {
    name: 'Ivan',
    surname: 'Ivanov',
    age: 30,
    city: "Moscow"
};

fs.writeFileSync(pathFile, JSON.stringify(obj, null, 2));