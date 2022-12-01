/// <reference types="node" />
import { CompressOptions } from './utils';
/**
 * Object interface for constructing new ScBuffer instances.
 */
interface ScBufferOptions {
    /**
     * Buffer Encoding to use for reading/writing strings if one is not provided.
     */
    encoding: BufferEncoding;
    /**
     * The initial size of the internal Buffer.
     */
    size: number;
    /**
     * Endianness in which Buffer will be read.
     */
    isLittleEndian: boolean;
    /**
     * If a Buffer is provided, this Buffer's value will be used as the internal Buffer.
     */
    buff: Buffer | Uint8Array | ScBuffer;
}
/**
 * List of all compression methods.
 */
export declare enum COMPRESSION {
    /**
     * Use only for debugging, the game will crash with this compression type.
     */
    NONE = 0,
    /**
     *  Slower but compresses better.
     */
    LZMA = 1,
    /**
     * Faster but file slightly larger.
     */
    FAST_LZMA = 2,
    /**
     * Zstd offers much faster decompression and stronger compression
     */
    ZSTD = 3
}
/**
 * Class for reading supercell binary files
 *
 * @category Main
 */
declare class ScBuffer {
    /**
     * Gets the current read offset value of the ScBuffer instance.
     */
    get readOffset(): number;
    /**
     * Sets the read offset value of the ScBuffer instance.
     *
     * @param offset - The offset value to set.
     */
    set readOffset(offset: number);
    /**
     * Gets the current write offset value of the ScBuffer instance.
     */
    get writeOffset(): number;
    /**
     * Sets the write offset value of the ScBuffer instance.
     *
     * @param offset The offset value to set.
     */
    set writeOffset(offset: number);
    /**
     * Gets the currently set string encoding of the ScBuffer instance.
     *
     * @return The string Buffer encoding currently set.
     */
    get encoding(): BufferEncoding;
    /**
     * Sets the string encoding of the ScBuffer instance.
     *
     * @param encoding The string Buffer encoding to set.
     */
    set encoding(encoding: BufferEncoding);
    /**
     * Gets the underlying internal Buffer. (This includes unmanaged data in the Buffer)
     *
     * @return The Buffer value.
     */
    get internalBuffer(): Buffer;
    length: number;
    isLittleEndian: boolean;
    private _encoding;
    private _buff;
    private _writeOffset;
    private _readOffset;
    /**
     * Creates a new ScBuffer instance.
     *
     * @param options The ScBufferOptions to apply to this instance.
     */
    constructor(options?: Partial<ScBufferOptions>);
    /**
     * Reads and decompresses Supercell compressed file buffer.
     *
     * @param buffer Comressed buffer
     * @param isSWF Indicates whether buffer is a .sc file
     *
     * @returns Array in format [Decompressed buffer, Compress method]
     *
     * @example // Csv file decompress
     * // File reading
     * let csv = fs.readFileSync('comressed_file.csv');
     * // Decompressing
     * let decompressedCsv = ScBuffer.fromCompressed(csv).buffer.toBuffer();
     */
    static fromCompressed(buffer: Buffer, isSWF?: boolean): CompressOptions;
    /**
     * Decompresses Supercell LZMA buffer.
     *
     * @param buffer Comressed LZMA buffer
     *
     * @returns Decompressed buffer
     */
    static lzmaDecompress(buffer: Buffer): ScBuffer;
    /**
     * Decompresses ZSTD buffer.
     *
     * @param buffer Comressed ZSTD buffer
     *
     * @returns Decompressed buffer
     */
    static zstdDecompress(buffer: Buffer): ScBuffer;
    /**
     * Creates a new ScBuffer instance with the provided internal Buffer size and optional encoding.
     *
     * @param size The size of the internal Buffer.
     * @param encoding The BufferEncoding to use for strings.
     *
     * @return { ScBuffer }
     */
    static fromSize(size: number, encoding?: BufferEncoding): ScBuffer;
    /**
     * Creates a new ScBuffer instance with the provided Buffer and optional encoding.
     *
     * @param buff The Buffer to use as the internal Buffer value.
     * @param encoding The BufferEncoding to use for strings.
     *
     * @return New ScBuffer insstance
     */
    static fromBuffer(buff: Buffer | Uint8Array | ScBuffer, encoding?: BufferEncoding): ScBuffer;
    /**
     * Type checking function that determines if an object is a ScBufferOptions object.
     */
    static isOptions(options: Partial<ScBufferOptions>): options is ScBufferOptions;
    /**
     * Compresses files with specified method.
     *
     * @param method Compression method
     * @param isSWF Indicates whether buffer is a .sc file
     *
     * @returns Compressed buffer
     *
     * * @example // Csv file decompress
     * // File reading
     * let csv = fs.readFileSync('file.csv');
     * // Compressing
     * let compressedCsv = ScBuffer.fromBuffer(csv).toCompressed(COMRESSION.LZMA);  //OR ScBuffer.fromBuffer(csv).lzmaCompress();
     */
    toCompressed(method: COMPRESSION, isSWF?: boolean): Buffer;
    /**
     * @param mode LZMA compressing mode (0 - LZMA FAST, 1 - LZMA NORMAL)
     *
     * @returns Compressed LZMA buffer
     */
    lzmaCompress(mode?: 0 | 1): Buffer;
    /**
     * @returns Compressed ZSTD buffer
     */
    zstdCompress(mode?: 0 | 1): Buffer;
    /**
     * Writes SC tag.
     *
     * @param tag Tag
     * @param buffer Tag buffer
     *
     * @returns Current ScBuffer instance
     */
    saveTag(tag: number, buffer?: ScBuffer | undefined): this;
    /**
     * Skips given number of bytes.
     *
     * @param length Bytes count to skip
     */
    skip(length: number): void;
    /**
     * Pads given number of bytes with zeros.
     *
     * @param length Number of padding bytes
     */
    fill(length: number): void;
    /**
     * Reads "twip".
     */
    readTwip(): number;
    /**
     * Writes "twip".
     *
     * @param {number} twip Twip number
     *
     * @returns Current ScBuffer instance
     */
    writeTwip(twip: number): ScBuffer;
    /**
     * Reads a sc string.
     */
    readASCII(): string | undefined;
    /**
     * Writes a sc string.
     *
     * @param string String to write
     *
     * @returns Current ScBuffer instance
     */
    writeASCII(string: string | undefined): ScBuffer;
    /**
     * Reads boolean.
     */
    readBoolean(): boolean;
    /**
     * Writes boolean.
     *
     * @param bool Boolean to write
     *
     * @returns Current ScBuffer instance
     */
    writeBoolean(bool: boolean): ScBuffer;
    /**
     * Reads an Int8 value from the current read position or an optionally provided offset.
     *
     * @param offset The offset to read data from
     */
    readInt8(offset?: number): number;
    /**
     * Reads an Int16BE value from the current read position or an optionally provided offset.
     *
     * @param offset The offset to read data from
     */
    readInt16BE(offset?: number): number;
    /**
     * Reads an Int16LE value from the current read position or an optionally provided offset.
     *
     * @param offset The offset to read data from
     */
    readInt16LE(offset?: number): number;
    /**
     * Reads an Int16 value with specified endianness from the current read position or an optionally provided offset.
     *
     * @param offset The offset to read data from
     */
    readInt16(offset?: number): number;
    /**
     * Reads an Int32BE value from the current read position or an optionally provided offset.
     *
     * @param offset The offset to read data from
     */
    readInt32BE(offset?: number): number;
    /**
     * Reads an Int32LE value from the current read position or an optionally provided offset.
     *
     * @param offset The offset to read data from
     */
    readInt32LE(offset?: number): number;
    /**
     * Reads an Int32 value with specified endianness from the current read position or an optionally provided offset.
     *
     * @param offset The offset to read data from
     */
    readInt32(offset?: number): number;
    /**
     * Writes an Int8 value to the current write position (or at optional offset).
     *
     * @param value The value to write
     * @param offset The offset to write the value at
     *
     * @return Current ScBuffer instance
     */
    writeInt8(value: number, offset?: number): ScBuffer;
    /**
     * Inserts an Int8 value at the given offset value.
     *
     * @param value The value to insert
     * @param offset The offset to insert the value at
     *
     * @return Current ScBuffer instance
     */
    insertInt8(value: number, offset: number): ScBuffer;
    /**
     * Writes an Int16BE value to the current write position (or at optional offset).
     *
     * @param value The value to write
     * @param offset The offset to write the value at
     *
     * @return Current ScBuffer instance
     */
    writeInt16BE(value: number, offset?: number): ScBuffer;
    /**
     * Inserts an Int16BE value at the given offset value.
     *
     * @param value The value to insert.
     * @param offset The offset to insert the value at.
     *
     * @return Current ScBuffer instance
     */
    insertInt16BE(value: number, offset: number): ScBuffer;
    /**
     * Writes an Int16LE value to the current write position (or at optional offset).
     *
     * @param value The value to write.
     * @param offset The offset to write the value at.
     *
     * @return Current ScBuffer instance
     */
    writeInt16LE(value: number, offset?: number): ScBuffer;
    /**
     * Inserts an Int16LE value at the given offset value.
     *
     * @param value The value to insert.
     * @param offset The offset to insert the value at.
     *
     * @return Current ScBuffer instance
     */
    insertInt16LE(value: number, offset: number): ScBuffer;
    /**
     * Inserts an Int16 value with specified endianness at the given offset value.
     *
     * @param value The value to insert.
     * @param offset The offset to insert the value at.
     *
     * @return Current ScBuffer instance
     */
    insertInt16(value: number, offset: number): ScBuffer;
    /**
     * Writes an Int16 value with specified endianness to the current write position (or at optional offset).
     *
     * @param value The value to write.
     * @param offset The offset to write the value at.
     *
     * @return Current ScBuffer instance
     */
    writeInt16(value: number, offset?: number): ScBuffer;
    /**
     * Writes an Int32BE value to the current write position (or at optional offset).
     *
     * @param value The value to write.
     * @param offset The offset to write the value at.
     *
     * @return Current ScBuffer instance
     */
    writeInt32BE(value: number, offset?: number): ScBuffer;
    /**
     * Inserts an Int32BE value at the given offset value.
     *
     * @param value The value to insert.
     * @param offset The offset to insert the value at.
     *
     * @return Current ScBuffer instance
     */
    insertInt32BE(value: number, offset: number): ScBuffer;
    /**
     * Writes an Int32LE value to the current write position (or at optional offset).
     *
     * @param value The value to write.
     * @param offset The offset to write the value at.
     *
     * @return Current ScBuffer instance
     */
    writeInt32LE(value: number, offset?: number): ScBuffer;
    /**
     * Inserts an Int32LE value at the given offset value.
     *
     * @param value The value to insert.
     * @param offset The offset to insert the value at.
     *
     * @return Current ScBuffer instance
     */
    insertInt32LE(value: number, offset: number): ScBuffer;
    /**
     * Inserts an Int32 value with specified endianness at the given offset value.
     *
     * @param value The value to insert
     * @param offset The offset to insert the value at
     *
     * @return Current ScBuffer instance
     */
    insertInt32(value: number, offset: number): ScBuffer;
    /**
     * Writes an Int32 value with specified endianness to the current write position (or at optional offset).
     *
     * @param value The value to write
     * @param offset The offset to write the value at
     *
     * @return Current ScBuffer instance
     */
    writeInt32(value: number, offset?: number): ScBuffer;
    /**
     * Reads an UInt8 value from the current read position or an optionally provided offset.
     *
     * @param offset The offset to read data from
     */
    readUInt8(offset?: number): number;
    /**
     * Reads an UInt16BE value from the current read position or an optionally provided offset.
     *
     * @param offset The offset to read data from
     */
    readUInt16BE(offset?: number): number;
    /**
     * Reads an UInt16LE value from the current read position or an optionally provided offset.
     *
     * @param offset The offset to read data from
     */
    readUInt16LE(offset?: number): number;
    /**
     * Reads an UInt16 value with specified endianness from the current read position or an optionally provided offset.
     *
     * @param offset The offset to read data from
     */
    readUInt16(offset?: number): number;
    /**
     * Reads an UInt32BE value from the current read position or an optionally provided offset.
     *
     * @param offset The offset to read data from
     */
    readUInt32BE(offset?: number): number;
    /**
     * Reads an UInt32LE value from the current read position or an optionally provided offset.
     *
     * @param offset The offset to read data from
     */
    readUInt32LE(offset?: number): number;
    /**
     * Reads an UInt32 value with specified endianness from the current read position or an optionally provided offset.
     *
     * @param offset The offset to read data from
     */
    readUInt32(offset?: number): number;
    /**
     * Writes an UInt8 value to the current write position (or at optional offset).
     *
     * @param value The value to write.
     * @param offset The offset to write the value at.
     *
     * @return Current ScBuffer instance
     */
    writeUInt8(value: number, offset?: number): ScBuffer;
    /**
     * Inserts an UInt8 value at the given offset value.
     *
     * @param value The value to insert.
     * @param offset The offset to insert the value at.
     *
     * @return Current ScBuffer instance
     */
    insertUInt8(value: number, offset: number): ScBuffer;
    /**
     * Writes an UInt16BE value to the current write position (or at optional offset).
     *
     * @param value The value to write.
     * @param offset The offset to write the value at.
     *
     * @return Current ScBuffer instance
     */
    writeUInt16BE(value: number, offset?: number): ScBuffer;
    /**
     * Inserts an UInt16BE value at the given offset value.
     *
     * @param value The value to insert.
     * @param offset The offset to insert the value at.
     *
     * @return Current ScBuffer instance
     */
    insertUInt16BE(value: number, offset: number): ScBuffer;
    /**
     * Writes an UInt16LE value to the current write position (or at optional offset).
     *
     * @param value The value to write.
     * @param offset The offset to write the value at.
     *
     * @return Current ScBuffer instance
     */
    writeUInt16LE(value: number, offset?: number): ScBuffer;
    /**
     * Inserts an UInt16LE value at the given offset value.
     *
     * @param value The value to insert.
     * @param offset The offset to insert the value at.
     *
     * @return Current ScBuffer instance
     */
    insertUInt16LE(value: number, offset: number): ScBuffer;
    /**
     * Inserts an UInt16 value with specified endianness at the given offset value.
     *
     * @param value The value to insert.
     * @param offset The offset to insert the value at.
     *
     * @return Current ScBuffer instance
     */
    insertUInt16(value: number, offset: number): ScBuffer;
    /**
     * Writes an UInt16 value with specified endianness to the current write position (or at optional offset).
     *
     * @param value The value to write.
     * @param offset The offset to write the value at.
     *
     * @return Current ScBuffer instance
     */
    writeUInt16(value: number, offset?: number): ScBuffer;
    /**
     * Writes an UInt32BE value to the current write position (or at optional offset).
     *
     * @param value The value to write.
     * @param offset The offset to write the value at.
     *
     * @return Current ScBuffer instance
     */
    writeUInt32BE(value: number, offset?: number): ScBuffer;
    /**
     * Inserts an UInt32BE value at the given offset value.
     *
     * @param value The value to insert.
     * @param offset The offset to insert the value at.
     *
     * @return Current ScBuffer instance
     */
    insertUInt32BE(value: number, offset: number): ScBuffer;
    /**
     * Writes an UInt32LE value to the current write position (or at optional offset).
     *
     * @param value The value to write.
     * @param offset The offset to write the value at.
     *
     * @return Current ScBuffer instance
     */
    writeUInt32LE(value: number, offset?: number): ScBuffer;
    /**
     * Inserts an UInt32LE value at the given offset value.
     *
     * @param value The value to insert.
     * @param offset The offset to insert the value at.
     *
     * @return Current ScBuffer instance
     */
    insertUInt32LE(value: number, offset: number): ScBuffer;
    /**
     * Inserts an UInt32 value with specified endianness at the given offset value.
     *
     * @param value The value to insert.
     * @param offset The offset to insert the value at.
     *
     * @return Current ScBuffer instance
     */
    insertUInt32(value: number, offset: number): ScBuffer;
    /**
     * Writes an UInt32 value with specified endianness to the current write position (or at optional offset).
     *
     * @param value The value to write.
     * @param offset The offset to write the value at.
     *
     * @return Current ScBuffer instance
     */
    writeUInt32(value: number, offset?: number): ScBuffer;
    /**
     * Reads an FloatBE value from the current read position or an optionally provided offset.
     *
     * @param offset The offset to read data from
     */
    readFloatBE(offset?: number): number;
    /**
     * Reads an FloatLE value from the current read position or an optionally provided offset.
     *
     * @param offset The offset to read data from
     */
    readFloatLE(offset?: number): number;
    /**
     * Reads an Float value with specified endianness from the current read position or an optionally provided offset.
     *
     * @param offset The offset to read data from
     */
    readFloat(offset?: number): number;
    /**
     * Writes a FloatBE value to the current write position (or at optional offset).
     *
     * @param value The value to write.
     * @param offset The offset to write the value at.
     *
     * @return Current ScBuffer instance
     */
    writeFloatBE(value: number, offset?: number): ScBuffer;
    /**
     * Inserts a FloatBE value at the given offset value.
     *
     * @param value The value to insert.
     * @param offset The offset to insert the value at.
     *
     * @return Current ScBuffer instance
     */
    insertFloatBE(value: number, offset: number): ScBuffer;
    /**
     * Writes a FloatLE value to the current write position (or at optional offset).
     *
     * @param value The value to write.
     * @param offset The offset to write the value at.
     *
     * @return Current ScBuffer instance
     */
    writeFloatLE(value: number, offset?: number): ScBuffer;
    /**
     * Inserts a FloatLE value at the given offset value.
     *
     * @param value The value to insert.
     * @param offset The offset to insert the value at.
     *
     * @return Current ScBuffer instance
     */
    insertFloatLE(value: number, offset: number): ScBuffer;
    /**
     * Writes a Float value with specified endianness to the current write position (or at optional offset).
     *
     * @param value The value to write.
     * @param offset The offset to write the value at.
     *
     * @return Current ScBuffer instance
     */
    writeFloat(value: number, offset?: number): ScBuffer;
    /**
     * Inserts a Float value with specified endianness at the given offset value.
     *
     * @param value The value to insert.
     * @param offset The offset to insert the value at.
     *
     * @return Current ScBuffer instance
     */
    insertFloat(value: number, offset: number): ScBuffer;
    /**
     * Reads a String from the current read position.
     *
     * @param length The number of bytes to read as a String
     * @param encoding The BufferEncoding to use for the string (Defaults to instance level encoding).
     */
    readString(length?: number, encoding?: BufferEncoding): string;
    /**
     * Inserts a String
     *
     * @param value The String value to insert.
     * @param offset The offset to insert the string at.
     * @param encoding The BufferEncoding to use for writing strings (defaults to instance encoding).
     *
     * @return Current ScBuffer instance
     */
    insertString(value: string, offset: number, encoding?: BufferEncoding): ScBuffer;
    /**
     * Writes a String
     *
     * @param value The String value to write.
     * @param offset The offset to write the string at, or the BufferEncoding to use.
     * @param encoding The BufferEncoding to use for writing strings (defaults to instance encoding).
     *
     * @return Current ScBuffer instance
     */
    writeString(value: string, offset?: number, encoding?: BufferEncoding): ScBuffer;
    /**
     * Reads a null-terminated String from the current read position.
     *
     * @param encoding The BufferEncoding to use for the string (Defaults to instance level encoding).
     */
    readStringNT(encoding?: BufferEncoding): string;
    /**
     * Inserts a null-terminated String.
     *
     * @param value The String value to write.
     * @param offset The offset to write the string to, or the BufferEncoding to use.
     * @param encoding The BufferEncoding to use for writing strings (defaults to instance encoding).
     *
     * @return Current ScBuffer instance
     */
    insertStringNT(value: string, offset: number, encoding?: BufferEncoding): ScBuffer;
    /**
     * Writes a null-terminated String.
     *
     * @param value The String value to write.
     * @param offset The offset to write the string to, or the BufferEncoding to use.
     * @param encoding The BufferEncoding to use for writing strings (defaults to instance encoding).
     *
     * @return Current ScBuffer instance
     */
    writeStringNT(value: string, offset?: number, encoding?: BufferEncoding): ScBuffer;
    /**
     * Reads a Buffer from the internal read position.
     *
     * @param length The length of data to read as a Buffer.
     */
    readBuffer(length?: number): Buffer;
    /**
     * Writes a Buffer to the current write position.
     *
     * @param value  The Buffer to write.
     * @param offset The offset to write the Buffer to.
     *
     * @return Current ScBuffer instance
     */
    insertBuffer(value: Buffer, offset: number): ScBuffer;
    /**
     * Writes a Buffer to the current write position.
     *
     * @param value  The Buffer to write.
     * @param offset The offset to write the Buffer to.
     *
     * @return Current ScBuffer instance
     */
    writeBuffer(value: Buffer, offset?: number): ScBuffer;
    /**
     * Reads a null-terminated Buffer from the current read poisiton.
     */
    readBufferNT(): Buffer;
    /**
     * Inserts a null-terminated Buffer.
     *
     * @param value  The Buffer to write.
     * @param offset The offset to write the Buffer to.
     *
     * @return Current ScBuffer instance
     */
    insertBufferNT(value: Buffer, offset: number): ScBuffer;
    /**
     * Writes a null-terminated Buffer.
     *
     * @param value  The Buffer to write.
     * @param offset The offset to write the Buffer to.
     *
     * @return Current ScBuffer instance
     */
    writeBufferNT(value: Buffer, offset?: number): ScBuffer;
    /**
     * Clears the ScBuffer instance to its original empty state.
     */
    clear(): ScBuffer;
    /**
     * Gets the remaining data left to be read from the ScBuffer instance.
     */
    remaining(): number;
    /**
     * Gets the value of the internal managed Buffer (Includes managed data only)
     */
    toBuffer(): Buffer;
    /**
     * Gets the String value of the internal managed Buffer
     *
     * @param encoding The BufferEncoding to display the Buffer as (defaults to instance level encoding).
     */
    toString(encoding?: BufferEncoding): string;
    /**
     * Handles inserting and writing strings.
     *
     * @param value The String value to insert.
     * @param isInsert True if inserting a string, false if writing.
     * @param arg2 The offset to insert the string at, or the BufferEncoding to use.
     * @param encoding The BufferEncoding to use for writing strings (defaults to instance encoding).
     */
    private _handleString;
    /**
     * Handles writing or insert of a Buffer.
     *
     * @param value  The Buffer to write.
     * @param offset The offset to write the Buffer to.
     */
    private _handleBuffer;
    /**
     * Ensures that the internal Buffer is large enough to read data.
     *
     * @param length The length of the data that needs to be read.
     * @param offset The offset of the data that needs to be read.
     */
    private ensureReadable;
    /**
     * Ensures that the internal Buffer is large enough to insert data.
     *
     * @param dataLength The length of the data that needs to be written.
     * @param offset The offset of the data to be written.
     */
    private ensureInsertable;
    /**
     * Ensures that the internal Buffer is large enough to write data.
     *
     * @param dataLength The length of the data that needs to be written.
     * @param offset The offset of the data to be written (defaults to writeOffset).
     */
    private _ensureWriteable;
    /**
     * Ensures that the internal Buffer is large enough to write at least the given amount of data.
     *
     * @param minLength The minimum length of the data needs to be written.
     */
    private _ensureCapacity;
    /**
     * Reads a numeric number value using the provided function.
     *
     * @typeparam The type of the value to be read
     *
     * @param func The function to read data on the internal Buffer with.
     * @param byteSize The number of bytes read.
     * @param offset The offset to read from. When this is not provided, the managed readOffset is used instead.
     *
     * @returns the number value
     */
    private _readNumberValue;
    /**
     * Inserts a numeric number value based on the given offset and value.
     *
     * @typeparam The type of the value to be written
     *
     * @param func The function to write data on the internal Buffer with.
     * @param byteSize The number of bytes written.
     * @param value The number value to write.
     * @param offset the offset to write the number at (REQUIRED).
     *
     * @returns Current ScBuffer instance
     */
    private _insertNumberValue;
    /**
     * Writes a numeric number value based on the given offset and value.
     *
     * @typeparam The type of the value to be written
     *
     * @param func The function to write data on the internal Buffer with.
     * @param byteSize The number of bytes written.
     * @param value The number value to write.
     * @param offset the offset to write the number at (REQUIRED).
     *
     * @returns Current ScBuffer instance
     */
    private _writeNumberValue;
}
export { ScBufferOptions, ScBuffer };
