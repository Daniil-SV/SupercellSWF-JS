import { CompressionSignature } from "./SupercellCompression";

export declare class SupercellSWF {
	/**
	 * Specifies which compression method the file will use. Please note that there is no compression by default, and the file may crash.
	*/
	compression: CompressionSignature;

	/**
	 * When enabled, uses second file for textures, otherwise writes everything to one file.
	 */
	hasExternalTexture: boolean;

	/**
	 * When this and hasExternalTexture variable is enabled,
	 * creates a texture file with highresPostfix and a lowres file with lowresPostfix, regardless of whether hasLowresTexture is enabled.
	 */
	useMultiResTexture: boolean;

	/**
	 * Ыpecifies whether file can automatically use lowres file.
	 */
	useLowresTexture: boolean;

	/**
	 * Suffix for uncammon texture.
	 */
	multiResTextureSuffix: string;

	/**
	 * Suffix for uncammon lowres texture.
	 */
	lowResTextureSuffix: string;

	/* 
	! Functions !
	*/

	/**
	 * Loads content of .sc file.
	 *
	 * @param filepath Path to .sc file
	 * @returns Current SupercellSWF instance
	 */
	load(filepath: String): void;

	/**
     * Loads content of .sc file only, for example, if you need to edit something only in .sc file.
     *
     * @param path Path to .sc file
     * @returns Current SupercellSWF instance
     */
	loadAsset(path: string): void;
}