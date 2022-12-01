import { COMPRESSION, ScBuffer } from './buffer';
import { TransformBank } from './bank';
import { Exports } from './exports';
import { Texture } from './texture';
import { ClassConstructor, JSONObject, State } from './utils';
/**
 * Contains all states that SupercellSWF instance sends during some event.
 *
 * @enum
 */
export declare enum STATES {
    /**
     * Indicates when loading of a file starts. Contains only path to file being loaded.
     */
    loading = 0,
    /**
     * Indicates when file is fully loaded. Contains path to loaded file.
     */
    loadingFinish = 1,
    /**
     * Indicates when file starts to save. Contains path to file being saved.
     */
    saving = 2,
    /**
     * Indicates when file is fully saved. Contains path to saved file.
     */
    savingFinish = 3,
    /**
     * Shows progress of resources loading. Has a download percentage in region from 0 to 100.
     */
    resources_load = 4,
    /**
     * Shows progress of resources saving. Has a save percentage in region from 0 to 100
     */
    resources_save = 5,
    /**
     *  Shows progress of texture loading.
     *  Has an array that contains loading percentage (from 0 to 100)
     *  and index of texture currently being loaded (maybe -1 if number of textures is not known).
     */
    texture_load = 6,
    /**
     *  Shows progress of texture saving.
     *  Has an array that contains saving percentage (from 0 to 100)
     *  and index of texture currently being saved
     */
    texture_save = 7
}
/**
 * Main class that allows you to read and write .sc files.
 *
 * @category Main
 * @example let swf = new SupercellSWF();
 * swf.load(FilePath);
 * swf.save(FilePath);
 */
export declare class SupercellSWF {
    /**
     * Specifies which compression method the file will use. Please note that there is no compression by default, and the file may crash.
    */
    compression: COMPRESSION;
    /**
     * When enabled, uses second file for textures, otherwise writes everything to one file.
     */
    hasExternalTexture: boolean;
    /**
     * When this and hasExternalTexture variable is enabled,
     * creates a texture file with highresPostfix and a lowres file with lowresPostfix, regardless of whether hasLowresTexture is enabled.
     */
    useUncommonTexture: boolean;
    /**
     * Ыpecifies whether file can automatically use lowres file.
     */
    useLowresTexture: boolean;
    /**
     * Storage of export names for movie clips.
     */
    exports: Exports;
    /**
     * Array of textures (or "spritesheets").
     */
    textures: Texture[];
    /**
     * Postfix for uncammon texture.
     */
    highresPostfix: string;
    /**
     * Postfix for uncammon lowres texture.
     */
    lowresPostfix: string;
    /**
     * List with transformation banks whose index is used in movie clips.
     */
    banks: TransformBank[];
    /**
     * Dictionary with all resources that have id.
     */
    resources: {};
    /**
     * A variable that is needed to read and write sc by different classes and methods.
     */
    buffer: ScBuffer;
    private _shapeCount;
    private _movieClipsCount;
    private _textFieldsCount;
    private _modifiersCount;
    constructor(options?: ClassConstructor<SupercellSWF>);
    /**
     * A function to notify about module actions.
     * Useful for custom message processing.
     *
     * @param state State or type of message that module sends
     * @param property Message properties. Usually stores a percentage of progress.
     */
    progress: State;
    /**
     * Loads content of .sc file with texture.
     *
     * @param path Path to .sc file
     */
    load(path: string): SupercellSWF;
    /**
     * Loads content of .sc file only, for example, if you need to edit something only in .sc file.
     *
     * @param path Path to .sc file
     * @returns Current SupercellSWF instance
     */
    loadAsset(path: string): SupercellSWF;
    /**
     * Loads content of _tex.sс file only, for example, for some kind of texture processing.
     *
     * @param path Path to _tex.sc file
     * @returns Current SupercellSWF instance
     */
    loadExternalTexture(path: string): SupercellSWF;
    /**
     * Saves all instance data to a .sc file.
     *
     * @param path Path to .sc file
     */
    save(path: string): void;
    /**
     * Saves instance content only, no external texture if enabled.
     *
     * @param path Path to .sc file
     */
    saveAsset(path: string): void;
    /**
     * Saves all textures to an external _tex.sc file.
     *
     * @param path Path to _tex.sc file
     * @param isLowres Writes low resolution textures
     */
    saveExternalTexture(path: string, isLowres: boolean): void;
    toJSON(includeBanks?: boolean): {
        compression: string;
        hasExternalTexture: boolean;
        useLowresTexture: boolean;
        useUncommonTexture: boolean;
        highresPostfix: string;
        lowresPostfix: string;
        textures: Texture[];
        modifiers: {};
        shapes: {};
        textFields: {};
        movieClips: {};
    };
    fromJSON(data: JSONObject): void;
    /**
     * Clones a SupercellSWF object.
     *
     * @returns {Matrix} SupercellSWF clone
     */
    clone(): SupercellSWF;
    private parseTags;
}
