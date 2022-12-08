import {
	ERRORS, checkOffsetValue, checkLengthValue, checkTargetOffset,
	checkEncoding, isFiniteInteger
} from './utils';
import { createHash } from 'crypto';
import { CompressOptions } from './utils';
import * as lzma from './compression/lzma';
import * as zstd from './compression/zstd';

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
export enum COMPRESSION {
	/**
	 * Use only for debugging, the game will crash with this compression type.
	 */
	NONE,

	/**
	 *  Slower but compresses better.
	 */
	LZMA,

	/**
	 * Faster but file slightly larger.
	 */
	FAST_LZMA,

	/**
	 * Zstd offers much faster decompression and stronger compression
	 */
	ZSTD
}

/**
 * The default Buffer size if one is not provided.
 */
const DEFAULT_SIZE = 4096;

/**
 * The default string encoding to use for reading/writing strings.
 */
const DEFAULT_ENCODING: BufferEncoding = 'utf8';

/**
 * Class for reading supercell binary files
 *
 * @category Main
 */
class ScBuffer {

	/**
	 * Gets the current read offset value of the ScBuffer instance.
	 */
	get readOffset(): number {
		return this._readOffset;
	}

	/**
	 * Sets the read offset value of the ScBuffer instance.
	 *
	 * @param offset - The offset value to set.
	 */
	set readOffset(offset: number) {
		checkOffsetValue(offset);

		// Check for bounds.
		checkTargetOffset(offset, this);

		this._readOffset = offset;
	}

	/**
	 * Gets the current write offset value of the ScBuffer instance.
	 */
	get writeOffset(): number {
		return this._writeOffset;
	}

	/**
	 * Sets the write offset value of the ScBuffer instance.
	 *
	 * @param offset The offset value to set.
	 */
	set writeOffset(offset: number) {
		checkOffsetValue(offset);

		// Check for bounds.
		checkTargetOffset(offset, this);

		this._writeOffset = offset;
	}

	/**
	 * Gets the currently set string encoding of the ScBuffer instance.
	 *
	 * @return The string Buffer encoding currently set.
	 */
	get encoding() {
		return this._encoding;
	}

	/**
	 * Sets the string encoding of the ScBuffer instance.
	 *
	 * @param encoding The string Buffer encoding to set.
	 */
	set encoding(encoding: BufferEncoding) {
		checkEncoding(encoding);

		this._encoding = encoding;
	}

	/**
	 * Gets the underlying internal Buffer. (This includes unmanaged data in the Buffer)
	 *
	 * @return The Buffer value.
	 */
	get internalBuffer(): Buffer {
		return this._buff;
	}
	length = 0;
	isLittleEndian = true;

	private _encoding: BufferEncoding = DEFAULT_ENCODING;
	private _buff: Buffer;
	private _writeOffset = 0;
	private _readOffset = 0;

	/**
	 * Creates a new ScBuffer instance.
	 *
	 * @param options The ScBufferOptions to apply to this instance.
	 */
	constructor(options?: Partial<ScBufferOptions>) {
		if (ScBuffer.isOptions(options)) {
			// Checks for encoding
			if (options.encoding) {
				checkEncoding(options.encoding);
				this._encoding = options.encoding;
			}

			if (options.isLittleEndian !== undefined) {
				this.isLittleEndian = options.isLittleEndian;
			}

			// Checks for initial size length
			if (options.size) {
				if (isFiniteInteger(options.size) && options.size > 0) {
					this._buff = Buffer.allocUnsafe(options.size);
				} else {
					throw new Error(ERRORS.INVALID_BUFFER_SIZE);
				}
				// Check for initial Buffer
			} else if (options.buff) {
				if (Buffer.isBuffer(options.buff)) {
					this._buff = options.buff;
					this.length = options.buff.length;
				} else {
					throw new Error(ERRORS.INVALID_BUFFER);
				}
			} else {
				this._buff = Buffer.allocUnsafe(DEFAULT_SIZE);
			}
		} else {
			// If something was passed but it's not a ScBufferOptions object
			if (typeof options !== 'undefined') {
				throw new Error(ERRORS.INVALID_OBJECT);
			}

			// Otherwise default to sane options
			this._buff = Buffer.allocUnsafe(DEFAULT_SIZE);
		}
	}
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
	static fromCompressed(buffer: Buffer, isSWF = false): CompressOptions {
		const data = new ScBuffer({ buff: buffer });

		const compressionHeader = data.readUInt32BE();

		if (isSWF) {
			if (compressionHeader !== 0x53430000) { // If not "SC"
				data.readOffset = 0;
				return {
					buffer: ScBuffer.fromBuffer(buffer),
					method: COMPRESSION.NONE
				};
			}
		}

		switch (compressionHeader) {
			case 0x53430000: // SC header
				const fileVersion = data.readUInt16BE();

				let endOffset = data.length;
				let compression: number;
				if (fileVersion === 4) {
					compression = data.readUInt32BE();
					endOffset = data.internalBuffer.indexOf('START');
				}

				const hash = data.readString(data.readUInt32BE(), 'hex');
				return ScBuffer.fromCompressed(data.internalBuffer.slice(data.readOffset, endOffset));

			case 0x5E000004: // Fast and slow LZMA header
			case 0x5D000004:
				return {
					buffer: ScBuffer.lzmaDecompress(data.internalBuffer),
					method: compressionHeader === 0x5D000004 ? COMPRESSION.FAST_LZMA : COMPRESSION.LZMA
				};

			case 0x28B52FFD:
				return {
					buffer: ScBuffer.zstdDecompress(data.internalBuffer),
					method: COMPRESSION.ZSTD
				};

			default:
				data.clear();
				return {
					buffer: data,
					method: COMPRESSION.NONE
				};
		}
	}

