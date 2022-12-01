import { ClassConstructor, FrameElement, JSONObject } from '../utils';
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
export declare class MovieClipFrame {
    /**
     * Name of frame object.
     */
    name: string;
    /**
     * List of objects that will be shown in the frame
     * (Note the order works like layers but in reverse order).
     */
    elements: FrameElement[];
    constructor(options?: ClassConstructor<MovieClipFrame>);
    /**
     * Method that loads a Frame tag from a buffer.
     *
     * @param tag Frame tag
     * @param swf SupercellSWF instance
     *
     * @returns Number of elements
     */
    load(tag: number, swf: SupercellSWF): number;
    /**
     * Method that writes Frame tag to MovieClip buffer.
     *
     * @param buffer ScBuffer instance
    */
    save(buffer: ScBuffer): void;
    /**
     * Clones MovieClipFrame object.
     *
     * @returns Cloned MovieClipFrame
     */
    clone(): MovieClipFrame;
    toJSON(): JSONObject;
    fromJSON(data: JSONObject): MovieClipFrame;
}
