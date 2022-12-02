/// <reference types="node" />
import { COMPRESSION, ScBuffer } from './buffer';
import { BLENDMODES } from './movie_clip';
import { STATES } from './swf';
import { Color } from './bank/color';
import { Matrix } from './bank/matrix';
/**
 * Error strings
 */
export declare const ERRORS: {
    INVALID_ENCODING: string;
    INVALID_BUFFER_SIZE: string;
    INVALID_BUFFER: string;
    INVALID_OBJECT: string;
    INVALID_OFFSET: string;
    INVALID_OFFSET_NON_NUMBER: string;
    INVALID_LENGTH: string;
    INVALID_LENGTH_NON_NUMBER: string;
    INVALID_TARGET_OFFSET: string;
    INVALID_TARGET_LENGTH: string;
    INVALID_READ_BEYOND_BOUNDS: string;
    INVALID_WRITE_BEYOND_BOUNDS: string;
    UNKNOWN_TAG: string;
    INVALID_EXPORT_NAME: string;
    INVALID_EXTERNAL_TEXTURE: string;
    INVALID_MOVIECLIP_TAG: string;
    INVALID_MOVIECLIP_FRAME_TAG: string;
    INVALID_SHAPE_BITMAP_TAG: string;
    INVALID_SHAPE_COUNT: string;
    INVALID_TEXTFIELD_COUNT: string;
    INVALID_MOVIECLIP_FRAME_COUNT: string;
    INVALID_SHAPE_BITMAP_COUNT: string;
    INVALID_FRAME_ELEMENT_OBJECT: string;
    INVALID_BIND_OBJECT: string;
    INVALID_MODIFIER_OBJECT: string;
    INVALID_FILTER: string;
};
/**
 * A generic type for a class constructor that prompts you to select certain options for initialization.
 *
 * @category SWF Types
 */
export declare type ClassConstructor<T> = Partial<Omit<T, {
    [K in keyof T]-?: T[K] extends Function ? K : never;
}[keyof T]>>;
/**
 * Type for XY points array.
 *
 * @category SWF Types
 */
export declare type Points = Array<[number, number]>;
/**
 * Type for SWF progress message.
 *
 * @category SWF Types
 */
export declare type State = (state: STATES, property: any) => void;
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
export declare function IsFrameElement(obj: any): obj is FrameElement;
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
export declare function IsRectangle(obj: any): obj is Rectangle;
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
export declare function IsBind(obj: any): obj is Bind;
/**
 * Interface for JSON serializable objects.
 *
 * @category Dictionary interface
 */
export interface JSONObject {
    [key: string]: string | Object | number | JSONObject[];
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
/**
 * Checks if a given encoding is a valid Buffer encoding. (Throws an exception if check fails)
 *
 * @param encoding The encoding string to check.
 */
export declare function checkEncoding(encoding: BufferEncoding): void;
/**
 * Checks if a given number is a finite integer. (Throws an exception if check fails)
 *
 * @param value The number value to check.
 */
export declare function isFiniteInteger(value: number): boolean;
/**
 * Checks if an offset/length value is valid. (Throws an exception if check fails)
 *
 * @param value The value to check.
 * @param offset True if checking an offset, false if checking a length.
 */
export declare function checkOffsetOrLengthValue(value: any, offset: boolean): void;
/**
 * Checks if a length value is valid. (Throws an exception if check fails)
 *
 * @param length The value to check.
 */
export declare function checkLengthValue(length: any): void;
/**
 * Checks if a offset value is valid. (Throws an exception if check fails)
 *
 * @param offset The value to check.
 */
export declare function checkOffsetValue(offset: any): void;
/**
 * Checks if a target offset value is out of bounds. (Throws an exception if check fails)
 *
 * @param offset The offset value to check.
 * @param buff The ScBuffer instance to check against.
 */
export declare function checkTargetOffset(offset: number, buff: ScBuffer): void;
/**
 * Determines whether a given number is a integer.
 * @param value The number to check.
 */
export declare function isInteger(value: number): boolean;
