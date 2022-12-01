// loads texture file and saves them as png
const { writeFileSync } = require('fs');
const { SupercellSWF } = require('../');
const { hrtime } = require('process');
const { getAsset } = require('./utils')

const file = 'sc/ui_highres_tex.sc';

let time = hrtime();

console.log('Getting files from the server...');
getAsset(file);
console.log('Done!');

// Initializing and loading texture file to instance
let swf = new SupercellSWF()
    .loadExternalTexture(file);

console.log(`Reading took ${hrtime(time)} seconds!`);

// Loop through loaded textures
for (let i = 0; swf.textures.length > i; i++) {
    let texture = swf.textures[i];
    let textureBuffer = texture.image.toBuffer();
    writeFileSync(`./ui_tex${'_'.repeat(i)}.png`, textureBuffer);
}