	/**
	 * Decompresses Supercell LZMA buffer.
	 *
	 * @param buffer Comressed LZMA buffer
	 *
	 * @returns Decompressed buffer
	 */
	static lzmaDecompress(buffer: Buffer): ScBuffer {
		buffer = Buffer.concat([
			buffer.slice(0, 9),
			Buffer.alloc(4),
			buffer.slice(9, buffer.length)
		]);
		const decompressed = lzma.decompress(buffer);

		return new ScBuffer({ buff: decompressed, isLittleEndian: true });
	}

	/**
	 * Decompresses ZSTD buffer.
	 *
	 * @param buffer Comressed ZSTD buffer
	 *
	 * @returns Decompressed buffer
	 */
	static zstdDecompress(buffer: Buffer): ScBuffer {
		const data = zstd.decompress(buffer);
		return new ScBuffer({ buff: data, isLittleEndian: true });
	}

	/**
	 * Creates a new ScBuffer instance with the provided internal Buffer size and optional encoding.
	 *
	 * @param size The size of the internal Buffer.
	 * @param encoding The BufferEncoding to use for strings.
	 *
	 * @return { ScBuffer }
	 */
	public static fromSize(size: number, encoding?: BufferEncoding): ScBuffer {
		return new this({
			size: size,
			encoding: encoding
		});
	}

	/**
	 * Creates a new ScBuffer instance with the provided Buffer and optional encoding.
	 *
	 * @param buff The Buffer to use as the internal Buffer value.
	 * @param encoding The BufferEncoding to use for strings.
	 *
	 * @return New ScBuffer insstance
	 */
	public static fromBuffer(buff: Buffer | Uint8Array | ScBuffer, encoding?: BufferEncoding): ScBuffer {
		if (buff instanceof ScBuffer) {
			return new ScBuffer({ buff: buff.internalBuffer, encoding: buff.encoding, isLittleEndian: buff.isLittleEndian });
		} else {
			return new this({
				buff: Buffer.from(buff),
				encoding: encoding
			});
		}
	}

	/**
	 * Type checking function that determines if an object is a ScBufferOptions object.
	 */
	static isOptions(options: Partial<ScBufferOptions>): options is ScBufferOptions {
		const castOptions = <ScBufferOptions>options;

		return (
			castOptions &&
			(castOptions.encoding !== undefined || castOptions.size !== undefined || castOptions.buff !== undefined)
		);
	}

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
	toCompressed(method: COMPRESSION, isSWF = false): Buffer {
		if (method === COMPRESSION.NONE) {
			return this.toBuffer();
		}

		let compressedData: Buffer;
		switch (method) {
			case COMPRESSION.LZMA:
			case COMPRESSION.FAST_LZMA:
				compressedData = this.lzmaCompress(method === COMPRESSION.LZMA ? 1 : 0);
				break;

			case COMPRESSION.ZSTD:
				compressedData = this.zstdCompress();
				break;
		}

		if (isSWF) {
			const header = new ScBuffer({ buff: Buffer.alloc(0), isLittleEndian: false });
			header.writeInt32(0x53430000); // SC header
			header.writeUInt16(1); // Header version: 1
			const hash = createHash('MD5').update(this.internalBuffer).digest();
			header.writeUInt32(hash.byteLength);
			header.writeBuffer(hash);

			return Buffer.concat([header.toBuffer(), compressedData]);
		}

		return compressedData;
	}

	/**
	 * @param mode LZMA compressing mode (0 - LZMA FAST, 1 - LZMA NORMAL)
	 *
	 * @returns Compressed LZMA buffer
	 */
	lzmaCompress(mode: 0 | 1 = 1): Buffer {
		let compressed = lzma.compress(this.internalBuffer, mode);

		const bufferLength = Buffer.alloc(4);
		bufferLength.writeUint32LE(this.length);

		compressed = Buffer.concat([
			compressed.slice(0, 5),
			bufferLength,
			compressed.slice(13, compressed.length)
		]);
		return compressed;
	}

	/**
	 * @returns Compressed ZSTD buffer
	 */
	zstdCompress(mode: 0 | 1 = 1): Buffer {
		return zstd.compress(this.internalBuffer, mode);
	}

	// Other

	/**
	 * Writes SC tag.
	 *
	 * @param tag Tag
	 * @param buffer Tag buffer
	 *
	 * @returns Current ScBuffer instance
	 */
	saveTag(tag: number, buffer: ScBuffer | undefined = undefined) {
		this.writeUInt8(tag);
		this.writeUInt32LE(buffer ? buffer.length : 0);

		if (buffer) {
			this.writeBuffer(buffer.toBuffer());
		}
		return this;
	}

	/**
	 * Skips given number of bytes.
	 *
	 * @param length Bytes count to skip
	 */
	skip(length: number): void {
		if (this.readOffset + length > this.length) {
			throw new Error(`Position out of bound, the buffer max position is ${this.length === 0 ? 0 : this.length - 1}, got ${this.length + length}`);
		}

		this.readOffset += length;
	}

	/**
	 * Pads given number of bytes with zeros.
	 *
	 * @param length Number of padding bytes
	 */
	fill(length: number): void {
		this.writeBuffer(Buffer.alloc(length));
	}

	/**
	 * Reads "twip".
	 */
	readTwip(): number {
		return this.readInt32() / 20;
	}

	/**
	 * Writes "twip".
	 *
	 * @param {number} twip Twip number
	 *
	 * @returns Current ScBuffer instance
	 */
	writeTwip(twip: number): ScBuffer {
		this.writeInt32(twip * 20);
		return this;
	}

	/**
	 * Reads a sc string.
	 */
	readASCII(): string | undefined {
		const stringLength = this.readUInt8();

		if (stringLength === 0xFF) {
			return undefined;
		}

		return this.readString(stringLength, 'ascii');
	}

