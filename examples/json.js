// Converts a file to json and vice versa
const { writeFileSync } = require('fs');
const { parse } = require('path');
const { SupercellSWF, COMPRESSION } = require('../');
const { hrtime } = require('process');
const { getAsset } = require('./utils');

const file = 'sc/level.sc';
const jsonFile = 'level.json';


console.log('Getting files from the server...');
getAsset(file);
console.log('Done!');

let time = process.hrtime();

// Initializing and loading file to instance
let swf = new SupercellSWF()
    .loadAsset(file);
console.log(`Loading took ${hrtime(time)} seconds!\n`);

time = hrtime();

// For large files, it is recommended to use external modules, otherwise JSON may throw an error that the strings are very large
let json = JSON.stringify(swf, null, 2);
writeFileSync(jsonFile, json);
console.log(`Converting to json took ${hrtime(time)} seconds!`);

time = hrtime();
swf.fromJSON(JSON.parse(json));
swf.saveAsset(parse(file).base);
console.log(`Converting from json took ${hrtime(time)} seconds!`);