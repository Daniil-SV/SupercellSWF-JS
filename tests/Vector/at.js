const {
    initVector
} = require("./init")

const array1 = [5, 12, 8, 130, 44];

const vector = initVector(array1);

let index = 2;

console.log(`Using an index of ${index} the item returned is ${vector.at(index)}`);
// Expected output: "Using an index of 2 the item returned is 8"

index = -2;

console.log(`Using an index of ${index} item returned is ${vector.at(index)}`);
// Expected output: "Using an index of -2 item returned is 130"