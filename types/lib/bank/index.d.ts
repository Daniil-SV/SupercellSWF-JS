import { ClassConstructor } from '../utils';
import { SupercellSWF } from '../swf';
import { Matrix } from './matrix';
import { Color } from './color';
/**
 * An object that contains all the transformations for the movie clips.
 * It is used because maximum number of transformations (uint16 - 65535) is sometimes not enough.
 * @category Transformations
 */
export declare class TransformBank {
    /**
     * Array with matrices that bank has
     */
    matrices: Matrix[];
    /**
     * Array with color transforms that bank has
     */
    colors: Color[];
    constructor(options?: ClassConstructor<TransformBank>);
    /**
     * Method that loads a Bank tag from a buffer.
     * @param swf SupercellSWF object
     * @returns Current TransformBank instance
     */
    load(swf: SupercellSWF): TransformBank;
    /**
     * Method that writes Bank tag to buffer.
     * @param swf SupercellSWF instance
     * @param asTag Indicates whether bank should be written as a tag
     */
    save(swf: SupercellSWF, asTag?: boolean): void;
    /**
     * Adds a matrix to bank and returns its index in matrix array
     * @param matrix Matrix instance
     * @returns Matrix index. Returns undefined if matrix cannot be placed here
     */
    addMatrix(matrix: Matrix | undefined): number | undefined;
    /**
     * Adds a color transform to bank and returns its index in color array
     * @param color Color instance
     * @returns Color index. Returns undefined if color cannot be placed here
     */
    addColor(color: Color | undefined): number | undefined;
    /**
     * Determines whether a list of transformations can fit into a bank.
     * @param matrices Matrices array
     * @param colors Colors array
     * @returns
     */
    canStoreTransforms(matrices?: Matrix[], colors?: Color[]): boolean;
    cleanup(swf: SupercellSWF): TransformBank;
    fromJSON(data: any): TransformBank;
    /**
     * Clones Bank object.
     * @returns Сloned Bank
     */
    clone(): TransformBank;
}
