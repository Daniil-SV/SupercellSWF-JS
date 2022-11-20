import { Points } from '../types';
import { ShapeDrawCommand } from './ShapeDrawCommand';
/**
 * Interface for Shape
 * @category Class interface
 */
export interface IShape {
    bitmaps: ShapeDrawCommand[];
}
/**
 * Interface for ShapeDrawCommand
 * @category Class interface
 */
export interface IShapeDrawCommand {
    textureIndex: number;
    xyCoords: Points;
    uvCoords: Points;
    maxRects: boolean;
    normalized: boolean;
}
