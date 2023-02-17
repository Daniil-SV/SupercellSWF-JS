const {
    initVector
} = require("./init");

const array1 = initVector(['a', 'b', 'c']);
const iterator = array1.values();

for (const value of iterator) {
  console.log(value);
}

// Expected output: "a"
// Expected output: "b"
// Expected output: "c"