//File loading/saving testing and how long it takes
const { SupercellSWF } = require('../');
const { hrtime } = require('process');

const file = 'ui.sc';

// Timer
let time = hrtime();

// Initializing and loading file to instance
let swf = new SupercellSWF()
    .load(`./Assets/${file}`);

console.log(`Loading took ${hrtime(time)} seconds!\n`);

time = hrtime();

// File saving
swf.save(`./${file}`);

console.log(`Saving took ${hrtime(time)} seconds!`);
