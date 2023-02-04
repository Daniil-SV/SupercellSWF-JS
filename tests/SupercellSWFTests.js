const { SupercellSWF, CompressionSignature } = require("../");
const print = console.log;

const unitFile = `${__dirname}/Files/debug.sc`;
const swf = new SupercellSWF();

swf.load(unitFile);

print("SCSWF asset info: ");
print(`Compression: ${CompressionSignature[swf.compression]}`);
print(`Has external texture: ${swf.hasExternalTexture ? "Yes" : "No"}`);
print(`MultiRes texture suffix: ${swf.multiResTextureSuffix.length != 0 ? swf.multiResTexturePostfix.length : "None"}`);
print(`LowRes texture suffix: ${swf.lowResTextureSuffix.length != 0 ? swf.lowResTexturePostfix.length : "None"}`);


