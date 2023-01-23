const { SupercellSWF } = require("../");
const print = console.log;

const unitFile = 'Files/debug.sc'
const swf = new SupercellSWF();

swf.load(unitFile);

print("SCSWF asset info: ");
// print(`Has extenal texture: ${swf.hasExternalTexture ? "Yes" : "No"}`);
print(`MultiRes texture postfix: ${swf.multiResTexturePostfix.length != 0 ? swf.multiResTexturePostfix.length : "None"}`);
print(`LowRes texture postfix: ${swf.lowResTexturePostfix.length != 0 ? swf.lowResTexturePostfix.length : "None"}`);

