class simple {
    egg = 1
}

const arr = [new simple(), new simple(), new simple()]
const item = arr[0]
item.egg = 2
arr.push(item)

console.log(arr)
item.egg = 4
console.log(arr)