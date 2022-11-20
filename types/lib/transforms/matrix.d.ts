import { ClassConstructor, Points } from '../interfaces';
import { SupercellSWF } from '../swf';
/**
 * An object that can change size, shape, and position of an object in a MovieClipFrame
 * @category Transformations
 */
export declare class Matrix {
    /**
     * Scale X
     */
    a: number;
    /**
     * Skew X
     */
    b: number;
    /**
     * Skew Y
     */
    c: number;
    /**
     * Scale Y
     */
    d: number;
    /**
     * Translation X
     */
    tx: number;
    /**
     * Translation Y
     */
    ty: number;
    /**
     * When enabled, uses a smaller divisor so matrix becomes more accurate.
     */
    detailed: boolean;
    constructor(options?: ClassConstructor<Matrix>);
    /**
     * Method that loads a Matrix tag from a buffer.
     * @param {number} tag Matrix tag
     * @param {SupercellSWF} swf SupercellSWF instance
     * @returns {Matrix} Current Matrix instance
     */
    load(tag: number, swf: SupercellSWF): Matrix;
    /**
     * Method that writes Matrix tag to buffer
     * @param {SupercellSWF} swf SupercellSWF instance
     */
    save(swf: SupercellSWF): void;
    /**
     * Needed to get rotation on X axis
     * @returns {number} Rotation angle in radians
     */
    getRotationX(): number;
    /**
     * Clockwise rotates matrix by given angle
     * @param {number} angle Angle in radians
     * @returns {Matrix} Current matrix instance
     */
    rotateX(angle: number): Matrix;
    /**
     * Needed to get rotation on Y axis
     * @returns {number} Rotation angle in radians
     */
    getRotationY(): number;
    /**
     * Counterclockwise rotates matrix by given angle
     * @param {number} angle Angle in radians
     * @returns {Matrix} Current matrix instance
     */
    rotateY(angle: number): Matrix;
    /**
     * Needed to get scale factor on X-axis
     * @returns {number} Scale factor on X-axis
     */
    getScaleX(): number;
    /**
     * Multiplies scale of matrix around X-axis by given value
     * @param {number} value Scale factor
     * @returns {Matrix} Current matrix instance
     */
    scaleX(value: number): Matrix;
    /**
     * Needed to get scale factor on Y-axis
     * @returns {number} Scale factor on Y-axis
     */
    getScaleY(): number;
    /**
     * Multiplies scale of matrix along Y-axis by given value
     * @param {number} value Scale factor
     * @returns {Matrix} Current matrix instance
     */
    scaleY(value: number): Matrix;
    /**
     * Needed to get whole scale factor
     * @returns {number} Overall scale factor
     */
    getScale(): number;
    /**
     * Multiplies matrix scale by scale factor
     * @param value Scale factor
     * @returns {Matrix} Current matrix instance
     */
    scale(value: number): Matrix;
    /**
     * Needed to get translation values
     * @returns {[number, number]} Translation x, Translation y
     */
    getTranslation(): [number, number];
    /**
     * Finds transformation between two sets of points
     * @param {Points} from Points from which transformation will be searched
     * @param {Points} to Points for which transformation will be searched
     * @returns {Matrix} Matrix with results
     * @author taken from "affine6p": Masahiro Yoshimoto
     */
    estimate(from: Points, to: Points): Matrix;
    /**
     * Transforms a set of points using current matrix
     * @param {Points} points Points to be transformed
     * @returns {Points} Transformed points
     */
    transform(points: Array<[number, number]>): Points;
    /**
     * Clones a matrix
     * @returns {Matrix} Matrix clone
     */
    clone(): Matrix;
    toJSON(): number[];
    fromJSON(data: any): Matrix;
}
