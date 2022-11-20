// Converts a file to json and vice versa
const { writeFileSync } = require("fs");
const { parse } = require("path");
const { SupercellSWF } = require("../");
const { hrtime } = require("process");

const testFile = "level.sc";

let time = process.hrtime();

// Initializing and loading file to instance
let swf = new SupercellSWF()
    .loadAsset(`./Assets/${testFile}`);
console.log(`Loading took ${hrtime(time)} seconds!\n`);

time = hrtime();

// For large files, it is recommended to use external modules, otherwise JSON may throw an error that the strings are very large
let json = JSON.stringify(swf, null, 2);
writeFileSync(`./${parse(testFile).name}.json`, json);
console.log(`Converting to json took ${hrtime(time)} seconds!`);

time = hrtime();
swf.fromJSON(JSON.parse(json));
swf.saveAsset("./json_level.sc");
console.log(`Converting from json took ${hrtime(time)} seconds!`);