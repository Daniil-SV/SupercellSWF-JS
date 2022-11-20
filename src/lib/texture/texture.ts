import Image, { ColorModel, ImageKind } from 'image-js';
import { ScBuffer } from '../buffer';
import { SupercellSWF, STATES } from '../swf';
import { PIXEL_READ_FUNCTIONS } from './pixel_read';
import { PIXEL_WRITE_FUNCTIONS } from './pixel_write';

/**
 * Has pixel types for all texture types
 * @category Texture
 */
export const CHANNEL_FORMATS: { [textureType: string]: string[] } = {
	'RGBA': [
		'GL_RGBA8',
		'GL_RGBA4',
		'GL_RGB5_A1'
	],
	'RGB': [
		'GL_RGB565'
	],
	'GREYA': [
		'GL_LUMINANCE8_ALPHA8'
	],
	'GREY': [
		'GL_LUMINANCE8'
	]
};

/**
 * List of all {@link https://www.learnopengles.com/android-lesson-six-an-introduction-to-texture-filtering/ texture filters}
 * @enum
 * @category Texture
 */
export enum FILTERS {
	GL_LINEAR,
	GL_NEAREST,
	GL_LINEAR_MIPMAP_NEAREST
}

const PIXEL_CHANNELS = [
	'RGBA',
	'RGBA',
	'RGBA',
	'RGBA',
	'RGB',
	'RGBA',
	'GREYA',
	'RGBA',
	'RGBA',
	'RGBA',
	'GREY'
];

const PIXEL_FORMATS = [
	'GL_RGBA8',
	'GL_RGBA8',
	'GL_RGBA4',
	'GL_RGB5_A1',
	'GL_RGB565',
	'GL_RGBA8',
	'GL_LUMINANCE8_ALPHA8',
	'GL_RGBA8',
	'GL_RGBA8',
	'GL_RGBA4',
	'GL_LUMINANCE8'
];

/**
 * Texture (or sprite sheet) which is used in sc file for {@link ShapeDrawCommand}
 * @category Texture
 */
export class Texture {
	/**
	 * {@link https://www.khronos.org/opengl/wiki/Image_Format Texture pixel type}
	 */
	pixelFormat = 'GL_RGBA8';

	/**
	 * {@link https://gdbooks.gitbooks.io/legacyopengl/content/Chapter7/MinMag.html Mag filter};
	 */
	magFilter: FILTERS = FILTERS.GL_LINEAR;

	/**
	 * {@link https://gdbooks.gitbooks.io/legacyopengl/content/Chapter7/MinMag.html Min filter};
	 */
	minFilter: FILTERS = FILTERS.GL_NEAREST;

	/**
	 * If enabled, writes a pixel linearly. Otherwise, it uses a special pixel blocking system.
	 */
	linear = true;

	/**
	 * Allows you to use mipmaps on texture
	 */
	downscaling = true;

	/**
	 * Texture image
	 */
	image: Image = new Image();

	get channels() {
		return this.image.channels;
	}
	set channels(count: number) {
		if (count === this.channels) {
			return;
		}

		// Remove alpha
		if (this.channels - 1 === count && this.channels !== 3 && this.channels !== 1) {
			this.image = this.image.add(255, { channels: [this.channels - 1] });
		}
		// Add alpha
		if (this.channels + 1 === count && this.channels === 1 || this.channels === 3) {
			this.image = this.image.rgba8();
		}

		// RGB to GRAY
		if (this.channels === 3 || this.channels === 4 && count === 1 || count === 2) {
			this.image = this.image.combineChannels(function (pixel) {
				return (pixel[0] + pixel[1] + pixel[2]) / 3;
			}, { keepAlpha: count !== 1 });
		}

		// GRAY to RGBA
		if (this.channels === 1 || this.channels === 2 && count === 3 || count === 4) {
			this.image = this.image.rgba8();
			if (count === 3 || count === 1) {
				this.image = this.image.add(255, { channels: [this.channels - 1] });
			}
		}
	}

