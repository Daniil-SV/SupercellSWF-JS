const os = require("os");
const fs = require("fs");
const path = require("path");

const manifest = require("../package.json");

const platform = os.platform();
const arch = os.arch();

const version = manifest.version;

const codename = `${platform}-${arch}`;
const prebuildPath = path.join(path.resolve(__dirname, "../"), "prebuilds");

const destPath = path.join(prebuildPath, codename);

const destModulePath = path.join(destPath, "node.napi.node");

if (!fs.existsSync(destPath)) {
  throw new Error("Native module folder not found!");
}

if (!fs.existsSync(destModulePath)) {
  throw new Error("Native module not found or compiled incorrectly!");
}

fs.writeFileSync(path.join(destPath, "version"), version);
