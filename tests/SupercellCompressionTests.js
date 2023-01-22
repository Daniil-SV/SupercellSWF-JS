/* Import modules */
const fs = require('fs');
const path = require('path');
const SC = require('../');
const crypto = require('crypto');

/* Defines */
const print = console.log;

const unitFile = 'Files/debug.sc';
if (!fs.existsSync(unitFile)) {
    throw new Error("Unit file does not exist!")
}

const commonUnitFile = 'Files/testing.csv';
if (!fs.existsSync(commonUnitFile)) {
    throw new Error("Common unit file does not exist!")
}

const outputUnitFile = "Output/debug_decompressed.sc"
const outputCompressedUnitFile = "Output/debug_compressed.sc"
const outputCompressedBuferUnitFile = "Output/debug_compressed_buffer.sc"
const outputCompressedUnitFile_Props = "Output/debug_compressed_props.sc"

const outputCommonFile = "Output/testing_decompressed.csv"
const outputCompressedCommonFile = "Output/testing_compressed.csv"

const ScDecompressor = SC.SupercellCompression.Decompressor;
const ScCompressor = SC.SupercellCompression.Compressor;

/*
! Decompressor tests
*/

/* 
? Decompressing to file
*/
try {

    const cachePath = ScDecompressor.decompressFile(unitFile);
    print(`File decompressed to ${cachePath}.\n`)

} catch (err) {
    print("An error occurred while decompressing a file: ");
    print(err + '\n');
}


/* 
? Decompressing from buffer
*/
try {

    const fileBuffer = fs.readFileSync(unitFile);
    const decompressedBuffer = ScDecompressor.decompress(fileBuffer);
    fs.writeFileSync(outputUnitFile, decompressedBuffer);
    print(`File decompressed from buffer to ${path.resolve(outputUnitFile)}.\n`);

} catch (err) {
    print("An error occurred while decompressing a file from buffer: ");
    print(err + '\n');
}


/* 
? Common asset decompress
*/
try {

    const commonFileBuffer = fs.readFileSync(commonUnitFile);
    const decompressedCommon = ScDecompressor.commonDecompress(commonFileBuffer);
    fs.writeFileSync(outputCommonFile, decompressedCommon);
    print(`Common file decompressed to ${path.resolve(outputCommonFile)}.\n`);

} catch (err) {
    print("An error occurred while decompressing a common file: ");
    print(err + '\n');
}


/* 
? Getting info from .sc file header
*/
try {

    const fileBuffer = fs.readFileSync(unitFile);
    const header = ScDecompressor.getProps(fileBuffer);

    print("SCSWF compressed asset info:");
    print(`Id: ${header.id.toString('hex')}`);
    print(`Has metadata: ${header.metadata.length > 0 ? "Yes" : "No"}`);
    print(`Has hash: ${header.hash.length > 0 ? "Yes" : "No"}`);
    print(`Compression method: ${SC.CompressionSignature[header.signature]}\n`);

} catch (err) {
    console.log("An error occurred while getting info from buffer: ");
    console.log(err + '\n');
}

/* 
! Compressor Tests
*/

/* 
? Compressing to file
*/
try {

    ScCompressor.compressFile(outputUnitFile, outputCompressedUnitFile, SC.CompressionSignature.LZMA);
    console.log(`File compressed to ${path.resolve(outputCompressedUnitFile)}.\n`);

} catch (err) {
    console.log("An error occurred while compressing a file: ");
    console.log(err + '\n');
}


/* 
? Compressing from buffer
*/
try {

    const fileBuffer = fs.readFileSync(outputUnitFile);
    const compressedBuffer = ScCompressor.compress(fileBuffer, SC.CompressionSignature.LZMA);
    fs.writeFileSync(outputCompressedBuferUnitFile, compressedBuffer);
    print(`File compressed from buffer to ${path.resolve(outputCompressedBuferUnitFile)}.\n`);

} catch (err) {
    print("An error occurred while compressing a file from buffer");
    print(err + '\n');
}

/* 
? Compressing from buffer with using header props
*/
try {

    const fileBuffer = fs.readFileSync(outputUnitFile);
    const props = {
        id: crypto.randomBytes(16),
        metadata: Buffer.from("Made by SCW Make"),
        signature: SC.CompressionSignature.LZMA
    }

    print('Generated props: ');
    print(`Id: ${props.id.toString('hex')}`);
    print(`Compression method: ${SC.CompressionSignature[props.signature]}`);
    print(`Metadata: "${props.metadata.toString()}"`);

    const compressedBuffer = ScCompressor.compress(fileBuffer, props);
    fs.writeFileSync(outputCompressedUnitFile_Props, compressedBuffer);
    print(`File compressed with props to ${path.resolve(outputCompressedUnitFile_Props)}.\n`);

} catch (err) {
    print("An error occurred while compressing a file with props: ");
    print(err + '\n');
}

/* 
? Common asset compress
*/
try {

    const commonFileBuffer = fs.readFileSync(outputCommonFile);
    const compressedCommon = ScCompressor.commonCompress(commonFileBuffer, SC.CompressionSignature.LZMA);
    fs.writeFileSync(outputCompressedCommonFile, compressedCommon);
    print(`Common file compressed to ${path.resolve(outputCompressedCommonFile)}.\n`);

} catch (err) {
    print("An error occurred while compressing a common file: ");
    print(err + '\n');
}