	/**
	 * Texture image width
	 */
	get width() {
		return this.image.width;
	}
	set width(newWidth: number) {
		this.image = this.image.resize({ width: newWidth, preserveAspectRatio: false });
	}

	/**
	 * Texture image width
	 */
	get height() {
		return this.image.height;
	}
	set height(newHeigth: number) {
		this.image = this.image.resize({ height: newHeigth, preserveAspectRatio: false });
	}

	constructor(options?: Partial<Texture>) {
		Object.assign(this, options);
	}

	/**
	 * Method that loads a Texture tag from a buffer.
	 * @param tag Texture tag
	 * @param swf SupercellSWF instance
	 * @param hasData Indicates whether the tag has pixel information
	 * @returns Current Texture instance
	 */
	load(tag: number, swf: SupercellSWF, hasData: boolean): Texture {
		const pixelTypeIndex = swf.buffer.readUInt8();

		const width = swf.buffer.readUInt16LE();
		const height = swf.buffer.readUInt16LE();

		this.pixelFormat = PIXEL_FORMATS[pixelTypeIndex];

		this.magFilter = FILTERS.GL_LINEAR;
		this.minFilter = FILTERS.GL_NEAREST;

		if ([16, 19, 29].includes(tag)) {
			this.magFilter = FILTERS.GL_LINEAR;
			this.minFilter = FILTERS.GL_LINEAR_MIPMAP_NEAREST;
		} else if (tag === 34) {
			this.magFilter = FILTERS.GL_LINEAR;
			this.minFilter = FILTERS.GL_LINEAR;
		}

		this.linear = ![27, 28, 29].includes(tag);
		this.downscaling = [1, 16, 28, 29].includes(tag);

		const channelsMode = PIXEL_CHANNELS[pixelTypeIndex];

		this.image = new Image(width, height, { kind: channelsMode as ImageKind });

		if (hasData) {
			if (swf.textures.indexOf(this) < 0) {
				swf.textures.push(this);
			}

			const readPixel = PIXEL_READ_FUNCTIONS[this.pixelFormat];

			if (this.linear) {
				for (let y = 0; y < height; y++) {
					for (let x = 0; x < width; x++) {
						this.image.setPixelXY(x, y, readPixel(swf.buffer));
					}

					swf.progress(STATES.texture_load, [Math.ceil(y / height * 100), swf.textures.indexOf(this)]);
				}
			} else {
				const blockSize = 32;

				const xBlocks = Math.floor(this.image.width / blockSize);
				const yBlocks = Math.floor(this.image.height / blockSize);

				for (let yBlock = 0; yBlocks + 1 > yBlock; yBlock++) {
					for (let xBlock = 0; xBlocks + 1 > xBlock; xBlock++) {
						for (let y = 0; blockSize > y; y++) {
							const yPixel: number = (yBlock * blockSize) + y;

							if (yPixel >= this.image.height) {
								break;
							}

							for (let x = 0; blockSize > x; x++) {
								const xPixel: number = (xBlock * blockSize) + x;

								if (xPixel >= this.image.width) {
									break;
								}

								this.image.setPixelXY(xPixel, yPixel, readPixel(swf.buffer));
							}
						}
					}

					swf.progress(STATES.texture_load, [Math.ceil(yBlock / yBlocks * 100), swf.textures.indexOf(this)]);
				}
			}
		}
		return this;
	}

