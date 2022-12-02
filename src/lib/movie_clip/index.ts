import { Bind, Rectangle, ClassConstructor, JSONObject, IsBind, IsRectangle, ERRORS } from '../utils';
import { ScBuffer } from '../buffer';
import { SupercellSWF } from '../swf';
import { MovieClipFrame } from './frame';
import { Matrix } from '../bank/matrix';
import { Color } from '../bank/color';
import { TransformBank } from '../bank';

/**
 * Has all blend methods that a bind can have.
 *
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
 *
 * @category MovieClip
 * @example
 * // Creating an MovieClip object with 2 frames.
 * let movieclip = new MovieClip({
 * 		frameRate: 30,
 * 		binds: [
 * 			{id: 0, name: 'MyFirstBind'},
 * 			{id: 1, name: 'MySecondBind'}
 * 		],
 * 		frames: [
 * 			new MovieClipFrame({name: 'FirstFrame', elements: [{bind: 0}]}),
 * 			new MovieClipFrame({name: 'SecondFrame', elements: [{bind: 1}]})
 * 		]
 * });
 */
export class MovieClip {
	/**
	 * Frame per second.
	 */
	frameRate = 0;

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
	nineSlice: Rectangle = undefined;

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
	 *
	 * @param tag MovieClip tag
	 * @param swf SupercellSWF instance
	 *
	 * @returns Current MovieClip instance
	 */
	load(tag: number, swf: SupercellSWF): MovieClip {
		if ([3, 14].includes(tag)) {
			throw new Error(ERRORS.INVALID_FRAME_ELEMENT_OBJECT);
		}

		const id = swf.buffer.readUInt16();
		swf.resources[id] = this;

		this.frameRate = swf.buffer.readUInt8();
		const frameCount = swf.buffer.readUInt16();

		this.frames = Array.apply(null, Array(frameCount)).map(function () { return new MovieClipFrame(); });

		const frameElements = [];
		const frameElementsCount = swf.buffer.readInt32();

		for (let x = 0; frameElementsCount > x; x++) {
			const bindIndex = swf.buffer.readUInt16();
			const matrixIndex = swf.buffer.readUInt16();
			const colorIndex = swf.buffer.readUInt16();

			frameElements.push({
				bind: bindIndex,
				matrix: matrixIndex === 0xFFFF ? undefined : matrixIndex,
				color: colorIndex === 0xFFFF ? undefined : colorIndex
			});
		}

		const bindsCount = swf.buffer.readUInt16();

		for (let x = 0; bindsCount > x; x++) {
			const bind = {
				id: swf.buffer.readUInt16()
			};
			this.binds.push(bind);
		}

		if ([12, 35].includes(tag)) {
			for (let x = 0; bindsCount > x; x++) {
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
			const frameTagLength: number = swf.buffer.readInt32();

			switch (frameTag) {
				case 0:
					read = false;
					break;

				case 5:
					throw new Error(ERRORS.INVALID_MOVIECLIP_FRAME_TAG);

				case 11:
					if (framesLoaded >= frameCount) {
						throw new Error(ERRORS.INVALID_MOVIECLIP_FRAME_COUNT);
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
					console.error(ERRORS.UNKNOWN_TAG);
					swf.buffer.skip(frameTagLength);
					break;
			}
		}
		return this;
	}

	/**
	 * Method that writes MovieClip tag to SWF buffer.
	 *
	 * @param id MovieClip ID
	 * @param swf SupercellSWF
	 */
	save(id: number, swf: SupercellSWF): void {
		const tag = this.hasBlend ? 12 : 10;
		const tagBuffer = new ScBuffer();

		tagBuffer.writeUInt16(id);
		tagBuffer.writeUInt8(Math.round(this.frameRate));
		tagBuffer.writeUInt16(this.frames.length);

		const frameElements = [];
		for (const frame of this.frames) {
			for (const element of frame.elements) {
				frameElements.push(element);
			}
		}

		tagBuffer.writeInt32(frameElements.length);

		for (const element of frameElements) {
			tagBuffer.writeUInt16(element.bind);
			tagBuffer.writeUInt16(element.matrix === undefined ? 0xFFFF : element.matrix);
			tagBuffer.writeUInt16(element.color === undefined ? 0xFFFF : element.color);
		}

		tagBuffer.writeUInt16(this.binds.length);

		for (const bind of this.binds) {
			tagBuffer.writeUInt16(bind.id);
		}

		if (this.hasBlend) {
			for (const bind of this.binds) {
				tagBuffer.writeUInt8(bind.blend ? bind.blend & 0x3F : 0);
			}
		}

		for (const bind of this.binds) {
			tagBuffer.writeASCII(bind.name);
		}

		if (this.bankIndex) {
			const matrixTagBuffer = new ScBuffer();

			matrixTagBuffer.writeUInt8(this.bankIndex || 0);

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
	 *
	 * @param swf SupercellSWF instance
	 *
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
	 *
	 * @param swf SupercellSWF instance
	 *
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

	/**
	 * Clones MovieClip object.
	 *
	 * @returns Сloned MovieClip
	 */
	clone(): MovieClip {
		return new MovieClip({
			frameRate: this.frameRate,
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

	toJSON() {
		return {
			frameRate: this.frameRate,
			binds: this.binds,
			hasBlend: this.hasBlend,
			nineSlice: this.nineSlice,
			bankIndex: this.bankIndex,
			frames: this.frames
		};
	}

	fromJSON(data: JSONObject): MovieClip {
		if (data.frameRate && typeof data.frameRate === 'number') {
			this.frameRate = data.frameRate;
		} else {
			this.frameRate = 30;
		}

		this.binds = [];
		if (data.binds && Array.isArray(data.binds)) {
			for (const bind of data.binds) {
				if (IsBind(bind)) {
					this.binds.push(bind);
				} else {
					throw new Error(ERRORS.INVALID_BIND_OBJECT);
				}
			}
		}

		if (data.bankIndex && typeof data.bankIndex === 'number') {
			this.bankIndex = data.bankIndex;
		} else {
			this.bankIndex = 0;
		}

		if (data.nineSlice && IsRectangle(data.nineSlice)) {
			this.nineSlice = data.nineSlice;
		}

		this.hasBlend = true;
		if (data.hasBlend) {
			if (typeof data.hasBlend === 'boolean') {
				this.hasBlend = data.hasBlend;
			} else if (typeof data.hasBlend === 'number') {
				this.hasBlend = data.hasBlend !== 0;
			}
		}

		this.frames = [];
		if (data.frames && Array.isArray(data.frames)) {
			for (const frame of data.frames) {
				this.frames.push(new MovieClipFrame().fromJSON(frame));
			}
		}
		return this;
	}
}
