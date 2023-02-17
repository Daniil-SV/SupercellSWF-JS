const {
    initVector
} = require("./init");

const array1 = initVector(['a', 'b', 'c']);
const iterator = array1.keys();

for (const key of iterator) {
  console.log(key);
}

// Expected output: 0
// Expected output: 1
// Expected output: 2