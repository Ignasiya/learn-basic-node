const { calculateResultSum } = require('./helper');
require('colors'); // фишка

const total = calculateResultSum([12.1, 32.2, 13.1], 0.9);
const resultText = "Общая стоимость покупок: " + total + " рублей"

console.log(total > 50 ? resultText.red : resultText.green);