	/**
	 * Writes a sc string.
	 *
	 * @param string String to write
	 *
	 * @returns Current ScBuffer instance
	 */
	writeASCII(string: string | undefined): ScBuffer {
		if (string && string.length < 255) {
			this.writeUInt8(string.length);
			this.writeString(string, undefined, 'ascii');
		} else {
			this.writeUInt8(0xFF);
		}
		return this;
	}

	/**
	 * Reads boolean.
	 */
	readBoolean(): boolean {
		return this.readUInt8() === 1;
	}

	/**
	 * Writes boolean.
	 *
	 * @param bool Boolean to write
	 *
	 * @returns Current ScBuffer instance
	 */
	writeBoolean(bool: boolean): ScBuffer {
		this.writeUInt8(bool ? 1 : 0);
		return this;
	}

	// Signed integers

	/**
	 * Reads an Int8 value from the current read position or an optionally provided offset.
	 *
	 * @param offset The offset to read data from
	 */
	readInt8(offset?: number): number {
		return this._readNumberValue(Buffer.prototype.readInt8, 1, offset);
	}

	/**
	 * Reads an Int16BE value from the current read position or an optionally provided offset.
	 *
	 * @param offset The offset to read data from
	 */
	readInt16BE(offset?: number): number {
		return this._readNumberValue(Buffer.prototype.readInt16BE, 2, offset);
	}

	/**
	 * Reads an Int16LE value from the current read position or an optionally provided offset.
	 *
	 * @param offset The offset to read data from
	 */
	readInt16LE(offset?: number): number {
		return this._readNumberValue(Buffer.prototype.readInt16LE, 2, offset);
	}

	/**
	 * Reads an Int16 value with specified endianness from the current read position or an optionally provided offset.
	 *
	 * @param offset The offset to read data from
	 */
	readInt16(offset?: number): number {
		return this.isLittleEndian ? this.readInt16LE(offset) : this.readInt16BE(offset);
	}

	/**
	 * Reads an Int32BE value from the current read position or an optionally provided offset.
	 *
	 * @param offset The offset to read data from
	 */
	readInt32BE(offset?: number): number {
		return this._readNumberValue(Buffer.prototype.readInt32BE, 4, offset);
	}

	/**
	 * Reads an Int32LE value from the current read position or an optionally provided offset.
	 *
	 * @param offset The offset to read data from
	 */
	readInt32LE(offset?: number): number {
		return this._readNumberValue(Buffer.prototype.readInt32LE, 4, offset);
	}

	/**
	 * Reads an Int32 value with specified endianness from the current read position or an optionally provided offset.
	 *
	 * @param offset The offset to read data from
	 */
	readInt32(offset?: number): number {
		return this.isLittleEndian ? this.readInt32LE(offset) : this.readInt32BE(offset);
	}

	/**
	 * Writes an Int8 value to the current write position (or at optional offset).
	 *
	 * @param value The value to write
	 * @param offset The offset to write the value at
	 *
	 * @return Current ScBuffer instance
	 */
	writeInt8(value: number, offset?: number): ScBuffer {
		this._writeNumberValue(Buffer.prototype.writeInt8, 1, value, offset);
		return this;
	}

	/**
	 * Inserts an Int8 value at the given offset value.
	 *
	 * @param value The value to insert
	 * @param offset The offset to insert the value at
	 *
	 * @return Current ScBuffer instance
	 */
	insertInt8(value: number, offset: number): ScBuffer {
		return this._insertNumberValue(Buffer.prototype.writeInt8, 1, value, offset);
	}

	/**
	 * Writes an Int16BE value to the current write position (or at optional offset).
	 *
	 * @param value The value to write
	 * @param offset The offset to write the value at
	 *
	 * @return Current ScBuffer instance
	 */
	writeInt16BE(value: number, offset?: number): ScBuffer {
		return this._writeNumberValue(Buffer.prototype.writeInt16BE, 2, value, offset);
	}

	/**
	 * Inserts an Int16BE value at the given offset value.
	 *
	 * @param value The value to insert.
	 * @param offset The offset to insert the value at.
	 *
	 * @return Current ScBuffer instance
	 */
	insertInt16BE(value: number, offset: number): ScBuffer {
		return this._insertNumberValue(Buffer.prototype.writeInt16BE, 2, value, offset);
	}

	/**
	 * Writes an Int16LE value to the current write position (or at optional offset).
	 *
	 * @param value The value to write.
	 * @param offset The offset to write the value at.
	 *
	 * @return Current ScBuffer instance
	 */
	writeInt16LE(value: number, offset?: number): ScBuffer {
		return this._writeNumberValue(Buffer.prototype.writeInt16LE, 2, value, offset);
	}

	/**
	 * Inserts an Int16LE value at the given offset value.
	 *
	 * @param value The value to insert.
	 * @param offset The offset to insert the value at.
	 *
	 * @return Current ScBuffer instance
	 */
	insertInt16LE(value: number, offset: number): ScBuffer {
		return this._insertNumberValue(Buffer.prototype.writeInt16LE, 2, value, offset);
	}

	/**
	 * Inserts an Int16 value with specified endianness at the given offset value.
	 *
	 * @param value The value to insert.
	 * @param offset The offset to insert the value at.
	 *
	 * @return Current ScBuffer instance
	 */
	insertInt16(value: number, offset: number): ScBuffer {
		return this.isLittleEndian ? this.insertInt16LE(value, offset) : this.insertInt16BE(value, offset);
	}

	/**
	 * Writes an Int16 value with specified endianness to the current write position (or at optional offset).
	 *
	 * @param value The value to write.
	 * @param offset The offset to write the value at.
	 *
	 * @return Current ScBuffer instance
	 */
	writeInt16(value: number, offset?: number): ScBuffer {
		return this.isLittleEndian ? this.writeInt16LE(value, offset) : this.writeInt16BE(value, offset);
	}

