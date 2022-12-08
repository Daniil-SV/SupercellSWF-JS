import { execSync } from 'child_process';
import deasync = require('deasync');
import * as crypto from 'crypto';
import { readFileSync, rmSync, writeFileSync } from 'fs';
import { getExecutablePath } from './utils';

let decompress: Function;
let compress: Function;

try {
	const lzma = require('lzma-native');
	decompress = function (buffer: Buffer): Buffer {
		let data: Buffer;

		lzma.decompress(Buffer.concat([
			buffer.slice(0, 9),
			Buffer.alloc(4),
			buffer.slice(9, buffer.length)
		]), {}, function (result) {
			data = result;
		});

		deasync.loopWhile(function () { return data === undefined; });
		return data;
	};

	compress = function (buffer: Buffer, mode: 0 | 1): Buffer {
		let data: Buffer;
		const options = { pb: 2, lc: 3, lp: 0, mode: 1, dictSize: 256 * 1024 };

		if (mode === 1) {
			options.lc = 4;
			options.mode = 2;
		}

		// @ts-ignore
		const stream = lzma.createStream('aloneEncoder', options);

		stream.once('error', (error) => {
			throw error;
		});

		const buffers = [];
		stream.on('data', (b) => {
			buffers.push(b);
		});
		stream.once('end', () => {
			data = Buffer.concat(buffers);
		});
		stream.end(buffer);

		deasync.loopWhile(function () { return data === undefined; });
		return data;
	};
} catch (err) {
	decompress = function (buffer: Buffer): Buffer {
		const filename = crypto.randomBytes(8).toString('hex');
		const path = getExecutablePath('lzma');

		writeFileSync(filename + '.lzma', buffer);
		execSync(`${path} -d ${filename + '.lzma'}`);

		const data = readFileSync(filename);

		rmSync(filename);

		return data;
	};

	compress = function (buffer: Buffer, mode: 0 | 1) {
		const filename = crypto.randomBytes(8).toString('hex');
		const path = getExecutablePath('lzma');

		writeFileSync(filename, buffer);
		execSync(`${path} -z ${filename} -F alone --lzma1=pb=2,lc=${mode ? '4' : '3'},lp=0,mode=${mode ? 'normal' : 'fast'},dict=262144`);

		const data = readFileSync(filename + '.lzma');

		rmSync(filename + '.lzma');

		return data;
	};
}

if (compress === undefined || decompress === undefined) {
	throw new Error('LZMA has not been initialized!');
}

export { compress, decompress };
