"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const path = __importDefault(require("path"));
module.exports = require('node-gyp-build')(path.default.resolve(__dirname, "../"));

/* Some other stuff */

var CompressionSignature;
(function (CompressionSignature) {
    CompressionSignature[CompressionSignature["NONE"] = 0] = "NONE";
    CompressionSignature[CompressionSignature["LZMA"] = 1] = "LZMA";
    CompressionSignature[CompressionSignature["LZHAM"] = 2] = "LZHAM";
    CompressionSignature[CompressionSignature["ZSTD"] = 3] = "ZSTD";
})(CompressionSignature = module.exports.CompressionSignature || (module.exports.CompressionSignature = {}));