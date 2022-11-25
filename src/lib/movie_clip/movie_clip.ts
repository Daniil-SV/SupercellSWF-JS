import { Bind, Box, ClassConstructor } from '../interfaces';
import { ScBuffer } from '../buffer';
import { SupercellSWF } from '../swf';
import { MovieClipFrame } from './frame';
import { Matrix } from '../transforms/matrix';
import { Color } from '../transforms/color';
import _ = require('lodash');
import { TransformBank } from '../transforms/bank';

/**
 * Has all blend methods that a bind can have.
 * @category MovieClip
 * @enum
 */
export enum BLENDMODES {
	mix,
	hard,
	layer,
	multiply,
	screen,
	lighten,
	difference,
	add
}

/**
 * Objects with animation that user can always see.
 * For transformation, it can use all objects that have IDs, including objects similar to itself.
 * Also has ID.
 * @category MovieClip
 */
export class MovieClip {
	/**
	 * Frame per second
	 */
	framerate = 0;

	/**
	 * Objects with id whose indices will be used in frames.
	 * May also have a name or a specific blending method.
	 */
	binds: Bind[] = [];

	/**
	 * List of frames in which objects from binds are transformed.
	 */
	frames: MovieClipFrame[] = [];

	/**
	 *  {@link https://en.wikipedia.org/wiki/9-slice_scaling Scale 9 grid, 9-slice scaling, 9-slicing or 9-patch}
	 *  is a sprite resizing technique to proportionally scale an image by splitting it in a grid of nine parts.
	 */
	nineSlice: Box = undefined;

	/**
	 * Current bank index in SupercellSWF.banks.
	 * Can be changed or used if all banks are full.
	 */
	bankIndex = 0;

	/** Indicates whether any bind has a blending method.
	 * @deprecated It has not been used in sc files for a very long time.
	 */
	hasBlend = true;

	constructor(options?: ClassConstructor<MovieClip>) {
		Object.assign(this, options);
	}

	/**
	 * Method that loads a MovieClip tag from a buffer.
	 * @param tag MovieClip tag
	 * @param swf SupercellSWF instance
	 * @returns Current MovieClip instance
	 */
	load(tag: number, swf: SupercellSWF): MovieClip {
		if ([3, 14].includes(tag)) {
			throw new Error('Tags MovieClip and MovieClip4 is unsupported! Aborting...');
		}

		const id = swf.buffer.readUInt16LE();
		swf.resources[id] = this;

		this.framerate = swf.buffer.readUInt8();
		const frameCount = swf.buffer.readUInt16LE();

		this.frames = Array.apply(null, Array(frameCount)).map(function () { return new MovieClipFrame(); });

		const frameElements = [];
		const frameElementsCount = swf.buffer.readInt32LE();

		for (let x = 0; frameElementsCount > x; x++) {
			const bindIndex = swf.buffer.readUInt16LE();
			const matrixIndex = swf.buffer.readUInt16LE();
			const colorIndex = swf.buffer.readUInt16LE();

			frameElements.push({
				bind: bindIndex,
				matrix: matrixIndex === 0xFFFF ? undefined : matrixIndex,
				color: colorIndex === 0xFFFF ? undefined : colorIndex
			});
		}

		const bindsCount = swf.buffer.readUInt16LE();

		for (let x = 0; bindsCount > x; x++) {
			const bind = {
				id: swf.buffer.readUInt16LE()
			};
			this.binds.push(bind);
		}

		if ([12, 35].includes(tag)) {
			for (let x = 0; bindsCount > x; x++) {
				// tslint:disable-next-line: no-bitwise
				this.binds[x].blend = swf.buffer.readUInt8() & 0x3F;
			}
		}

		for (let x = 0; bindsCount > x; x++) {
			this.binds[x].name = swf.buffer.readASCII();
		}

		let framesLoaded = 0;
		let elementsOffset = 0;

		let read = true;
		while (read) {
			const frameTag: number = swf.buffer.readUInt8();
			const frameTagLength: number = swf.buffer.readInt32LE();

			switch (frameTag) {
				case 0:
					read = false;
					break;

				case 5:
					throw new Error('Tag MovieClipFrame is unsupported! Aborting...');

				case 11:
					if (framesLoaded >= frameCount) {
						throw new Error(`Too many frames in movieclip with id ${id}`);
					}

					const elementsCount = this.frames[framesLoaded].load(frameTag, swf);

					for (let x = 0; elementsCount > x; x++) {
						this.frames[framesLoaded].elements.push(frameElements[elementsOffset + x]);
					}
					elementsOffset += elementsCount;

					framesLoaded++;
					break;

				case 31:
					this.nineSlice = {
						x: swf.buffer.readTwip(),
						y: swf.buffer.readTwip(),
						width: swf.buffer.readTwip(),
						height: swf.buffer.readTwip()
					};
					break;

				case 41:
					this.bankIndex = swf.buffer.readUInt8();
					break;

				default:
					console.error(`Unknown frame tag ${frameTag} in movieclip with id ${id}`);
					swf.buffer.skip(frameTagLength);
					break;
			}
		}
		return this;
	}

