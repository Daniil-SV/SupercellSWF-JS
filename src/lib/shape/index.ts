import { ScBuffer } from '../buffer';
import { ERRORS, JSONObject } from '../utils';
import { SupercellSWF } from '../swf';
import { ShapeDrawCommand } from './ShapeDrawCommand';

/**
 * Container for graphic objects. Has an ID for use in MovieClip.
 *
 * @category Shape
 * @example
 * // Initializing a shape with one bitmap
 * let shape = new Shape({bitmaps: [
 * 		new ShapeDrawCommand({
 * 			textureIndex: 0,
 * 			normalized: true,	//OR : false, and UV: [[0, 0], [128, 0], [128, 128], [0, 128]] // Points on "texture" (Imagine that it is 128x128)
 * 			uvCoords: [[0, 0], [65535, 0], [65535, 65535], [0, 65535]]
 * 			xyCoords: [[0, 0], [512, 0], [512, 512], [0, 512]]
 * 		})
 * 	]});
 */
export class Shape {
	/**
	 *  List of ShapeDrawCommand objects (aka bitmaps).
	*/
	bitmaps: ShapeDrawCommand[] = [];

	constructor(options?: Partial<Shape>) {
		Object.assign(this, options);
	}

	/**
	 * Method that loads a Shape tag from a buffer.
	 *
	 * @param tag Shape tag
	 * @param swf SupercellSWF object
	 *
	 * @returns Current Shape instance
	 */
	load(tag: number, swf: SupercellSWF): Shape {
		const id = swf.buffer.readUInt16();
		swf.resources[id] = this;
		const bitmapCount = swf.buffer.readUInt16();

		let pointsCount = 4 * bitmapCount;
		if (tag === 18) {
			pointsCount = swf.buffer.readUInt16();
		}

		let read = true;
		while (read) {
			const bitmapTag = swf.buffer.readUInt8();
			const bitmapTagLength = swf.buffer.readInt32();

			if (this.bitmaps.length > bitmapCount) {
				throw new Error((`Too many bitmaps in shape with id ${id}`));
			}

			switch (bitmapTag) {
				case 0:
					read = false;
					break;

				case 4:
				case 17:
				case 22:
					const bitmap = new ShapeDrawCommand().load(bitmapTag, swf);
					this.bitmaps.push(bitmap);
					break;

				case 6:
					throw new Error('Tag ShapeDrawColorFillCommand is unsupported! Aborting...');

				default:
					console.error(ERRORS.UNKNOWN_TAG);
					swf.buffer.skip(bitmapTagLength);
					break;
			}
		}
		return this;
	}

	/**
	 * Method that writes Shape tag to SWF buffer.
	 *
	 * @param {number} id Shape ID
	 * @param {SupercellSWF} swf SupercellSWF object
	 */
	save(id: number, swf: SupercellSWF): void {
		let pointsCount = 0;
		let maxRectsBitmap = 0;
		for (let bitmapIndex = 0; this.bitmaps.length > bitmapIndex; bitmapIndex++) {
			const bitmap = this.bitmaps[bitmapIndex];
			pointsCount += bitmap.xyCoords.length;
			if (bitmap.maxRects) { maxRectsBitmap++; }
		}

		const tag = maxRectsBitmap === this.bitmaps.length ? 2 : 18;
		const tagBuffer = new ScBuffer();

		tagBuffer.writeUInt16(id);
		tagBuffer.writeUInt16(this.bitmaps.length);
		if (tag === 18) { tagBuffer.writeUInt16(pointsCount); }

		for (const bitmap of this.bitmaps) {
			bitmap.save(tagBuffer);
		}

		tagBuffer.saveTag(0);
		swf.buffer.saveTag(18, tagBuffer);

	}

	/**
	 * Clones Shape object.
	 *
	 * @returns Сloned Shape
	 */
	clone(): Shape {
		return new Shape({
			bitmaps: this.bitmaps.map(bitmap => { return bitmap.clone(); })
		});
	}

	toJSON() {
		return {
			bitmaps: this.bitmaps
		};
	}

	fromJSON(data: JSONObject): Shape {
		this.bitmaps = [];
		if (data.bitmaps && Array.isArray(data.bitmaps)) {
			for (const bitmap of data.bitmaps) {
				this.bitmaps.push(new ShapeDrawCommand().fromJSON(bitmap));
			}
		}
		return this;
	}
}