	/**
	 * Writes an Int32BE value to the current write position (or at optional offset).
	 *
	 * @param value The value to write.
	 * @param offset The offset to write the value at.
	 *
	 * @return Current ScBuffer instance
	 */
	writeInt32BE(value: number, offset?: number): ScBuffer {
		return this._writeNumberValue(Buffer.prototype.writeInt32BE, 4, value, offset);
	}

	/**
	 * Inserts an Int32BE value at the given offset value.
	 *
	 * @param value The value to insert.
	 * @param offset The offset to insert the value at.
	 *
	 * @return Current ScBuffer instance
	 */
	insertInt32BE(value: number, offset: number): ScBuffer {
		return this._insertNumberValue(Buffer.prototype.writeInt32BE, 4, value, offset);
	}

	/**
	 * Writes an Int32LE value to the current write position (or at optional offset).
	 *
	 * @param value The value to write.
	 * @param offset The offset to write the value at.
	 *
	 * @return Current ScBuffer instance
	 */
	writeInt32LE(value: number, offset?: number): ScBuffer {
		return this._writeNumberValue(Buffer.prototype.writeInt32LE, 4, value, offset);
	}

	/**
	 * Inserts an Int32LE value at the given offset value.
	 *
	 * @param value The value to insert.
	 * @param offset The offset to insert the value at.
	 *
	 * @return Current ScBuffer instance
	 */
	insertInt32LE(value: number, offset: number): ScBuffer {
		return this._insertNumberValue(Buffer.prototype.writeInt32LE, 4, value, offset);
	}

	/**
	 * Inserts an Int32 value with specified endianness at the given offset value.
	 *
	 * @param value The value to insert
	 * @param offset The offset to insert the value at
	 *
	 * @return Current ScBuffer instance
	 */
	insertInt32(value: number, offset: number): ScBuffer {
		return this.isLittleEndian ? this.insertInt32LE(value, offset) : this.insertInt32BE(value, offset);
	}

	/**
	 * Writes an Int32 value with specified endianness to the current write position (or at optional offset).
	 *
	 * @param value The value to write
	 * @param offset The offset to write the value at
	 *
	 * @return Current ScBuffer instance
	 */
	writeInt32(value: number, offset?: number): ScBuffer {
		return this.isLittleEndian ? this.writeInt32LE(value, offset) : this.writeInt32BE(value, offset);
	}

	// Unsigned Integers

	/**
	 * Reads an UInt8 value from the current read position or an optionally provided offset.
	 *
	 * @param offset The offset to read data from
	 */
	readUInt8(offset?: number): number {
		return this._readNumberValue(Buffer.prototype.readUInt8, 1, offset);
	}

	/**
	 * Reads an UInt16BE value from the current read position or an optionally provided offset.
	 *
	 * @param offset The offset to read data from
	 */
	readUInt16BE(offset?: number): number {
		return this._readNumberValue(Buffer.prototype.readUInt16BE, 2, offset);
	}

	/**
	 * Reads an UInt16LE value from the current read position or an optionally provided offset.
	 *
	 * @param offset The offset to read data from
	 */
	readUInt16LE(offset?: number): number {
		return this._readNumberValue(Buffer.prototype.readUInt16LE, 2, offset);
	}

	/**
	 * Reads an UInt16 value with specified endianness from the current read position or an optionally provided offset.
	 *
	 * @param offset The offset to read data from
	 */
	readUInt16(offset?: number): number {
		return this.isLittleEndian ? this.readUInt16LE(offset) : this.readUInt16BE(offset);
	}

	/**
	 * Reads an UInt32BE value from the current read position or an optionally provided offset.
	 *
	 * @param offset The offset to read data from
	 */
	readUInt32BE(offset?: number): number {
		return this._readNumberValue(Buffer.prototype.readUInt32BE, 4, offset);
	}

	/**
	 * Reads an UInt32LE value from the current read position or an optionally provided offset.
	 *
	 * @param offset The offset to read data from
	 */
	readUInt32LE(offset?: number): number {
		return this._readNumberValue(Buffer.prototype.readUInt32LE, 4, offset);
	}

	/**
	 * Reads an UInt32 value with specified endianness from the current read position or an optionally provided offset.
	 *
	 * @param offset The offset to read data from
	 */
	readUInt32(offset?: number): number {
		return this.isLittleEndian ? this.readUInt32LE(offset) : this.readUInt32BE(offset);
	}

	/**
	 * Writes an UInt8 value to the current write position (or at optional offset).
	 *
	 * @param value The value to write.
	 * @param offset The offset to write the value at.
	 *
	 * @return Current ScBuffer instance
	 */
	writeUInt8(value: number, offset?: number): ScBuffer {
		return this._writeNumberValue(Buffer.prototype.writeUInt8, 1, value, offset);
	}

	/**
	 * Inserts an UInt8 value at the given offset value.
	 *
	 * @param value The value to insert.
	 * @param offset The offset to insert the value at.
	 *
	 * @return Current ScBuffer instance
	 */
	insertUInt8(value: number, offset: number): ScBuffer {
		return this._insertNumberValue(Buffer.prototype.writeUInt8, 1, value, offset);
	}

	/**
	 * Writes an UInt16BE value to the current write position (or at optional offset).
	 *
	 * @param value The value to write.
	 * @param offset The offset to write the value at.
	 *
	 * @return Current ScBuffer instance
	 */
	writeUInt16BE(value: number, offset?: number): ScBuffer {
		return this._writeNumberValue(Buffer.prototype.writeUInt16BE, 2, value, offset);
	}

