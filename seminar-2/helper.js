const { plus, times: multy } = require('number-precision');

function calculateResultSum(purchases, discount) {
    let total = purchases.reduce((acc, purchase) => plus(acc, purchase), 0);

    total = multy(total, discount);
    return total;
}

module.exports = { calculateResultSum };