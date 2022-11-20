import { Bind, Box, ClassConstructor } from '../interfaces';
import { SupercellSWF } from '../swf';
import { MovieClipFrame } from './frame';
/**
 * Has all blend methods that a bind can have.
 * @category MovieClip
 * @enum
 */
export declare enum BLENDMODES {
    mix = 0,
    hard = 1,
    layer = 2,
    multiply = 3,
    screen = 4,
    lighten = 5,
    difference = 6,
    add = 7
}
/**
 * Objects with animation that user can always see.
 * For transformation, it can use all objects that have IDs, including objects similar to itself.
 * Also has ID.
 * @category MovieClip
 */
export declare class MovieClip {
    /**
     * Frame per second
     */
    framerate: number;
    /**
     * Objects with id whose indices will be used in frames.
     * May also have a name or a specific blending method.
     */
    binds: Bind[];
    /**
     * List of frames in which objects from binds are transformed.
     */
    frames: MovieClipFrame[];
    /**
     *  {@link https://en.wikipedia.org/wiki/9-slice_scaling Scale 9 grid, 9-slice scaling, 9-slicing or 9-patch}
     *  is a sprite resizing technique to proportionally scale an image by splitting it in a grid of nine parts.
     */
    nineSlice: Box;
    /**
     * Current bank index in SupercellSWF.banks.
     * Can be changed or used if all banks are full.
     */
    bankIndex: number;
    /** Indicates whether any bind has a blending method.
     * @deprecated It has not been used in sc files for a very long time.
     */
    hasBlend: boolean;
    constructor(options?: ClassConstructor<MovieClip>);
    /**
     * Method that loads a MovieClip tag from a buffer.
     * @param tag MovieClip tag
     * @param swf SupercellSWF instance
     * @returns Current MovieClip instance
     */
    load(tag: number, swf: SupercellSWF): MovieClip;
    /**
     * Method that writes MovieClip tag to buffer.
     * @param id MovieClip ID
     * @param swf SupercellSWF
     */
    save(id: number, swf: SupercellSWF): void;
    /**
     * Converts indices of matrices and colors in frame elements into objects.
     * @param swf SupercellSWF instance
     * @returns Current MovieClip object
     */
    toTransforms(swf: SupercellSWF): MovieClip;
    /**
     * Converts all matrix and color objects in frame elements to indexes in transformation banks.
     * @param swf SupercellSWF instance
     * @returns Current MovieClip object
     */
    toBank(swf: SupercellSWF): MovieClip;
    toJSON(): {
        framerate: number;
        binds: Bind[];
        hasBlend: boolean;
        frames: MovieClipFrame[];
        nineSlice: Box;
        bankIndex: number;
    };
    fromJSON(data: any): MovieClip;
    /**
     * Clones MovieClip object.
     * @returns Сloned MovieClip
     */
    clone(): MovieClip;
}
