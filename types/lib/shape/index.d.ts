import { JSONObject } from '../utils';
import { SupercellSWF } from '../swf';
import { ShapeDrawCommand } from './ShapeDrawCommand';
/**
 * Container for graphic objects. Has an ID for use in MovieClip.
 *
 * @category Shape
 * @example
 * // Initializing a shape with one bitmap
 * let shape = new Shape({bitmaps: [
 * 		new ShapeDrawCommand({
 * 			textureIndex: 0,
 * 			normalized: true,	//OR : false, and UV: [[0, 0], [128, 0], [128, 128], [0, 128]] // Points on "texture" (Imagine that it is 128x128)
 * 			uvCoords: [[0, 0], [65535, 0], [65535, 65535], [0, 65535]]
 * 			xyCoords: [[0, 0], [512, 0], [512, 512], [0, 512]]
 * 		})
 * 	]});
 */
export declare class Shape {
    /**
     *  List of ShapeDrawCommand objects (aka bitmaps).
    */
    bitmaps: ShapeDrawCommand[];
    constructor(options?: Partial<Shape>);
    /**
     * Method that loads a Shape tag from a buffer.
     *
     * @param tag Shape tag
     * @param swf SupercellSWF object
     *
     * @returns Current Shape instance
     */
    load(tag: number, swf: SupercellSWF): Shape;
    /**
     * Method that writes Shape tag to SWF buffer.
     *
     * @param {number} id Shape ID
     * @param {SupercellSWF} swf SupercellSWF object
     */
    save(id: number, swf: SupercellSWF): void;
    /**
     * Clones Shape object.
     *
     * @returns Сloned Shape
     */
    clone(): Shape;
    toJSON(): {
        bitmaps: ShapeDrawCommand[];
    };
    fromJSON(data: JSONObject): Shape;
}
