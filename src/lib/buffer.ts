import { execSync } from 'child_process';
import { createHash } from 'crypto';
import * as fs from 'fs';
import { resolve } from 'path';
import { SmartBuffer } from 'smart-buffer';
import * as tmp from 'tmp';

/**
 * List of all compression methods.
*/
export enum COMPRESSION {
	/** Use only for debugging, the game will crash with this compression type */
	NONE,
	/** slower but compresses better */
	LZMA,
	/** faster but file slightly larger */
	FAST_LZMA
}

/**
 * Buffer class with additional methods that are needed to read the .sc file
 */
export class ScBuffer extends SmartBuffer {
	/**
	 * Writes files depending on selected compression.
	 * @param {string} path Path to file to be written
	 * @param {ScBuffer} buffer Binary buffer
	 * @param {COMPRESSION} compressionMethod Compression method
	 */
	static toSc(path: string, buffer: ScBuffer, compressionMethod: COMPRESSION): void {
		const workingBuffer = buffer.toBuffer();
		if (compressionMethod === COMPRESSION.NONE) {
			fs.writeFileSync(path, workingBuffer);
			return;
		}

		const swfCache = tmp.dirSync();
		const compressedPath = swfCache.name + '/raw_data.sc';
		const decompressedPath = swfCache.name + '/compressed_data.sc';

		const header = new ScBuffer();
		header.writeInt32BE(0x53430000); // SC header
		header.writeUInt16BE(1); // Header version: 1
		const hash = createHash('MD5').update(workingBuffer).digest();
		header.writeUInt32BE(hash.byteLength);
		header.writeBuffer(hash);

		let compressedData: Buffer;
		fs.writeFileSync(decompressedPath, workingBuffer);
		const binaryPath = resolve(__dirname, '../../bin/');

		switch (compressionMethod) {
			case COMPRESSION.LZMA:
			case COMPRESSION.FAST_LZMA:
				execSync(`"${binaryPath}/lzma" e ${decompressedPath} ${compressedPath} -a${compressionMethod === COMPRESSION.LZMA ? 1 : 0} -lc3 -lp0 -pb2 -d18`);

				compressedData = fs.readFileSync(compressedPath);

				compressedData = Buffer.concat([
					compressedData.slice(0, 9),
					compressedData.slice(13, compressedData.length)
				]);
				break;
		}

		fs.writeFileSync(path, Buffer.concat([header.toBuffer(), compressedData]));
		fs.rmSync(swfCache.name, { recursive: true, force: true });
	}

	/**
	 * Reads a file and decompresses it if necessary.
	 * @param {string} path Path to file
	 * @returns {ScBuffer}  Buffer with file ready to read
	 */
	static fromSc(path: string): [ScBuffer, COMPRESSION.FAST_LZMA | COMPRESSION.LZMA | COMPRESSION.NONE] {
		let compressionMethod = COMPRESSION.NONE;

		const data = new this({buff: fs.readFileSync(path)});
		const header = data.readInt32BE();

		if (header !== 0x53430000) { // If not "SC"
			data.readOffset = 0;
			return [data, compressionMethod];
		}

		// cringe but... eh..
		const swfCache = tmp.dirSync();
		const compressedPath = swfCache.name + '/raw_data.sc';
		const decompressedPath = swfCache.name + '/decompressed_data.sc';

		const fileVersion = data.readUInt16BE();
		let headerVersion = 1;
		if (fileVersion === 4) {
			headerVersion = data.readUInt32BE();
		}

		const hash = data.readString(data.readUInt32BE(), 'hex');

		const compressionHeader = data.readUInt32BE();
		const binaryPath = resolve(__dirname, '../../bin/');
		switch (compressionHeader) {
			// Fast and slow lzma method
			case 0x5E000004:
			case 0x5D000004:
				const compressedData = data.internalBuffer.slice(data.readOffset - 4, data.length);
				fs.writeFileSync(compressedPath, Buffer.concat([compressedData.slice(0, 9),
				Buffer.alloc(4),
				compressedData.slice(9, compressedData.length)]));
				execSync(`"${binaryPath}/lzma" d ${compressedPath} ${decompressedPath}`);
				compressionMethod = compressionHeader === 0x5D000004 ? COMPRESSION.FAST_LZMA : COMPRESSION.LZMA;
				break;
			default:
				throw new Error('Unknown compression!');
		}

		const decompressedBuffer = new this({buff: fs.readFileSync(decompressedPath)});

		fs.rmSync(swfCache.name, { recursive: true, force: true });

		return [decompressedBuffer, compressionMethod];
	}

	/**
	 * Skips given number of bytes.
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
	 * @param length Number of padding bytes
	 */
	fill(length: number): void {
		this.writeBuffer(Buffer.alloc(length));
	}

	/**
	 * Reads "twip".
	 * @returns {number} Result twip
	 */
	readTwip(): number {
		return this.readInt32LE() / 20;
	}

	/**
	 * Writes "twip".
	 * @param {number} twip Twip number
	 */
	writeTwip(twip: number) {
		this.writeInt32LE(twip * 20);
	}

	/**
	 * Reads a sc string
	 * @returns {string | undefined} String
	 */
	readASCII(): string | undefined {
		const stringLength = this.readUInt8();

		if (stringLength === 0xFF) {
			return undefined;
		}

		return this.readString(stringLength, 'ascii');
	}

	/**
	 * Writes a sc string
	 * @param {string | undefined} string String to write
	 */
	writeASCII(string: string | undefined): void {
		if (string && string.length < 255) {
			this.writeUInt8(string.length);
			this.writeString(string, 'ascii');
		} else {
			this.writeUInt8(0xFF);
		}
	}

	/**
	 * Reads boolean
	 * @returns {boolean} Boolean
	 */
	readBoolean(): boolean {
		return this.readUInt8() === 1;
	}

	/**
	 * Writes boolean
	 * @param {boolean} bool Boolean to write
	 */
	writeBoolean(bool: boolean): void {
		this.writeUInt8(bool ? 1 : 0);
	}

	/**
	 * Writes tag
	 * @param {number} tag Tag
	 * @param {ScBuffer} buffer Tag buffer
	 */
	saveTag(tag: number, buffer: ScBuffer | undefined = undefined) {
		this.writeUInt8(tag);
		this.writeUInt32LE(buffer ? buffer.length : 0);

		if (buffer) {
			this.writeBuffer(buffer.toBuffer());
		}
	}
}
