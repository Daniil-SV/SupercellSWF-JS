const {
    SupercellSWF,
    CompressionSignature
} = require('../');
const {
    hrtime
} = require('process');
const util = require("util")
const print = console.log;
const unitFile = `${__dirname}/Files/debug.sc`;

// Timer
let time = hrtime();

const swf = new SupercellSWF()
    .load(unitFile);

console.log(`Loading took ${hrtime(time)} seconds!\n`);

print("SCSWF asset info: ");
print(`Compression: ${CompressionSignature[swf.compression]}`);
print(`Has external texture: ${swf.useExternalTexture ? "Yes" : "No"}`);
print(`MultiRes texture suffix: ${swf.multiResTextureSuffix.length != 0 ? swf.multiResTextureSuffix : "None"}`);
print(`LowRes texture suffix: ${swf.lowResTextureSuffix.length != 0 ? swf.lowResTextureSuffix : "None"}`);
print(`Exports (${swf.exports.length} items): `);

for (const exportName of swf.exports) {
    print(exportName);
}

print(`Shapes ${swf.shapes.length} items: `);
for (const shape of swf.shapes) {
    print(util.inspect(shape, false, 1));
}
