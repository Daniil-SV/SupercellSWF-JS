import Image from 'image-js';
import { JSONObject } from '../utils';
import { SupercellSWF } from '../swf';
/**
 * Has pixel types for all texture types.
 *
 * @category Texture
 */
export declare const CHANNEL_FORMATS: {
    [textureType: string]: string[];
};
/**
 * List of all {@link https://www.learnopengles.com/android-lesson-six-an-introduction-to-texture-filtering/ texture filters}.
 *
 * @enum
 * @category Texture
 */
export declare enum FILTERS {
    GL_LINEAR = 0,
    GL_NEAREST = 1,
    GL_LINEAR_MIPMAP_NEAREST = 2
}
/**
 * Texture (or sprite sheet) which is used in sc file for ShapeDrawCommand.
 *
 * @category Texture
 * @example
 * // Initializing Texture Object
 * let atlas = await Image.load("example.png");
 * let texture = new Texture({
 * 		pixelFormat = CHANNEL_FORMATS["RGBA"][1], // "RGBA4"
 * 		magFilter = FILTERS.GL_NEAREST,
 * 		minFilter = FILTERS.GL_NEAREST, //Turn off pixel smoothing. Maybe.
 * 		linear: true,
 * 		downscaling: true,
 * 		image: atlas
 * });
 */
export declare class Texture {
    /**
     * {@link https://www.khronos.org/opengl/wiki/Image_Format Texture pixel type}.
     */
    pixelFormat: string;
    /**
     * {@link https://gdbooks.gitbooks.io/legacyopengl/content/Chapter7/MinMag.html Mag filter}.
     */
    magFilter: FILTERS;
    /**
     * {@link https://gdbooks.gitbooks.io/legacyopengl/content/Chapter7/MinMag.html Min filter}.
     */
    minFilter: FILTERS;
    /**
     * If enabled, writes a pixel linearly. Otherwise, it uses a special pixel blocking system.
     */
    linear: boolean;
    /**
     * Allows you to use mipmaps on texture.
     */
    downscaling: boolean;
    /**
     * Texture image.
     */
    image: Image;
    /**
     * Texture channels count.
     */
    get channels(): number;
    set channels(count: number);
    /**
     * Texture image width.
     */
    get width(): number;
    set width(newWidth: number);
    /**
     * Texture image height.
     */
    get height(): number;
    set height(newHeigth: number);
    constructor(options?: Partial<Texture>);
    /**
     * Method that loads a Texture tag from a buffer.
     *
     * @param tag Texture tag
     * @param swf SupercellSWF instance
     * @param hasData Indicates whether the tag has pixel information
     *
     * @returns Current Texture instance
     */
    load(tag: number, swf: SupercellSWF, hasData: boolean): Texture;
    /**
     * Method that writes Texture tag to buffer.
     *
     * @param swf SupercellSWF instance
     * @param hasData Indicates whether the tag has pixel information
     *
     * @param isLowres If enabled, writes 2 times less texture
     */
    save(swf: SupercellSWF, hasData: boolean, isLowres?: boolean): void;
    /**
     * Clones Texture object.
     *
     * @returns Сloned Texture
     */
    clone(): Texture;
    toJSON(): {
        pixelFormat: string;
        linear: boolean;
        downscaling: boolean;
        magFilter: string;
        minFilter: string;
        width: number;
        height: number;
    };
    fromJSON(data: JSONObject): Texture;
}