	/**
	 * Method that writes Texture tag to buffer.
	 * @param swf SupercellSWF instance
	 * @param hasData Indicates whether the tag has pixel information
	 * @param isLowres If enabled, writes 2 times less texture
	 */
	save(swf: SupercellSWF, hasData: boolean, isLowres: boolean = false) {
		let tag = 1;
		const tagBuffer = new ScBuffer();

		const textureKind = this.image.colorModel + (this.image.alpha ? 'A' : '');
		const pixelTypeIndex = PIXEL_FORMATS.indexOf(this.pixelFormat);

		if (!CHANNEL_FORMATS[textureKind].includes(PIXEL_FORMATS[pixelTypeIndex])) {
			this.pixelFormat = CHANNEL_FORMATS[textureKind][0];
		}

		const image = this.image.clone().resize({ factor: isLowres ? 0.5 : 1 });

		tagBuffer.writeUInt8(pixelTypeIndex);
		tagBuffer.writeUInt16LE(image.width);
		tagBuffer.writeUInt16LE(image.height);

		if (hasData) {
			if (this.magFilter === FILTERS.GL_LINEAR && this.minFilter === FILTERS.GL_NEAREST) {
				if (!this.linear) {
					tag = this.downscaling ? 28 : 27;
				} else if (!this.downscaling) {
					tag = 24;
				}
			} else if (this.magFilter === FILTERS.GL_LINEAR && this.minFilter === FILTERS.GL_LINEAR_MIPMAP_NEAREST) {
				if (!this.linear && !this.downscaling) {
					tag = 29;
				} else {
					tag = this.downscaling ? 16 : 19;
				}
			} else if (this.magFilter === FILTERS.GL_NEAREST && this.minFilter === FILTERS.GL_NEAREST) {
				tag = 34;
			}

			const writePixel = PIXEL_WRITE_FUNCTIONS[this.pixelFormat];

			if (!this.linear) {
				const originalImage = image.clone();
				let pixelIndex = 0;
				const addPixel = function (pixel: Array<any>) {
					image.setPixelXY(pixelIndex % image.width, Math.floor(pixelIndex / image.width), pixel);
				};

				const blockSize = 32;

				const xBlocks = Math.floor(image.width / blockSize);
				const yBlocks = Math.floor(image.height / blockSize);

				for (let yBlock = 0; yBlocks + 1 > yBlock; yBlock++) {
					for (let xBlock = 0; xBlocks + 1 > xBlock; xBlock++) {
						for (let y = 0; blockSize > y; y++) {
							const yPixel = (yBlock * blockSize) + y;

							if (yPixel >= image.height) {
								break;
							}

							for (let x = 0; blockSize > x; x++) {
								const xPixel = (xBlock * blockSize) + x;

								if (xPixel >= image.width) {
									break;
								}

								addPixel(originalImage.getPixelXY(xPixel, yPixel));
								pixelIndex++;
							}
						}
					}
				}
			}

			for (let y = 0; image.height > y; y++) {
				for (let x = 0; image.width > x; x++) {
					let pix = image.getPixelXY(x, y);
					if (image.alpha && pix[pix.length - 1] === 0) {
						pix = new Array(image.channels).fill(0);
					}
					writePixel(tagBuffer, pix);
				}
				swf.progress(STATES.texture_save, [Math.ceil(y / image.height * 100), swf.textures.indexOf(this)]);
			}
		}
		swf.buffer.saveTag(tag, tagBuffer);
	}

	toJSON() {
		return {
			pixelFormat: this.pixelFormat,
			linear: this.linear,
			downscaling: this.downscaling,
			magFilter: FILTERS[this.magFilter],
			minFilter: FILTERS[this.minFilter],
			width: this.width,
			height: this.height
		};
	}

	fromJSON(data: any): Texture {
		this.pixelFormat = data.pixelFormat || 'RGBA8';
		this.linear = data.linear ? true : false;
		this.downscaling = data.downscaling ? true : false;
		this.magFilter = data.magFilter ? data.magFilter as FILTERS : FILTERS.GL_LINEAR;
		this.minFilter = data.minFilter ? data.minFilter as FILTERS : FILTERS.GL_NEAREST;
		this.width = data.width || 1;
		this.height = data.height || 1;
		return this;
	}

	/**
	 * Clones Texture object.
	 * @returns Сloned Texture
	 */
	clone(): Texture {
		return new Texture({
			pixelFormat: this.pixelFormat,
			magFilter: this.magFilter,
			minFilter: this.minFilter,
			linear: this.linear,
			downscaling: this.downscaling,
			image: this.image.clone()
		});
	}
}
