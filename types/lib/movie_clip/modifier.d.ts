import { ClassConstructor } from '../interfaces';
import { SupercellSWF } from '../swf';
/** Contains types of all currently known modifiers.
 *  Works when it is in binds and in current frame.
 * @category MovieClip
 * @enum
 */
export declare enum MODIFIERS {
    /** Means that next object in frame is a "Mask layer" */
    MASK = 0,
    /** Means that all next objects in frame will be masked by previous "mask layer" */
    MASKED = 1,
    /** Means that all next objects in frame will not be masked */
    UNMASKED = 2
}
/**
 * Frame modifier. Has an ID and can only be used in MovieClips.
 * Attached to binds and used in frames to indicate some other behavior in frame
 * @category MovieClip
*/
export declare class MovieClipModifier {
    /**
     * Modifier type
     */
    modifier: MODIFIERS;
    constructor(options?: ClassConstructor<MovieClipModifier>);
    /**
     * Method that loads a Modifier tag from a buffer.
     * @param tag Modifier tag
     * @param swf SupercellSWF instance
     * @returns Current Modifier instance
     */
    load(tag: number, swf: SupercellSWF): MovieClipModifier;
    /**
     * Method that writes Modifier tag to buffer.
     * @param id object ID
     * @param swf SupercellSWF instance
    */
    save(id: number, swf: SupercellSWF): void;
    toJSON(): {
        modifier: string;
    };
    fromJSON(data: any): MovieClipModifier;
    /**
     * Clones MovieClipModifier object.
     * @returns Сloned MovieClipModifier
     */
    clone(): MovieClipModifier;
}
