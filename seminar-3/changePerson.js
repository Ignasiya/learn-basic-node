const fs = require('fs');
const path = require('path');
const fileName = "person.json";
const pathFile = path.join(__dirname, fileName);

const obj = JSON.parse(fs.readFileSync(pathFile));

obj.city = 'Ekateringurg';
obj.age -= 10;

fs.writeFileSync(pathFile, JSON.stringify(obj, null, 2));