	/**
	 * Inserts an UInt16BE value at the given offset value.
	 *
	 * @param value The value to insert.
	 * @param offset The offset to insert the value at.
	 *
	 * @return Current ScBuffer instance
	 */
	insertUInt16BE(value: number, offset: number): ScBuffer {
		return this._insertNumberValue(Buffer.prototype.writeUInt16BE, 2, value, offset);
	}

	/**
	 * Writes an UInt16LE value to the current write position (or at optional offset).
	 *
	 * @param value The value to write.
	 * @param offset The offset to write the value at.
	 *
	 * @return Current ScBuffer instance
	 */
	writeUInt16LE(value: number, offset?: number): ScBuffer {
		return this._writeNumberValue(Buffer.prototype.writeUInt16LE, 2, value, offset);
	}

	/**
	 * Inserts an UInt16LE value at the given offset value.
	 *
	 * @param value The value to insert.
	 * @param offset The offset to insert the value at.
	 *
	 * @return Current ScBuffer instance
	 */
	insertUInt16LE(value: number, offset: number): ScBuffer {
		return this._insertNumberValue(Buffer.prototype.writeUInt16LE, 2, value, offset);
	}

	/**
	 * Inserts an UInt16 value with specified endianness at the given offset value.
	 *
	 * @param value The value to insert.
	 * @param offset The offset to insert the value at.
	 *
	 * @return Current ScBuffer instance
	 */
	insertUInt16(value: number, offset: number): ScBuffer {
		return this.isLittleEndian ? this.insertUInt16LE(value, offset) : this.insertUInt16BE(value, offset);
	}

	/**
	 * Writes an UInt16 value with specified endianness to the current write position (or at optional offset).
	 *
	 * @param value The value to write.
	 * @param offset The offset to write the value at.
	 *
	 * @return Current ScBuffer instance
	 */
	writeUInt16(value: number, offset?: number): ScBuffer {
		return this.isLittleEndian ? this.writeUInt16LE(value, offset) : this.writeUInt16BE(value, offset);
	}

	/**
	 * Writes an UInt32BE value to the current write position (or at optional offset).
	 *
	 * @param value The value to write.
	 * @param offset The offset to write the value at.
	 *
	 * @return Current ScBuffer instance
	 */
	writeUInt32BE(value: number, offset?: number): ScBuffer {
		return this._writeNumberValue(Buffer.prototype.writeUInt32BE, 4, value, offset);
	}

	/**
	 * Inserts an UInt32BE value at the given offset value.
	 *
	 * @param value The value to insert.
	 * @param offset The offset to insert the value at.
	 *
	 * @return Current ScBuffer instance
	 */
	insertUInt32BE(value: number, offset: number): ScBuffer {
		return this._insertNumberValue(Buffer.prototype.writeUInt32BE, 4, value, offset);
	}

	/**
	 * Writes an UInt32LE value to the current write position (or at optional offset).
	 *
	 * @param value The value to write.
	 * @param offset The offset to write the value at.
	 *
	 * @return Current ScBuffer instance
	 */
	writeUInt32LE(value: number, offset?: number): ScBuffer {
		return this._writeNumberValue(Buffer.prototype.writeUInt32LE, 4, value, offset);
	}

	/**
	 * Inserts an UInt32LE value at the given offset value.
	 *
	 * @param value The value to insert.
	 * @param offset The offset to insert the value at.
	 *
	 * @return Current ScBuffer instance
	 */
	insertUInt32LE(value: number, offset: number): ScBuffer {
		return this._insertNumberValue(Buffer.prototype.writeUInt32LE, 4, value, offset);
	}

	/**
	 * Inserts an UInt32 value with specified endianness at the given offset value.
	 *
	 * @param value The value to insert.
	 * @param offset The offset to insert the value at.
	 *
	 * @return Current ScBuffer instance
	 */
	insertUInt32(value: number, offset: number): ScBuffer {
		return this.isLittleEndian ? this.insertUInt32LE(value, offset) : this.insertUInt32BE(value, offset);
	}

	/**
	 * Writes an UInt32 value with specified endianness to the current write position (or at optional offset).
	 *
	 * @param value The value to write.
	 * @param offset The offset to write the value at.
	 *
	 * @return Current ScBuffer instance
	 */
	writeUInt32(value: number, offset?: number): ScBuffer {
		return this.isLittleEndian ? this.writeUInt32LE(value, offset) : this.writeUInt32BE(value, offset);
	}

	// Floating Point

	/**
	 * Reads an FloatBE value from the current read position or an optionally provided offset.
	 *
	 * @param offset The offset to read data from
	 */
	readFloatBE(offset?: number): number {
		return this._readNumberValue(Buffer.prototype.readFloatBE, 4, offset);
	}

	/**
	 * Reads an FloatLE value from the current read position or an optionally provided offset.
	 *
	 * @param offset The offset to read data from
	 */
	readFloatLE(offset?: number): number {
		return this._readNumberValue(Buffer.prototype.readFloatLE, 4, offset);
	}

	/**
	 * Reads an Float value with specified endianness from the current read position or an optionally provided offset.
	 *
	 * @param offset The offset to read data from
	 */
	readFloat(offset?: number): number {
		return this.isLittleEndian ? this.readFloatLE(offset) : this.readFloatBE(offset);
	}

	/**
	 * Writes a FloatBE value to the current write position (or at optional offset).
	 *
	 * @param value The value to write.
	 * @param offset The offset to write the value at.
	 *
	 * @return Current ScBuffer instance
	 */
	writeFloatBE(value: number, offset?: number): ScBuffer {
		return this._writeNumberValue(Buffer.prototype.writeFloatBE, 4, value, offset);
	}

