import { BLENDMODES } from './movie_clip/movie_clip';
import { STATES } from './swf';
import { Color } from './transforms/color';
import { Matrix } from './transforms/matrix';
/**
 * A generic type for a class constructor that prompts you to select certain options for initialization
 * @category SWF Types
 */
export declare type ClassConstructor<T> = Partial<Omit<T, {
    [K in keyof T]-?: T[K] extends Function ? K : never;
}[keyof T]>>;
/**
 * Type for XY points array
 * @category SWF Types
 */
export declare type Points = Array<[number, number]>;
/**
 * Type for SWF progress message
 * @category SWF Types
 */
export declare type State = (state: STATES, property: any) => void;
/**
 * Interface for MovieClip frame elements.
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
/**
 * Box interface. Used in MovieClip Nine Slice and some DrawCommand functions
 * @category Dictionary interface
 */
export interface Box {
    /**
     * X point
     */
    x: number;
    /**
     * Y point
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
/**
 * Interface for MovieClip bind.
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
