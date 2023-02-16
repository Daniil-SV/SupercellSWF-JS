/* Import modules */
const fs = require('fs');
const path = require('path');
const SC = require('../');
const crypto = require('crypto');

/* Defines */
function print(msg, succes) {
    if (succes) {
        console.log(`\x1b[32m${msg}\x1b[0m`)
    } else {
        console.log(`\x1b[31m${msg}\x1b[0m`)
    }
}

const unitFile = `${__dirname}/Files/debug.sc`;
if (!fs.existsSync(unitFile)) {
    throw new Error("Unit file does not exist!")
}

const commonUnitFile = `${__dirname}/Files/testing.csv`;
if (!fs.existsSync(commonUnitFile)) {
    throw new Error("Common unit file does not exist!")
}

const outputUnitFile = `${__dirname}/Output/debug_decompressed.sc`
const outputCompressedUnitFile = `${__dirname}/Output/debug_compressed.sc`
const outputCompressedBuferUnitFile = `${__dirname}/Output/debug_compressed_buffer.sc`
const outputCompressedUnitFile_Props = `${__dirname}/Output/debug_compressed_props.sc`

const outputCommonFile = `${__dirname}/Output/testing_decompressed.csv`
const outputCompressedCommonFile = `${__dirname}/Output/testing_compressed.csv`

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
    print(`File decompressed to ${cachePath}.\n`, true);

} catch (err) {
    print("An error occurred while decompressing a file: ", false);
    console.log(err + '\n');
}


/* 
? Decompressing from buffer
*/
try {

    const fileBuffer = fs.readFileSync(unitFile);
    const decompressedBuffer = ScDecompressor.decompress(fileBuffer);
    fs.writeFileSync(outputUnitFile, decompressedBuffer);
    print(`File decompressed from buffer to ${path.resolve(outputUnitFile)}.\n`, true);

} catch (err) {
    print("An error occurred while decompressing a file from buffer: ", false);
    console.log(err + '\n');
}


/* 
? Common asset decompress
*/
try {

    const commonFileBuffer = fs.readFileSync(commonUnitFile);
    const decompressedCommon = ScDecompressor.commonDecompress(commonFileBuffer);
    fs.writeFileSync(outputCommonFile, decompressedCommon);
    print(`Common file decompressed to ${path.resolve(outputCommonFile)}.\n`, true);

} catch (err) {
    print("An error occurred while decompressing a common file: ", false);
    console.log(err + '\n');
}


/* 
? Getting info from .sc file header
*/
try {

    const fileBuffer = fs.readFileSync(unitFile);
    const header = ScDecompressor.getProps(fileBuffer);

    console.log("SCSWF compressed asset info:");
    console.log(`Id: ${header.id.toString('hex')}`);
    console.log(`Has metadata: ${header.metadata.length > 0 ? "Yes" : "No"}`);
    console.log(`Has sign: ${header.sign.length > 0 ? "Yes" : "No"}`);
    console.log(`Compression method: ${SC.CompressionSignature[header.signature]}\n`);

} catch (err) {
    print("An error occurred while getting info from buffer: ", false);
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
    print(`File compressed to ${path.resolve(outputCompressedUnitFile)}.\n`, true);

} catch (err) {
    print("An error occurred while compressing a file: ", false);
    console.log(err + '\n');
}


/* 
? Compressing from buffer
*/
try {

    const fileBuffer = fs.readFileSync(outputUnitFile);
    const compressedBuffer = ScCompressor.compress(fileBuffer, SC.CompressionSignature.LZMA);
    fs.writeFileSync(outputCompressedBuferUnitFile, compressedBuffer);
    print(`File compressed from buffer to ${path.resolve(outputCompressedBuferUnitFile)}.\n`, true);

} catch (err) {
    print("An error occurred while compressing a file from buffer: ", false);
    console.log(err + '\n');
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

    console.log('Generated props: ');
    console.log(`Id: ${props.id.toString('hex')}`);
    console.log(`Compression method: ${SC.CompressionSignature[props.signature]}`);
    console.log(`Metadata: "${props.metadata.toString()}"`);

    const compressedBuffer = ScCompressor.compress(fileBuffer, props);
    fs.writeFileSync(outputCompressedUnitFile_Props, compressedBuffer);
    print(`File compressed with props to ${path.resolve(outputCompressedUnitFile_Props)}.\n`, true);

} catch (err) {
    print("An error occurred while compressing a file with props: ", false);
    console.log(err + '\n');
}

/* 
? Common asset compress
*/
try {

    const commonFileBuffer = fs.readFileSync(outputCommonFile);
    //const compressedCommon = ScCompressor.commonCompress(commonFileBuffer, SC.CompressionSignature.LZMA);
    const compressedCommon = ScCompressor.compress(commonFileBuffer, {});
    fs.writeFileSync(outputCompressedCommonFile, compressedCommon);
    print(`Common file compressed to ${path.resolve(outputCompressedCommonFile)}.\n`, true);

} catch (err) {
    print("An error occurred while compressing a common file: ", false);
    console.log(err + '\n');
}
