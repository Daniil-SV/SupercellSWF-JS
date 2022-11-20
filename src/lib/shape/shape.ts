import { ScBuffer } from '../buffer';
import { SupercellSWF } from '../swf';
import { ShapeDrawCommand } from './ShapeDrawCommand';

/**
 * Container for graphic objects. Has an ID for use in MovieClip.
 * @category Shape
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
	 * @param tag Shape tag
	 * @param swf SupercellSWF object
	 * @returns Current Shape instance
	 */
	load(tag: number, swf: SupercellSWF): Shape {
		const id = swf.buffer.readUInt16LE();
		swf.resources[id] = this;
		const bitmapCount = swf.buffer.readUInt16LE();

		let pointsCount = 4 * bitmapCount;
		if (tag === 18) {
			pointsCount = swf.buffer.readUInt16LE();
		}

		let read = true;
		while (read) {
			const bitmapTag = swf.buffer.readUInt8();
			const bitmapTagLength = swf.buffer.readInt32LE();

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
					console.warn(`Shape with id ${id} has bitmap with unknown tag ${bitmapTag}`);
					swf.buffer.skip(bitmapTagLength);
					break;
			}
		}
		return this;
	}

	/**
	 * Method that writes Shape tag to buffer.
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

		tagBuffer.writeUInt16LE(id);
		tagBuffer.writeUInt16LE(this.bitmaps.length);
		if (tag === 18) { tagBuffer.writeUInt16LE(pointsCount); }

		for (const bitmap of this.bitmaps) {
			bitmap.save(tagBuffer);
		}

		tagBuffer.saveTag(0);
		swf.buffer.saveTag(18, tagBuffer);

	}

	toJSON() {
		return {
			bitmaps: this.bitmaps
		};
	}

	fromJSON(data: any): Shape {
		this.bitmaps = [];
		if (data.bitmaps) {
			for (const bitmap of data.bitmaps) {
				this.bitmaps.push(new ShapeDrawCommand().fromJSON(bitmap));
			}
		}
		return this;
	}

	/**
	 * Clones Shape object.
	 * @returns Сloned Shape
	 */
	clone(): Shape {
		return new Shape({
			bitmaps: this.bitmaps.map(bitmap => { return bitmap.clone(); })
		});
	}
}
