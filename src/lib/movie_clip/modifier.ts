import { ClassConstructor, ERRORS, JSONObject } from '../utils';
import { ScBuffer } from '../buffer';
import { SupercellSWF } from '../swf';

/** Contains types of all currently known modifiers.
 *  Works when it is in binds and in current frame.
 *
 * @category MovieClip
 * @enum
 */
export enum MODIFIERS {
	/**
	 * Means that next object in frame is a "Mask layer".
	 */
	MASK,

	/**
	 * Means that all next objects in frame will be masked by previous "mask layer".
	 */
	MASKED,

	/**
	 * Means that all next objects in frame will not be masked.
	 */
	UNMASKED
}

/**
 * Frame modifier. Has an ID and can only be used in MovieClips.
 * Attached to binds and used in frames to indicate some other behavior in frame.
 *
 * @category MovieClip
 * @example
 * // Initializing an Class with "Mask" type.
 * let modifier = new MovieClipModifier({
 * 		modifier: MODIFIERS.MASK
 * });
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
	 *
	 * @param tag Modifier tag
	 * @param swf SupercellSWF instance
	 *
	 * @returns Current Modifier instance
	 */
	load(tag: number, swf: SupercellSWF): MovieClipModifier {
		const id = swf.buffer.readUInt16();
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
	 * Method that writes Modifier tag to SWF buffer.
	 *
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

		tagBuffer.writeUInt16(id);

		swf.buffer.saveTag(tag, tagBuffer);
	}

	/**
	 * Clones MovieClipModifier object.
	 *
	 * @returns Сloned MovieClipModifier
	 */
	clone(): MovieClipModifier {
		return new MovieClipModifier({ modifier: this.modifier });
	}

	toJSON() {
		return {
			modifier: MODIFIERS[this.modifier]
		};
	}

	fromJSON(data: JSONObject): MovieClipModifier {
		if (data.modifier) {
			if (typeof data.modifier === 'string') {
				this.modifier = MODIFIERS[data.modifier as keyof typeof MODIFIERS];
			} else if (typeof data.modifier === 'number') {
				this.modifier = data.modifier;
			} else {
				throw new Error(ERRORS.INVALID_MODIFIER_OBJECT);
			}
		}
		return this;
	}

}
