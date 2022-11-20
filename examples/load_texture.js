// loads texture file and saves them as png
const { writeFileSync } = require("fs");
const { SupercellSWF } = require("../");
const { hrtime } = require('process');

const file = 'sc/ui_highres_tex.sc';

let timer = hrtime();

async function loadTexrure() {
    console.log('Getting files from the server...');
    await getAsset(file);
    console.log('Done!');

    // Initializing and loading texture file to instance
    let swf = new SupercellSWF()
        .loadExternalTexture(file);

    console.log(`Reading took ${hrtime(timer)} seconds!`);

    // Loop through loaded textures
    for (let i = 0; swf.textures.length > i; i++) {
        let texture = swf.textures[i];
        let textureBuffer = texture.image.toBuffer();
        writeFileSync(`./ui_tex${"_".repeat(i)}.png`, textureBuffer);
    }
}

loadTexrure();