	/**
	 * Inserts a FloatBE value at the given offset value.
	 *
	 * @param value The value to insert.
	 * @param offset The offset to insert the value at.
	 *
	 * @return Current ScBuffer instance
	 */
	insertFloatBE(value: number, offset: number): ScBuffer {
		return this._insertNumberValue(Buffer.prototype.writeFloatBE, 4, value, offset);
	}

	/**
	 * Writes a FloatLE value to the current write position (or at optional offset).
	 *
	 * @param value The value to write.
	 * @param offset The offset to write the value at.
	 *
	 * @return Current ScBuffer instance
	 */
	writeFloatLE(value: number, offset?: number): ScBuffer {
		return this._writeNumberValue(Buffer.prototype.writeFloatLE, 4, value, offset);
	}

	/**
	 * Inserts a FloatLE value at the given offset value.
	 *
	 * @param value The value to insert.
	 * @param offset The offset to insert the value at.
	 *
	 * @return Current ScBuffer instance
	 */
	insertFloatLE(value: number, offset: number): ScBuffer {
		return this._insertNumberValue(Buffer.prototype.writeFloatLE, 4, value, offset);
	}

	/**
	 * Writes a Float value with specified endianness to the current write position (or at optional offset).
	 *
	 * @param value The value to write.
	 * @param offset The offset to write the value at.
	 *
	 * @return Current ScBuffer instance
	 */
	writeFloat(value: number, offset?: number): ScBuffer {
		return this.isLittleEndian ? this.writeFloatLE(value, offset) : this.writeFloatBE(value, offset);
	}

	/**
	 * Inserts a Float value with specified endianness at the given offset value.
	 *
	 * @param value The value to insert.
	 * @param offset The offset to insert the value at.
	 *
	 * @return Current ScBuffer instance
	 */
	insertFloat(value: number, offset: number): ScBuffer {
		return this.isLittleEndian ? this.insertFloatLE(value, offset) : this.insertFloatBE(value, offset);
	}

	// Strings

	/**
	 * Reads a String from the current read position.
	 *
	 * @param length The number of bytes to read as a String
	 * @param encoding The BufferEncoding to use for the string (Defaults to instance level encoding).
	 */
	readString(length?: number, encoding?: BufferEncoding): string {
		let lengthVal;

		// Length provided
		if (length) {
			checkLengthValue(length);
			lengthVal = Math.min(length, this.length - this._readOffset);
		} else {
			lengthVal = this.length - this._readOffset;
		}

		// Check encoding
		if (typeof encoding !== 'undefined') {
			checkEncoding(encoding);
		}

		const value = this._buff.slice(this._readOffset, this._readOffset + lengthVal).toString(encoding || this._encoding);

		this._readOffset += lengthVal;
		return value;
	}

	/**
	 * Inserts a String
	 *
	 * @param value The String value to insert.
	 * @param offset The offset to insert the string at.
	 * @param encoding The BufferEncoding to use for writing strings (defaults to instance encoding).
	 *
	 * @return Current ScBuffer instance
	 */
	insertString(value: string, offset: number, encoding?: BufferEncoding): ScBuffer {
		checkOffsetValue(offset);

		return this._handleString(value, true, offset, encoding);
	}

	/**
	 * Writes a String
	 *
	 * @param value The String value to write.
	 * @param offset The offset to write the string at, or the BufferEncoding to use.
	 * @param encoding The BufferEncoding to use for writing strings (defaults to instance encoding).
	 *
	 * @return Current ScBuffer instance
	 */
	writeString(value: string, offset?: number, encoding?: BufferEncoding): ScBuffer {
		return this._handleString(value, false, offset, encoding);
	}

	/**
	 * Reads a null-terminated String from the current read position.
	 *
	 * @param encoding The BufferEncoding to use for the string (Defaults to instance level encoding).
	 */
	readStringNT(encoding?: BufferEncoding): string {
		if (typeof encoding !== 'undefined') {
			checkEncoding(encoding);
		}

		// Set null character position to the end ScBuffer instance.
		let nullPos = this.length;

		// Find next null character (if one is not found, default from above is used)
		for (let i = this._readOffset; i < this.length; i++) {
			if (this._buff[i] === 0x00) {
				nullPos = i;
				break;
			}
		}

		// Read string value
		const value = this._buff.slice(this._readOffset, nullPos);

		// Increment internal Buffer read offset
		this._readOffset = nullPos + 1;

		return value.toString(encoding || this._encoding);
	}

	/**
	 * Inserts a null-terminated String.
	 *
	 * @param value The String value to write.
	 * @param offset The offset to write the string to, or the BufferEncoding to use.
	 * @param encoding The BufferEncoding to use for writing strings (defaults to instance encoding).
	 *
	 * @return Current ScBuffer instance
	 */
	insertStringNT(value: string, offset: number, encoding?: BufferEncoding): ScBuffer {
		checkOffsetValue(offset);

		// Write Values
		this.insertString(value, offset, encoding);
		this.insertUInt8(0x00, offset + value.length);
		return this;
	}

	/**
	 * Writes a null-terminated String.
	 *
	 * @param value The String value to write.
	 * @param offset The offset to write the string to, or the BufferEncoding to use.
	 * @param encoding The BufferEncoding to use for writing strings (defaults to instance encoding).
	 *
	 * @return Current ScBuffer instance
	 */
	writeStringNT(value: string, offset?: number, encoding?: BufferEncoding): ScBuffer {
		// Write Values
		this.writeString(value, offset, encoding);
		this.writeUInt8(0x00, typeof offset === 'number' ? offset + value.length : this.writeOffset);
		return this;
	}

	// Buffers

