const {
    initVector
} = require("./init");

const words = initVector(['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present']);

const result = words.filter(word => word.length > 6);

console.log(result);
// Expected output: Array ["exuberant", "destruction", "present"]