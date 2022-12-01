//File loading/saving testing and how long it takes
const { SupercellSWF } = require('../');
const { hrtime } = require('process');
const { getAsset } = require('./utils');
const path = require('path');

const file = 'sc/ui.sc';
const textureFile = 'sc/ui_highres_tex.sc';

console.log('Getting files from the server...');
getAsset(file);
getAsset(textureFile);
console.log('Done!');

// Timer
let time = hrtime();

// Initializing and loading file to instance
let swf = new SupercellSWF()
    .load(file);

console.log(`Loading took ${hrtime(time)} seconds!\n`);

time = hrtime();

// File saving
swf.save(`./${path.parse(file).base}`);

console.log(`Saving took ${hrtime(time)} seconds!`);