	/**
	 * Method that writes MovieClip tag to buffer.
	 * @param id MovieClip ID
	 * @param swf SupercellSWF
	 */
	save(id: number, swf: SupercellSWF): void {
		const tag = this.hasBlend ? 12 : 10;
		const tagBuffer = new ScBuffer();

		tagBuffer.writeUInt16LE(id);
		tagBuffer.writeUInt8(this.framerate);
		tagBuffer.writeUInt16LE(this.frames.length);

		const frameElements = [];
		for (const frame of this.frames) {
			for (const element of frame.elements) {
				frameElements.push(element);
			}
		}

		tagBuffer.writeInt32LE(frameElements.length);

		for (const element of frameElements) {
			tagBuffer.writeUInt16LE(element.bind);
			tagBuffer.writeUInt16LE(element.matrix === undefined ? 0xFFFF : element.matrix);
			tagBuffer.writeUInt16LE(element.color === undefined ? 0xFFFF : element.color);
		}

		tagBuffer.writeUInt16LE(this.binds.length);

		for (const bind of this.binds) {
			tagBuffer.writeUInt16LE(bind.id);
		}

		if (this.hasBlend) {
			for (const bind of this.binds) {
				// tslint:disable-next-line: no-bitwise
				tagBuffer.writeUInt8(bind.blend ? bind.blend & 0x3F : 0);
			}
		}

		for (const bind of this.binds) {
			tagBuffer.writeASCII(bind.name);
		}

		if (this.bankIndex) {
			const matrixTagBuffer = new ScBuffer();

			matrixTagBuffer.writeUInt8(this.bankIndex);

			tagBuffer.saveTag(41, matrixTagBuffer);
		}

		for (const frame of this.frames) {
			frame.save(tagBuffer);
		}

		if (this.nineSlice !== undefined) {
			const sliceTag = 31;
			const sliceBuffer = new ScBuffer();

			sliceBuffer.writeTwip(this.nineSlice.x);
			sliceBuffer.writeTwip(this.nineSlice.y);
			sliceBuffer.writeTwip(this.nineSlice.width);
			sliceBuffer.writeTwip(this.nineSlice.height);

			tagBuffer.saveTag(sliceTag, sliceBuffer);
		}

		tagBuffer.saveTag(0);

		swf.buffer.saveTag(tag, tagBuffer);
	}

