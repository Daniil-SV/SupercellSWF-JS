import { SupercellSWF } from '../swf';
import { Matrix } from '../transforms/matrix';
import Image from 'image-js';
import { ScBuffer } from '../buffer';
import { Points } from '../interfaces';
/**
 * Graphic object or 2D mesh. Uses textures to "cut" sprite and use it in Shape
 * @category Shape
 */
export declare class ShapeDrawCommand {
    /**
     * Texture index in SupercellSWF.textures.
    */
    textureIndex: number;
    /**
     * Coordinates for view from the game.
     * Must contain at least 3 point.
    */
    xyCoords: Points;
    /**
     * {@link https://en.wikipedia.org/wiki/UV_mapping UV} texture coordinates.
     *  Please note, they can be normalized, and to get points on texture, you may need to use "denormalize" method.
     *  Must contain at least 3 point.
     */
    uvCoords: Points;
    /**
     * @experimental It is still not very clear why this boolean is needed,
     *  most likely it is to specify "MaxRects" sprite packing method
     */
    maxRects: boolean;
    /**
     * Shows if UV is normalized.
     */
    normalized: boolean;
    constructor(options?: Partial<ShapeDrawCommand>);
    /**
     * Calculates nearest angle between DrawCommand coordinates. Custom coordinates can also be specified for special cases.
     * @param uv UV coordinates
     * @param xy XY coordinates
     * @returns Returns a list that consists of
     *  nearest rotation angle and a boolean that determines if sprite should flip along X axis
     */
    static getNearest(uv: Points, xy: Points): [number, boolean];
    /**
     * Calculates a bounding box for coordinates
     * @param coords coordinates from which you need to get box
     * @returns List with values in format [x, y, width, height]
     */
    static getBoundingBox(coords: Points): [number, number, number, number];
    /**
     * Calculates transformation matrix for given points.
     * @param uv UV coordinates
     * @param xy XY coordinates
     * @param useNearest If enabled, calculates transformation matrix subtracting this angle
     * @returns List of values in format
     * [Transformation Matrix , transformed points at start position for transform, nearest angle, boolean for mirroring]
     */
    static estimate(uv: Points, xy: Points, useNearest?: boolean): [Matrix, Points, number, boolean];
    /**
     * Method that loads a DrawCommand tag from a buffer.
     * @param tag ShapeDrawCommand tag
     * @param swf SupercellSWF instance
     * @retur {@link ShapeDrawCommand Draw command} current instance
     */
    load(tag: number, swf: SupercellSWF): ShapeDrawCommand;
    /**
     * Method that writes DrawCommand tag to buffer.
     * @param buffer ScBuffer instance
     * @return Current ShapeDrawCommand instance
     */
    save(buffer: ScBuffer): ShapeDrawCommand;
    /**
     * Normalizes UV coordinates and turns them into values from 0 to 65535
     * @param swf SupercellSWF instance
     */
    normalize(swf: SupercellSWF): Points;
    /**
     * Denormalizes UV coordinates and turns them into points on texture
     * @param swf SupercellSWF object
     */
    denormalize(swf: SupercellSWF): Points;
    /**
     * @param swf SupercellSWF instance
     * @param useNearest Whether to use nearest angle. Making better looking sprites.
     * @returns Returns Image-js instance
     */
    getImage(swf: SupercellSWF, useNearest?: boolean): Image;
    toJSON(): {
        textureIndex: number;
        uvCoords: Points;
        normalized: boolean;
        xyCoords: Points;
        maxRects: boolean;
    };
    fromJSON(data: any): ShapeDrawCommand;
    /**
     * Clones ShapeDrawCommand object.
     * @returns Сloned ShapeDrawCommand
     */
    clone(): ShapeDrawCommand;
}
