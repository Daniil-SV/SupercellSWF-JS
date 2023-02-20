const SC = require("../");
const Native_SC = require("../lib/native")
const {extend_to} = require("../lib/node/Utils/utils")
const util = require("util")

const nativeClass = new Native_SC.NativeShapeDrawCommand();
const jsClass = new SC.ShapeDrawCommand();
const jsVertex = new SC.ShapeDrawCommandVertex({x: 10, y: 10})

/* console.log(jsVertex)
const jsMix = extend_to(nativeClass, jsClass)
jsMix.vertices.push(jsVertex)
console.log(util.inspect(jsMix, true, 5))
console.log(jsMix.vertices.length) */

const jsMix = Object.setPrototypeOf(jsClass, nativeClass);

console.log(util.inspect(jsMix, false, 5))

//console.log(util.inspect(Object.getPrototypeOf(new SC.ShapeDrawCommand()), true, 6));
//console.log(util.inspect(Object.getPrototypeOf(new Native_SC.NativeShapeDrawCommand()), true, 6));
