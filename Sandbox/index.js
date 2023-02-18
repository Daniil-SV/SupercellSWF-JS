class simple {
    egg = 1
}

const simpleItem = new simple();
const arr = []
arr.push(simpleItem)
simple.egg = 2
console.log(arr)
