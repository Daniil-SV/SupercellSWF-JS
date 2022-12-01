// Types

import { COMPRESSION, ScBuffer } from './buffer';
import { BLENDMODES } from './movie_clip';
import { STATES } from './swf';
import { Color } from './bank/color';
import { Matrix } from './bank/matrix';

/**
 * Error strings
 */
export const ERRORS = {
	// Buffer
	INVALID_ENCODING: 'Invalid encoding provided. Please specify a valid encoding the internal Node.js Buffer supports.',
	INVALID_BUFFER_SIZE: 'Invalid size provided. Size must be a valid integer greater than zero.',
	INVALID_BUFFER: 'Invalid Buffer provided in ScBuffer options.',
	INVALID_OBJECT: 'Invalid ScBuffer options object supplied to ScBuffer constructor or factory methods.',
	INVALID_OFFSET: 'An invalid offset value was provided.',
	INVALID_OFFSET_NON_NUMBER: 'An invalid offset value was provided. A numeric value is required.',
	INVALID_LENGTH: 'An invalid length value was provided.',
	INVALID_LENGTH_NON_NUMBER: 'An invalid length value was provived. A numeric value is required.',
	INVALID_TARGET_OFFSET: 'Target offset is beyond the bounds of the internal ScBuffer data.',
	INVALID_TARGET_LENGTH: 'Specified length value moves cursor beyong the bounds of the internal ScBuffer data.',
	INVALID_READ_BEYOND_BOUNDS: 'Attempted to read beyond the bounds of the managed data.',
	INVALID_WRITE_BEYOND_BOUNDS: 'Attempted to write beyond the bounds of the managed data.',

	// SWF
	UNKNOWN_TAG: 'Unknown tag found! It will be skipped but the file may not be read correctly!'
};

/**
 * A generic type for a class constructor that prompts you to select certain options for initialization.
 *
 * @category SWF Types
 */
export type ClassConstructor<T> =
	Partial<Omit<T, { [K in keyof T]-?: T[K] extends Function ? K : never }[keyof T]>>;

/**
 * Type for XY points array.
 *
 * @category SWF Types
 */
export type Points = Array<[number, number]>;

/**
 * Type for SWF progress message.
 *
 * @category SWF Types
 */
export type State = (state: STATES, property: any) => void;

// Interfaces
/**
 * Interface for MovieClip frame elements.
 *
 * @category Dictionary interface
 */
export interface FrameElement {
	/**
	 * Bind index in MovieClip.binds
	 */
	bind: number;

	/**
	 * Matrix index in swf.banks[MovieClip.bankIndex].matrices
	 */
	matrix?: number | Matrix;

	/**
	 * Color index in swf.banks[MovieClip.bankIndex].colors
	 */
	color?: number | Color;
}

export function IsFrameElement(obj: any): obj is FrameElement {
	return 'bind' in obj;
}

/**
 * Used in MovieClip Nine Slice and some DrawCommand functions.
 *
 * @category Dictionary interface
 */
export interface Rectangle {
	/**
	 * X-axis point
	 */
	x: number;

	/**
	 * Y-axis point
	 */
	y: number;

	/**
	 * Box width
	 */
	width: number;

	/**
	 * Box height
	 */
	height: number;
}

export function IsRectangle(obj: any): obj is Rectangle {
	return 'x' in obj &&
		'y' in obj &&
		'width' in obj &&
		'height' in obj;
}

/**
 * Interface for MovieClip bind.
 *
 * @category Dictionary interface
 */
export interface Bind {
	/**
	 * Object ID.
	 */
	id: number;

	/**
	 * Blending method that bind should use.
	 */
	blend?: BLENDMODES;

	/**
	 * Name of bind. Usually used in the game code to define a specific bind.
	 */
	name?: string;
}

export function IsBind(obj: any): obj is Bind {
	if (typeof obj === 'object') {
		return 'id' in obj;
	}

	return false;
}

/**
 * Interface for JSON serializable objects.
 *
 * @category Dictionary interface
 */
export interface JSONObject {
	[
	key: string]: string | Object | number | JSONObject[];
}

/**
 * Interface for buffer compress and decompress options.
 *
 * @category Dictionary interface
 */
export interface CompressOptions {
	buffer: ScBuffer;
	method: COMPRESSION;
}

// Buffer things

/**
 * Checks if a given encoding is a valid Buffer encoding. (Throws an exception if check fails)
 *
 * @param encoding The encoding string to check.
 */
export function checkEncoding(encoding: BufferEncoding) {
	if (!Buffer.isEncoding(encoding)) {
		throw new Error(ERRORS.INVALID_ENCODING);
	}
}

/**
 * Checks if a given number is a finite integer. (Throws an exception if check fails)
 *
 * @param value The number value to check.
 */
export function isFiniteInteger(value: number): boolean {
	return typeof value === 'number' && isFinite(value) && isInteger(value);
}

/**
 * Checks if an offset/length value is valid. (Throws an exception if check fails)
 *
 * @param value The value to check.
 * @param offset True if checking an offset, false if checking a length.
 */
export function checkOffsetOrLengthValue(value: any, offset: boolean) {
	if (typeof value === 'number') {
		// Check for non finite/non integers
		if (!isFiniteInteger(value) || value < 0) {
			throw new Error(offset ? ERRORS.INVALID_OFFSET : ERRORS.INVALID_LENGTH);
		}
	} else {
		throw new Error(offset ? ERRORS.INVALID_OFFSET_NON_NUMBER : ERRORS.INVALID_LENGTH_NON_NUMBER);
	}
}

/**
 * Checks if a length value is valid. (Throws an exception if check fails)
 *
 * @param length The value to check.
 */
export function checkLengthValue(length: any) {
	checkOffsetOrLengthValue(length, false);
}

/**
 * Checks if a offset value is valid. (Throws an exception if check fails)
 *
 * @param offset The value to check.
 */
export function checkOffsetValue(offset: any) {
	checkOffsetOrLengthValue(offset, true);
}

/**
 * Checks if a target offset value is out of bounds. (Throws an exception if check fails)
 *
 * @param offset The offset value to check.
 * @param buff The ScBuffer instance to check against.
 */
export function checkTargetOffset(offset: number, buff: ScBuffer) {
	if (offset < 0 || offset > buff.length) {
		throw new Error(ERRORS.INVALID_TARGET_OFFSET);
	}
}

/**
 * Determines whether a given number is a integer.
 * @param value The number to check.
 */
export function isInteger(value: number) {
	return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}
