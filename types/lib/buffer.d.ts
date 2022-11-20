import { SmartBuffer } from 'smart-buffer';
/**
 * List of all compression methods.
*/
export declare enum COMPRESSION {
    /** Use only for debugging, the game will crash with this compression type */
    NONE = 0,
    /** slower but compresses better */
    LZMA = 1,
    /** faster but file slightly larger */
    FAST_LZMA = 2
}
/**
 * Buffer class with additional methods that are needed to read the .sc file
 */
export declare class ScBuffer extends SmartBuffer {
    /**
     * Writes files depending on selected compression.
     * @param {string} path Path to file to be written
     * @param {ScBuffer} buffer Binary buffer
     * @param {COMPRESSION} compressionMethod Compression method
     */
    static toSc(path: string, buffer: ScBuffer, compressionMethod: COMPRESSION): void;
    /**
     * Reads a file and decompresses it if necessary.
     * @param {string} path Path to file
     * @returns {ScBuffer}  Buffer with file ready to read
     */
    static fromSc(path: string): [ScBuffer, COMPRESSION.FAST_LZMA | COMPRESSION.LZMA | COMPRESSION.NONE];
    /**
     * Skips given number of bytes.
     * @param length Bytes count to skip
     */
    skip(length: number): void;
    /**
     * Pads given number of bytes with zeros.
     * @param length Number of padding bytes
     */
    fill(length: number): void;
    /**
     * Reads "twip".
     * @returns {number} Result twip
     */
    readTwip(): number;
    /**
     * Writes "twip".
     * @param {number} twip Twip number
     */
    writeTwip(twip: number): void;
    /**
     * Reads a sc string
     * @returns {string | undefined} String
     */
    readASCII(): string | undefined;
    /**
     * Writes a sc string
     * @param {string | undefined} string String to write
     */
    writeASCII(string: string | undefined): void;
    /**
     * Reads boolean
     * @returns {boolean} Boolean
     */
    readBoolean(): boolean;
    /**
     * Writes boolean
     * @param {boolean} bool Boolean to write
     */
    writeBoolean(bool: boolean): void;
    /**
     * Writes tag
     * @param {number} tag Tag
     * @param {ScBuffer} buffer Tag buffer
     */
    saveTag(tag: number, buffer?: ScBuffer | undefined): void;
}
