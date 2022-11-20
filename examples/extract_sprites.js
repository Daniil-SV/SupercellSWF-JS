// Extracts all sprites from all shape objects in file
const { existsSync, mkdirSync, rmSync } = require("fs");
const { SupercellSWF, Shape } = require("../");
const { hrtime } = require("process");
const { getAsset } = require("./utils");

const file = 'sc/level.sc';
const textureFile = 'sc/level_tex.sc';
const out = './LevelSprites';

async function extract() {
    console.log('Getting files from the server...');
    await getAsset(file);
    await getAsset(textureFile);
    console.log('Done!');

    // Delete if already exists
    if (existsSync(out)) {
        rmSync(out, { recursive: true, force: true });
    };

    // Create a folder where all sprites will be saved
    mkdirSync(out);

    let time = process.hrtime();

    // Initializing and loading file to instance
    let swf = new SupercellSWF()
        .load(file);

    // Loop through SWF objects
    for (let id in swf.resources) {
        // Get object itself
        let instance = swf.resources[id];

        // Make sure it's a shape
        if (instance instanceof Shape) {
            // Loop through Shape bitmaps
            for (let i = 0; instance.bitmaps.length > i; i++) {
                // Get ShapeDrawCommand object
                let bitmap = instance.bitmaps[i];
                // Getting a picture. Nearest angle is enable in arguments to make sprites look better.
                let bitmapImage = bitmap.getImage(swf, true);
                // Saving to PNG
                bitmapImage.save(`${out}/Shape_${id}_bitmap_${i}.png`);
            }
        }
    }

    console.log(`Extracting took ${hrtime(time)} seconds!`);
}

extract();