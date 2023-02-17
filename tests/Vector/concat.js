const {
    initVector
} = require("./init")

const array1 = initVector(['a', 'b', 'c']);
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);

console.log(array3);
// Expected output: Array ["a", "b", "c", "d", "e", "f"]