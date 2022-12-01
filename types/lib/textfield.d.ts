import { ClassConstructor } from './utils';
import { SupercellSWF } from './swf';
export declare class TextField {
    /**
     * Name of font. Fonts are used from "fonts" folder or from system fonts
     */
    fontName: string;
    /**
     * RGBA font color
     */
    fontColor: number[];
    /**
     * RGBA outline color
     */
    outlineColor: number[];
    /**
     * Font size
     */
    fontSize: number;
    /**
     * Something like text centering, still not clear
     */
    fontAlign: number;
    /**
     * Use bold font type
     */
    bold: boolean;
    /**
     * Use italic font type
     */
    italic: boolean;
    /**
     * Enables ability to make many lines in TextField object
     */
    multiline: boolean;
    /**
     * Enables text stroke
     */
    outline: boolean;
    /**
     * Left corner position
     */
    leftCorner: number;
    /**
     * Top corner position
     */
    topCorner: number;
    /**
     * Right corner position
     */
    rightCorner: number;
    /**
     * Bottom corner position
     */
    bottomCorner: number;
    /**
     * Placeholer text
     */
    text: string;
    flag1: boolean;
    flag2: boolean;
    flag3: boolean;
    c1: number;
    c2: number;
    constructor(options?: ClassConstructor<TextField>);
    /**
     * Method that loads a TextField tag from a buffer.
     * @param {number} tag TextField tag
     * @param {SupercellSWF} swf SupercellSWF object
     * @returns {TextField} Current TextField instance
     */
    load(tag: number, swf: SupercellSWF): TextField;
    fromJSON(data: any): TextField;
    /**
     * Method that writes TextField tag to buffer.
     * @param id TextField ID
     * @param swf SupercellSWF instance
     */
    save(id: number, swf: SupercellSWF): void;
    clone(): TextField;
}
