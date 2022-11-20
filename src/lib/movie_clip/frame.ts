import { ClassConstructor, FrameElement } from '../interfaces';
import { ScBuffer } from '../buffer';
import { SupercellSWF } from '../swf';

/** Frame of MovieClip that is needed to transform objects on user screen.
 * @category MovieClip
*/
export class MovieClipFrame {
	/**
	 * Name of frame object
	 */
	name: string = undefined;

	/**
	 * List of objects that will be shown in the frame
	 * (Note the order works like layers but in reverse order)
	 */
	elements: FrameElement[] = [];

	constructor(options?: ClassConstructor<MovieClipFrame>) {
		Object.assign(this, options);
	}

	/**
	 * Method that loads a Frame tag from a buffer.
	 * @param tag Frame tag
	 * @param swf SupercellSWF instance
	 * @returns Number of elements
	 */
	load(tag: number, swf: SupercellSWF): number {
		const elementsCount = swf.buffer.readUInt16LE();
		this.name = swf.buffer.readASCII();

		return elementsCount;
	}

	/**
	 * Method that writes Frame tag to buffer.
	 * @param buffer ScBuffer instance
	*/
	save(buffer: ScBuffer): void {
		const tag = 11;
		const tagBuffer = new ScBuffer();

		tagBuffer.writeUInt16LE(this.elements.length);
		tagBuffer.writeASCII(this.name);

		buffer.saveTag(tag, tagBuffer);
	}

	toJSON() {
		return {
			name: this.name,
			elements: this.elements,
		};
	}

	fromJSON(data: any): MovieClipFrame {
		this.name = data.name || undefined;
		this.elements = data.elements || [];
		return this;
	}

	/**
	 * Clones MovieClipFrame object.
	 * @returns Cloned MovieClipFrame
	 */
	clone(): MovieClipFrame {
		return new MovieClipFrame({
			name: this.name,
			elements: this.elements.map(element => {
				return Object.assign({}, element);
			})
		});
	}
}
