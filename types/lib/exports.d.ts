import { SupercellSWF } from './swf';
/**
 * Class for managing export names
 */
export declare class Exports {
    private idsList;
    private exportsList;
    /**
     * Method that loads a exprot names from a buffer
     * @param {SupercellSWF} swf SupercellSWF instance
     * @returns Current Exports object
     */
    load(swf: SupercellSWF): Exports;
    /**
     * Method that writes export names to buffer
     * @param {SupercellSWF} swf SuperecellSWF instance
     */
    save(swf: SupercellSWF): void;
    /**
     * Adds a new export name
     * @param {number} id Object ID
     * @param {string} name Export name
     * @returns Current Exports object
     */
    addExport(id: number, name: string): Exports;
    /**
     * Removes an ID (and all export names associated with it) or an export name
     * @param {string | number} toRemove ID or export name to be removed
     * @returns Current Exports object
     */
    removeExport(toRemove: string | number): Exports;
    /**
     * Gives all export names
     * @returns {Array<string>} Array of export names
     */
    getExports(): Array<string>;
    /**
     * Gives all IDs
     * @returns {Array<number>} Array of IDs
     */
    getIds(): Array<number>;
    /**
     * Returns all export names associated with given ID
     * @param {number} id Object ID
     * @returns {Array<string>} Array of export names
     */
    getExportsById(id: number): string[] | undefined;
    /**
     * Returns ID of given export name. Returns undefind if name is not found.
     * @param {string} exportName Export name whose ID need to find
     * @returns {number} Export name ID
     */
    getExportId(exportName: string): number | undefined;
    /**
     * Clones a Exports storage object
     * @returns {Matrix} Exports clone
     */
    clone(): Exports;
}
