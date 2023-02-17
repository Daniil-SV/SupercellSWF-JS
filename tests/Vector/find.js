const {
    initVector
} = require("./init");

const array1 = initVector([5, 12, 8, 130, 44]);

const found = array1.find(element => element > 10);

console.log(found);
// Expected output: 12