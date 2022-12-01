import { ClassConstructor } from '../utils';
import { SupercellSWF } from '../swf';
/**
 * An object that is used to transform the object's color properties in  MovieClipFrame
 * @category Transformations
 */
export declare class Color {
    /**
     * Alpha addition
     */
    A_add: number;
    /**
     * Red addition
     */
    R_add: number;
    /**
     * Green addition
     */
    G_add: number;
    /**
     * Blue addition
     */
    B_add: number;
    /**
     * Alpha multiply
     */
    A_mul: number;
    /**
     * Red multiply
     */
    R_mul: number;
    /**
     * Green multiply
     */
    G_mul: number;
    /**
     * Blue multiply
     */
    B_mul: number;
    /**
     * @param {IColor} options Initial values
     */
    constructor(options?: ClassConstructor<Color>);
    /**
     * Method that loads a Color transform tag from a buffer.
     * @param {SupercellSWF} swf SupercellSWF object
     * @returns {Color} Current Color instance
     */
    load(tag: number, swf: SupercellSWF): Color;
    /**
     * Method that writes Color transform tag to buffer.
     * @param {SupercellSWF} swf SupercellSWF instance
     */
    save(swf: SupercellSWF): void;
    toJSON(): {
        Add: number[];
        Mul: number[];
    };
    fromJSON(data: any): Color;
    /**
     * Clones Color object.
     * @returns Сloned Color
     */
    clone(): Color;
}
