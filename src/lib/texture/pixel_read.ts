// tslint:disable:no-bitwise
import { ScBuffer } from '../buffer';

function readRGBA8(buffer: ScBuffer): [number, number, number, number] {
	return [
		buffer.readUInt8(),
		buffer.readUInt8(),
		buffer.readUInt8(),
		buffer.readUInt8()
	];
}

function readRGBA4(buffer: ScBuffer): [number, number, number, number] {
	const p = buffer.readUInt16LE();

	return [
		((p >> 12) & 15) << 4,
		((p >> 8) & 15) << 4,
		((p >> 8) & 15) << 4,
		(p & 15) << 4
	];
}

function readRGB5_A1(buffer: ScBuffer): [number, number, number, number] {
	const p = buffer.readUInt16LE();

	return [
		((p >> 11) & 31) << 3,
		((p >> 6) & 31) << 3,
		((p >> 1) & 31) << 3,
		p & 0x1 ? 0xff : 0x00,
	];
}

function readRGBA565(buffer: ScBuffer): [number, number, number] {
	const p = buffer.readUInt16LE();

	return [
		((p >> 11) & 31) << 3,
		((p >> 5) & 63) << 2,
		(p & 31) << 3,
	];
}

function readLUMINANCE_A8(buffer: ScBuffer): [number, number] {
	return [
		buffer.readUInt8(),
		buffer.readUInt8()
	];
}

function readLUMINANCE(buffer: ScBuffer): [number] {
	return [buffer.readUInt8()];
}

export const PIXEL_READ_FUNCTIONS: { [key: string]: Function } = {
	'GL_RGBA8': readRGBA8,
	'GL_RGBA4': readRGBA4,
	'GL_RGB5_A1': readRGB5_A1,
	'GL_RGB565': readRGBA565,
	'GL_LUMINANCE8_ALPHA8': readLUMINANCE_A8,
	'GL_LUMINANCE8': readLUMINANCE
};