	/**
	 * Reads a Buffer from the internal read position.
	 *
	 * @param length The length of data to read as a Buffer.
	 */
	readBuffer(length?: number): Buffer {
		if (typeof length !== 'undefined') {
			checkLengthValue(length);
		}

		const lengthVal = typeof length === 'number' ? length : this.length;
		const endPoint = Math.min(this.length, this._readOffset + lengthVal);

		// Read buffer value
		const value = this._buff.slice(this._readOffset, endPoint);

		// Increment internal Buffer read offset
		this._readOffset = endPoint;
		return value;
	}

	/**
	 * Writes a Buffer to the current write position.
	 *
	 * @param value  The Buffer to write.
	 * @param offset The offset to write the Buffer to.
	 *
	 * @return Current ScBuffer instance
	 */
	insertBuffer(value: Buffer, offset: number): ScBuffer {
		checkOffsetValue(offset);

		return this._handleBuffer(value, true, offset);
	}

	/**
	 * Writes a Buffer to the current write position.
	 *
	 * @param value  The Buffer to write.
	 * @param offset The offset to write the Buffer to.
	 *
	 * @return Current ScBuffer instance
	 */
	writeBuffer(value: Buffer, offset?: number): ScBuffer {
		return this._handleBuffer(value, false, offset);
	}

	/**
	 * Reads a null-terminated Buffer from the current read poisiton.
	 */
	readBufferNT(): Buffer {
		// Set null character position to the end ScBuffer instance.
		let nullPos = this.length;

		// Find next null character (if one is not found, default from above is used)
		for (let i = this._readOffset; i < this.length; i++) {
			if (this._buff[i] === 0x00) {
				nullPos = i;
				break;
			}
		}

		// Read value
		const value = this._buff.slice(this._readOffset, nullPos);

		// Increment internal Buffer read offset
		this._readOffset = nullPos + 1;
		return value;
	}

	/**
	 * Inserts a null-terminated Buffer.
	 *
	 * @param value  The Buffer to write.
	 * @param offset The offset to write the Buffer to.
	 *
	 * @return Current ScBuffer instance
	 */
	insertBufferNT(value: Buffer, offset: number): ScBuffer {
		checkOffsetValue(offset);

		// Write Values
		this.insertBuffer(value, offset);
		this.insertUInt8(0x00, offset + value.length);

		return this;
	}

	/**
	 * Writes a null-terminated Buffer.
	 *
	 * @param value  The Buffer to write.
	 * @param offset The offset to write the Buffer to.
	 *
	 * @return Current ScBuffer instance
	 */
	writeBufferNT(value: Buffer, offset?: number): ScBuffer {
		// Checks for valid numberic value;
		if (typeof offset !== 'undefined') {
			checkOffsetValue(offset);
		}

		// Write Values
		this.writeBuffer(value, offset);
		this.writeUInt8(0x00, typeof offset === 'number' ? offset + value.length : this._writeOffset);

		return this;
	}

	/**
	 * Clears the ScBuffer instance to its original empty state.
	 */
	clear(): ScBuffer {
		this._writeOffset = 0;
		this._readOffset = 0;
		this.length = 0;
		return this;
	}

	/**
	 * Gets the remaining data left to be read from the ScBuffer instance.
	 */
	remaining(): number {
		return this.length - this._readOffset;
	}

	/**
	 * Gets the value of the internal managed Buffer (Includes managed data only)
	 */
	toBuffer(): Buffer {
		return this._buff.slice(0, this.length);
	}

	/**
	 * Gets the String value of the internal managed Buffer
	 *
	 * @param encoding The BufferEncoding to display the Buffer as (defaults to instance level encoding).
	 */
	toString(encoding?: BufferEncoding): string {
		const encodingVal = typeof encoding === 'string' ? encoding : this._encoding;

		// Check for invalid encoding.
		checkEncoding(encodingVal);

		return this._buff.toString(encodingVal, 0, this.length);
	}

	/**
	 * Handles inserting and writing strings.
	 *
	 * @param value The String value to insert.
	 * @param isInsert True if inserting a string, false if writing.
	 * @param arg2 The offset to insert the string at, or the BufferEncoding to use.
	 * @param encoding The BufferEncoding to use for writing strings (defaults to instance encoding).
	 */
	private _handleString(
		value: string,
		isInsert: boolean,
		offset?: number,
		encoding?: BufferEncoding
	): ScBuffer {
		let offsetVal = this._writeOffset;
		let encodingVal = this._encoding;

		// Check for offset
		if (typeof offset === 'number') {
			offsetVal = offset;
			// Check for encoding
		} else if (typeof offset === 'string') {
			checkEncoding(offset);
			encodingVal = offset;
		}

		// Check for encoding (third param)
		if (typeof encoding === 'string') {
			checkEncoding(encoding);
			encodingVal = encoding;
		}

		// Calculate bytelength of string.
		const byteLength = Buffer.byteLength(value, encodingVal);

		// Ensure there is enough internal Buffer capacity.
		if (isInsert) {
			this.ensureInsertable(byteLength, offsetVal);
		} else {
			this._ensureWriteable(byteLength, offsetVal);
		}

		// Write value
		this._buff.write(value, offsetVal, byteLength, encodingVal);

		// Increment internal Buffer write offset;
		if (isInsert) {
			this._writeOffset += byteLength;
		} else {
			// If an offset was given, check to see if we wrote beyond the current writeOffset.
			if (typeof offset === 'number') {
				this._writeOffset = Math.max(this._writeOffset, offsetVal + byteLength);
			} else {
				// If no offset was given, we wrote to the end of the ScBuffer so increment writeOffset.
				this._writeOffset += byteLength;
			}
		}

		return this;
	}

