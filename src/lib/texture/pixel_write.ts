import { ScBuffer } from '../buffer';

function writeRGBA8(buffer: ScBuffer, pixel: [number, number, number, number]) {
	const [r, g, b, a] = pixel;
	buffer.writeUInt8(r);
	buffer.writeUInt8(g);
	buffer.writeUInt8(b);
	buffer.writeUInt8(a);
}

function writeRGBAA4(buffer: ScBuffer, pixel: [number, number, number, number]) {
	const [r, g, b, a] = pixel;
	buffer.writeUInt16(a >> 4 | b >> 4 << 4 | g >> 4 << 8 | r >> 4 << 12);
}

function writeRGB5_A1(buffer: ScBuffer, pixel: [number, number, number, number]) {
	const [r, g, b, a] = pixel;
	buffer.writeUInt16(a >> 7 | b >> 3 << 1 | g >> 3 << 6 | r >> 3 << 11);
}

function writeRGB565(buffer: ScBuffer, pixel: [number, number, number]) {
	const [r, g, b] = pixel;
	buffer.writeUInt16(b >> 3 | g >> 2 << 5 | r >> 3 << 11);
}

function writeLUMINANCE_A8(buffer: ScBuffer, pixel: [number, number]) {
	const [l, a] = pixel;
	buffer.writeUInt16(a << 8 | l);
}

function writeLUMINANCE(buffer: ScBuffer, pixel: [number]) {
	buffer.writeUInt8(pixel[0]);
}

export const PIXEL_WRITE_FUNCTIONS: { [key: string]: Function } = {
	'GL_RGBA8': writeRGBA8,
	'GL_RGBA4': writeRGBAA4,
	'GL_RGB5_A1': writeRGB5_A1,
	'GL_RGB565': writeRGB565,
	'GL_LUMINANCE8_ALPHA8': writeLUMINANCE_A8,
	'GL_LUMINANCE8': writeLUMINANCE
};
