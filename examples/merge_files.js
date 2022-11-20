// Shows how to merge multiple files

const { execSync } = require("child_process");
const { existsSync } = require("fs");
const { SupercellSWF, MovieClip, Shape, COMPRESSION } = require("../");

const firstFile = "./Assets/level.sc";
const secondFile = "./fish.sc";

// if test file is not found, run script that will create it
if (!existsSync(secondFile)) {
    execSync("node new_file.js");
}

// File loading
let baseSWF = new SupercellSWF().load(firstFile);
let secondSWF = new SupercellSWF().load(secondFile);
baseSWF.compression = COMPRESSION.FAST_LZMA;

let maxID = Math.max(...Object.keys(baseSWF.resources)) + 1;

//Resources
for (let resourceID in secondSWF.resources) {
    let resource = secondSWF.resources[resourceID];

    if (resource instanceof MovieClip) {
        for (let bind of resource.binds) {
            bind.id += maxID;
        }
        resource.bankIndex += baseSWF.banks.length;

    } else if (resource instanceof Shape) {
        for (let bitmap of resource.bitmaps) {
            bitmap.textureIndex += baseSWF.textures.length;
        }
    }

    baseSWF.resources[parseInt(resourceID) + maxID] = resource;
}

//Textures
for (let texture of secondSWF.textures) {
    baseSWF.textures.push(texture);
}

//Transforms
for (let bank of secondSWF.banks) {
    baseSWF.banks.push(bank);
}

//Exports
for (let exportName of secondSWF.exports.getExports()) {
    baseSWF.exports.addExport(secondSWF.exports.getExportId(exportName) + maxID, exportName);
}

baseSWF.save("./level.sc");
