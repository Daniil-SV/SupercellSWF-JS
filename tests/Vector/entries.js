const {
    initVector
} = require("./init")

const array1 = initVector(['a', 'b', 'c']);

const iterator1 = array1.entries();

console.log(iterator1.next())

console.log(iterator1.next().value);
// Expected output: Array [0, "a"]

console.log(iterator1.next().value);
// Expected output: Array [1, "b"]

for (const [value, item] of array1.entries()){
    console.log(value, item);
}