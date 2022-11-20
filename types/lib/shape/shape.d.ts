import { SupercellSWF } from '../swf';
import { ShapeDrawCommand } from './ShapeDrawCommand';
/**
 * Container for graphic objects. Has an ID for use in MovieClip.
 * @category Shape
 */
export declare class Shape {
    /**
     *  List of ShapeDrawCommand objects (aka bitmaps).
    */
    bitmaps: ShapeDrawCommand[];
    constructor(options?: Partial<Shape>);
    /**
     * Method that loads a Shape tag from a buffer.
     * @param tag Shape tag
     * @param swf SupercellSWF object
     * @returns Current Shape instance
     */
    load(tag: number, swf: SupercellSWF): Shape;
    /**
     * Method that writes Shape tag to buffer.
     * @param {number} id Shape ID
     * @param {SupercellSWF} swf SupercellSWF object
     */
    save(id: number, swf: SupercellSWF): void;
    toJSON(): {
        bitmaps: ShapeDrawCommand[];
    };
    fromJSON(data: any): Shape;
    /**
     * Clones Shape object.
     * @returns Сloned Shape
     */
    clone(): Shape;
}
