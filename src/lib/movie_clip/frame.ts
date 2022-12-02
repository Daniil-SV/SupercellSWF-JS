import { ClassConstructor, ERRORS, FrameElement, IsFrameElement, JSONObject } from '../utils';
import { ScBuffer } from '../buffer';
import { SupercellSWF } from '../swf';

/** Frame of MovieClip that is needed to transform objects on user screen.
 *
 * @category MovieClip
 * @example
 * // Create a frame named "Frame" that contains first Bind from Movieclip.binds without color transform.
 * // Matrix contains index of matrix in swf.banks[MovieClip.bankIndex].matrices.
 * let frame = new MovieClipFrame({
 * 		name: 'Frame',
 * 		elements: [{bind: 0, matrix: 0, color: undefined}]
 * });
 * // Cases for which you need to use MovieClip.toBank method.
 * let frame = new MovieClipFrame({
 * 		name: 'Frame',
 * 		elements: [{
 * 	 		bind: 0,
 * 	 		matrix: new Matrix({tx: 10}) //OR [1, 0, 0, 1, 10, 0] ,
 * 	 		color: undefined
 * 		}]
 * });
 */
export class MovieClipFrame {
	/**
	 * Name of frame object.
	 */
	name: string = undefined;

	/**
	 * List of objects that will be shown in the frame
	 * (Note the order works like layers but in reverse order).
	 */
	elements: FrameElement[] = [];

	constructor(options?: ClassConstructor<MovieClipFrame>) {
		Object.assign(this, options);
	}

	/**
	 * Method that loads a Frame tag from a buffer.
	 *
	 * @param tag Frame tag
	 * @param swf SupercellSWF instance
	 *
	 * @returns Number of elements
	 */
	load(tag: number, swf: SupercellSWF): number {
		const elementsCount = swf.buffer.readUInt16();
		this.name = swf.buffer.readASCII();

		return elementsCount;
	}

	/**
	 * Method that writes Frame tag to MovieClip buffer.
	 *
	 * @param buffer ScBuffer instance
	*/
	save(buffer: ScBuffer): void {
		const tag = 11;
		const tagBuffer = new ScBuffer();

		tagBuffer.writeUInt16(this.elements.length);
		tagBuffer.writeASCII(this.name);

		buffer.saveTag(tag, tagBuffer);
	}

	/**
	 * Clones MovieClipFrame object.
	 *
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

	toJSON(): JSONObject {
		return {
			name: this.name,
			elements: this.elements,
		};
	}

	fromJSON(data: JSONObject): MovieClipFrame {
		if (data.name && typeof data.name === 'string') {
			this.name = data.name;
		} else {
			this.name = undefined;
		}

		if (data.elements && Array.isArray(data.elements)) {
			for (const element of data.elements) {
				if (IsFrameElement(element)) {
					this.elements.push(element);
				} else {
					throw new Error(ERRORS.INVALID_FRAME_ELEMENT_OBJECT);
				}
			}
		} else {
			this.elements = [];
		}

		return this;
	}
}
