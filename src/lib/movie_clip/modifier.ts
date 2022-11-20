import { ClassConstructor } from '../interfaces';
import { ScBuffer } from '../buffer';
import { SupercellSWF } from '../swf';

/** Contains types of all currently known modifiers.
 *  Works when it is in binds and in current frame.
 * @category MovieClip
 * @enum
 */
export enum MODIFIERS {
	/** Means that next object in frame is a "Mask layer" */
	MASK,
	/** Means that all next objects in frame will be masked by previous "mask layer" */
	MASKED,
	/** Means that all next objects in frame will not be masked */
	UNMASKED
}

/**
 * Frame modifier. Has an ID and can only be used in MovieClips.
 * Attached to binds and used in frames to indicate some other behavior in frame
 * @category MovieClip
*/
export class MovieClipModifier {
	/**
	 * Modifier type
	 */
	modifier: MODIFIERS = MODIFIERS.MASK;

	constructor(options?: ClassConstructor<MovieClipModifier>) {
		Object.assign(this, options);
	}

	/**
	 * Method that loads a Modifier tag from a buffer.
	 * @param tag Modifier tag
	 * @param swf SupercellSWF instance
	 * @returns Current Modifier instance
	 */
	load(tag: number, swf: SupercellSWF): MovieClipModifier {
		const id = swf.buffer.readUInt16LE();
		swf.resources[id] = this;

		switch (tag) {
			case 38:
				this.modifier = MODIFIERS.MASK;
				break;
			case 39:
				this.modifier = MODIFIERS.MASKED;
				break;
			case 40:
				this.modifier = MODIFIERS.UNMASKED;
				break;
			default:
				console.warn(`Unknown modifier tag ${tag} in modifier with id ${id}`);
		}

		return this;
	}

	/**
	 * Method that writes Modifier tag to buffer.
	 * @param id object ID
	 * @param swf SupercellSWF instance
	*/
	save(id: number, swf: SupercellSWF): void {
		let tag: number;
		const tagBuffer = new ScBuffer();

		switch (this.modifier) {
			case MODIFIERS.MASK:
				tag = 38;
				break;
			case MODIFIERS.MASKED:
				tag = 39;
				break;
			case MODIFIERS.UNMASKED:
				tag = 40;
				break;
		}

		tagBuffer.writeUInt16LE(id);

		swf.buffer.saveTag(tag, tagBuffer);
	}

	toJSON() {
		return {
			modifier: MODIFIERS[this.modifier]
		};
	}

	fromJSON(data: any): MovieClipModifier {
		this.modifier = MODIFIERS.MASK || MODIFIERS[data.modifier as keyof typeof MODIFIERS];
		return this;
	}

	/**
	 * Clones MovieClipModifier object.
	 * @returns Сloned MovieClipModifier
	 */
	clone(): MovieClipModifier {
		return new MovieClipModifier({ modifier: this.modifier });
	}
}
