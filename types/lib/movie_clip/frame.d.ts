import { ClassConstructor, FrameElement } from '../interfaces';
import { ScBuffer } from '../buffer';
import { SupercellSWF } from '../swf';
/** Frame of MovieClip that is needed to transform objects on user screen.
 * @category MovieClip
*/
export declare class MovieClipFrame {
    /**
     * Name of frame object
     */
    name: string;
    /**
     * List of objects that will be shown in the frame
     * (Note the order works like layers but in reverse order)
     */
    elements: FrameElement[];
    constructor(options?: ClassConstructor<MovieClipFrame>);
    /**
     * Method that loads a Frame tag from a buffer.
     * @param tag Frame tag
     * @param swf SupercellSWF instance
     * @returns Number of elements
     */
    load(tag: number, swf: SupercellSWF): number;
    /**
     * Method that writes Frame tag to buffer.
     * @param buffer ScBuffer instance
    */
    save(buffer: ScBuffer): void;
    toJSON(): {
        name: string;
        elements: FrameElement[];
    };
    fromJSON(data: any): MovieClipFrame;
    /**
     * Clones MovieClipFrame object.
     * @returns Cloned MovieClipFrame
     */
    clone(): MovieClipFrame;
}
