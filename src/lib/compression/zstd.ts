import { execSync } from 'child_process';
import deasync = require('deasync');
import * as crypto from 'crypto';
import { readFileSync, rmSync, writeFileSync } from 'fs';
import { getExecutablePath } from './utils';

let decompress: Function;
let compress: Function;

try {
	const zstd = require('@mongodb-js/zstd');
	decompress = function (buffer: Buffer): Buffer {
		let data: Buffer;
		(async () => {
			data = await zstd.decompress(buffer);
		})();
		deasync.loopWhile(function () { return data === undefined; });

		return data;
	};

	compress = function (buffer: Buffer, mode: 0 | 1): Buffer {
		let data: Buffer;
		(async () => {
			data = await zstd.compress(buffer, mode ? 17 : 3);
		})();

		deasync.loopWhile(function () { return data === undefined; });
		return data;
	};
} catch (err) {
	decompress = function (buffer: Buffer): Buffer {
		const filename = crypto.randomBytes(8).toString('hex');
		const outfilename = crypto.randomBytes(8).toString('hex');
		const path = getExecutablePath('zstd');

		writeFileSync(filename, buffer);
		execSync(`${path} -d ${filename} -o ${outfilename} --rm`);

		const data = readFileSync(outfilename);

		rmSync(outfilename);

		return data;
	};

	compress = function (buffer: Buffer, mode: 0 | 1) {
		const filename = crypto.randomBytes(8).toString('hex');
		const outfilename = crypto.randomBytes(8).toString('hex');
		const path = getExecutablePath('zstd');

		writeFileSync(filename, buffer);
		execSync(`${path} -${mode ? '17' : '3'} ${filename} -o ${outfilename} --rm`);

		const data = readFileSync(outfilename);

		rmSync(outfilename);

		return data;
	};
}

if (compress === undefined || decompress === undefined) {
	throw new Error('ZSTD has not been initialized!');
}

export { compress, decompress };
