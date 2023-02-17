const {
    initVector
} = require("./init");

const array = initVector([1, 2, 3, 4, 5]);

// Checks whether an element is even
const even = (element) => element % 2 === 0;

console.log(array.some(even));
// Expected output: true