	/**
	 * Converts indices of matrices and colors in frame elements into objects.
	 * @param swf SupercellSWF instance
	 * @returns Current MovieClip object
	 */
	toTransforms(swf: SupercellSWF): MovieClip {
		for (const frame of this.frames) {
			for (const element of frame.elements) {
				if (!(element.matrix instanceof Matrix) && element.matrix !== undefined) {
					element.matrix = swf.banks[this.bankIndex].matrices[element.matrix].clone();
				}
				if (!(element.color instanceof Color) && element.color !== undefined) {
					element.color = swf.banks[this.bankIndex].colors[element.color].clone();
				}
			}
		}
		return this;
	}
	/**
	 * Converts all matrix and color objects in frame elements to indexes in transformation banks.
	 * @param swf SupercellSWF instance
	 * @returns Current MovieClip object
	 */
	toBank(swf: SupercellSWF): MovieClip {
		const matrixObjects: Matrix[] = [];
		const colorObjects: Color[] = [];

		for (const frame of this.frames) {
			for (const element of frame.elements) {
				if (typeof element.matrix === 'object') {
					if (element.matrix instanceof Matrix) {
						matrixObjects.push(element.matrix);
					} else {
						matrixObjects.push(new Matrix().fromJSON(element.matrix));
					}
				} else if (typeof element.matrix === 'number') {
					matrixObjects.push(swf.banks[this.bankIndex].matrices[element.matrix]);
				} else {
					element.matrix = undefined;
				}

				if (typeof element.color === 'object') {
					if (element.color instanceof Color) {
						colorObjects.push(element.color);
					} else {
						colorObjects.push(new Color().fromJSON(element.color));
					}
				} else if (typeof element.color === 'number') {
					colorObjects.push(swf.banks[this.bankIndex].colors[element.color]);
				} else {
					element.color = undefined;
				}
			}
		}

		let bankIndex: number;
		for (let i = 0; swf.banks.length > i; i++) {
			if (swf.banks[i].canStoreTransforms(matrixObjects, colorObjects)) {
				bankIndex = i;
			}
		}

		if (bankIndex === undefined) {
			const newBank = new TransformBank();
			swf.banks.push(newBank);
			this.bankIndex = swf.banks.indexOf(newBank);
		} else {
			this.bankIndex = bankIndex;
		}

		let matrixIndex = 0;
		let colorIndex = 0;

		for (const frame of this.frames) {
			for (const element of frame.elements) {
				if (element.matrix !== undefined) {
					element.matrix = swf.banks[this.bankIndex].addMatrix(matrixObjects[matrixIndex]);
					matrixIndex++;
				}
				if (element.color !== undefined) {
					element.color = swf.banks[this.bankIndex].addColor(colorObjects[colorIndex]);
					colorIndex++;
				}
			}
		}
		return this;
	}

	toJSON() {
		return {
			framerate: this.framerate,
			binds: this.binds,
			hasBlend: this.hasBlend,
			frames: this.frames,
			nineSlice: this.nineSlice,
			bankIndex: this.bankIndex
		};
	}

	fromJSON(data: any): MovieClip {
		this.framerate = data.framerate === undefined ? 30 : data.framerate;
		this.binds = data.binds === undefined ? {} : data.binds;
		this.bankIndex = data.bankIndex === undefined ? 0 : data.bankIndex;
		this.nineSlice = undefined || data.nineSlice;
		this.hasBlend = data.hasBlend ? true : false;
		this.frames = [];
		if (data.frames) {
			for (const frame of data.frames) {
				this.frames.push(new MovieClipFrame().fromJSON(frame));
			}
		}
		return this;
	}

	/**
	 * Clones MovieClip object.
	 * @returns Сloned MovieClip
	 */
	clone(): MovieClip {
		return new MovieClip({
			framerate: this.framerate,
			binds: this.binds.map(bind => {
				return Object.assign({}, bind);
			}),
			frames: this.frames.map(frame => {
				return frame.clone();
			}),
			nineSlice: this.nineSlice ? Object.assign({}, this.nineSlice) : undefined,
			bankIndex: this.bankIndex,
			hasBlend: this.hasBlend
		});
	}
}
