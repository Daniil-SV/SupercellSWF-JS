import { readdirSync } from 'fs';
import path = require('path');

export function getExecutablePath(base: string): string {
	const modulePath = path.resolve(__dirname, '../../');
	const files = readdirSync(modulePath).map(function (file) { return path.parse(file).name; });
	console.log(files);
	if (files.includes(base)) {
		return path.resolve(modulePath, base);
	} else {
		return base;
	}
}
