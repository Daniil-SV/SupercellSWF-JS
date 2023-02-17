const {SupercellSWF, CompressionSignature, Export} = require('../');
//const SC = require("../")
//print(SC.Export);
const print = console.log;
const unitFile = `${__dirname}/Files/debug.sc`;

const swf = new SupercellSWF();
swf.load(unitFile);

print("SCSWF asset info: ");
print(`Compression: ${CompressionSignature[swf.compression]}`);
print(`Has external texture: ${swf.useExternalTexture ? "Yes" : "No"}`);
print(`MultiRes texture suffix: ${swf.multiResTextureSuffix.length != 0 ? swf.multiResTextureSuffix : "None"}`);
print(`LowRes texture suffix: ${swf.lowResTextureSuffix.length != 0 ? swf.lowResTextureSuffix : "None"}`);
print(`Export count: ${swf.exports.length}`)
for (const exportName of swf.exports) {
    print(`Export name. Id: ${exportName.id}. Name: ${exportName.name}`);
}