	/**
	 * Handles writing or insert of a Buffer.
	 *
	 * @param value  The Buffer to write.
	 * @param offset The offset to write the Buffer to.
	 */
	private _handleBuffer(value: Buffer, isInsert: boolean, offset?: number): ScBuffer {
		const offsetVal = typeof offset === 'number' ? offset : this._writeOffset;

		// Ensure there is enough internal Buffer capacity.
		if (isInsert) {
			this.ensureInsertable(value.length, offsetVal);
		} else {
			this._ensureWriteable(value.length, offsetVal);
		}

		// Write buffer value
		value.copy(this._buff, offsetVal);

		// Increment internal Buffer write offset;
		if (isInsert) {
			this._writeOffset += value.length;
		} else {
			// If an offset was given, check to see if we wrote beyond the current writeOffset.
			if (typeof offset === 'number') {
				this._writeOffset = Math.max(this._writeOffset, offsetVal + value.length);
			} else {
				// If no offset was given, we wrote to the end of the ScBuffer so increment writeOffset.
				this._writeOffset += value.length;
			}
		}

		return this;
	}

	/**
	 * Ensures that the internal Buffer is large enough to read data.
	 *
	 * @param length The length of the data that needs to be read.
	 * @param offset The offset of the data that needs to be read.
	 */
	private ensureReadable(length: number, offset?: number) {
		// Offset value defaults to managed read offset.
		let offsetVal = this._readOffset;

		// If an offset was provided, use it.
		if (typeof offset !== 'undefined') {
			// Checks for valid numberic value;
			checkOffsetValue(offset);

			// Overide with custom offset.
			offsetVal = offset;
		}

		// Checks if offset is below zero, or the offset+length offset is beyond the total length of the managed data.
		if (offsetVal < 0 || offsetVal + length > this.length) {
			throw new Error(ERRORS.INVALID_READ_BEYOND_BOUNDS);
		}
	}

	/**
	 * Ensures that the internal Buffer is large enough to insert data.
	 *
	 * @param dataLength The length of the data that needs to be written.
	 * @param offset The offset of the data to be written.
	 */
	private ensureInsertable(dataLength: number, offset: number) {
		// Checks for valid numberic value;
		checkOffsetValue(offset);

		// Ensure there is enough internal Buffer capacity.
		this._ensureCapacity(this.length + dataLength);

		// If an offset was provided and its not the very end of the buffer, copy data into appropriate location in regards to the offset.
		if (offset < this.length) {
			this._buff.copy(this._buff, offset + dataLength, offset, this._buff.length);
		}

		if (offset + dataLength > this.length) {
			this.length = offset + dataLength;
		} else {
			this.length += dataLength;
		}
	}

	/**
	 * Ensures that the internal Buffer is large enough to write data.
	 *
	 * @param dataLength The length of the data that needs to be written.
	 * @param offset The offset of the data to be written (defaults to writeOffset).
	 */
	private _ensureWriteable(dataLength: number, offset?: number) {
		const offsetVal = typeof offset === 'number' ? offset : this._writeOffset;

		// Ensure enough capacity to write data.
		this._ensureCapacity(offsetVal + dataLength);

		// Adjust ScBuffer length (if offset + length is larger than managed length, adjust length)
		if (offsetVal + dataLength > this.length) {
			this.length = offsetVal + dataLength;
		}
	}

	/**
	 * Ensures that the internal Buffer is large enough to write at least the given amount of data.
	 *
	 * @param minLength The minimum length of the data needs to be written.
	 */
	private _ensureCapacity(minLength: number) {
		const oldLength = this._buff.length;

		if (minLength > oldLength) {
			const data = this._buff;
			let newLength = (oldLength * 3) / 2 + 1;
			if (newLength < minLength) {
				newLength = minLength;
			}
			this._buff = Buffer.allocUnsafe(newLength);

			data.copy(this._buff, 0, 0, oldLength);
		}
	}

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
	private _readNumberValue<T>(func: (offset: number) => T, byteSize: number, offset?: number): T {
		this.ensureReadable(byteSize, offset);

		// Call Buffer.readXXXX();
		const value = func.call(this._buff, typeof offset === 'number' ? offset : this._readOffset);

		// Adjust internal read offset if an optional read offset was not provided.
		if (typeof offset === 'undefined') {
			this._readOffset += byteSize;
		}

		return value;
	}

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
	private _insertNumberValue<T extends number | bigint>(
		func: (value: T, offset: number) => number,
		byteSize: number,
		value: T,
		offset: number
	): ScBuffer {
		// Check for invalid offset values.
		checkOffsetValue(offset);

		// Ensure there is enough internal Buffer capacity. (raw offset is passed)
		this.ensureInsertable(byteSize, offset);

		// Call buffer.writeXXXX();
		func.call(this._buff, value, offset);

		// Adjusts internally managed write offset.
		this._writeOffset += byteSize;
		return this;
	}

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
	private _writeNumberValue<T extends number | bigint>(
		func: (value: T, offset: number) => number,
		byteSize: number,
		value: T,
		offset?: number
	): ScBuffer {
		// If an offset was provided, validate it.
		if (typeof offset === 'number') {
			// Check if we're writing beyond the bounds of the managed data.
			if (offset < 0) {
				throw new Error(ERRORS.INVALID_WRITE_BEYOND_BOUNDS);
			}

			checkOffsetValue(offset);
		}

		// Default to writeOffset if no offset value was given.
		const offsetVal = typeof offset === 'number' ? offset : this._writeOffset;

		// Ensure there is enough internal Buffer capacity. (raw offset is passed)
		this._ensureWriteable(byteSize, offsetVal);

		func.call(this._buff, value, offsetVal);

		// If an offset was given, check to see if we wrote beyond the current writeOffset.
		if (typeof offset === 'number') {
			this._writeOffset = Math.max(this._writeOffset, offsetVal + byteSize);
		} else {
			// If no numeric offset was given, we wrote to the end of the ScBuffer so increment writeOffset.
			this._writeOffset += byteSize;
		}

		return this;
	}
}

export { ScBufferOptions, ScBuffer };
