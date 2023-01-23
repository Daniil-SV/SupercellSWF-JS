import { CompressionSignature } from "./SupercellCompression";

export declare class SupercellSWF {
    /**
	 * Specifies which compression method the file will use. Please note that there is no compression by default, and the file may crash.
	*/
    compression: CompressionSignature;

    /**
	 * When enabled, uses second file for textures, otherwise writes everything to one file.
	 */
	hasExternalTexture: bool;

	/**
	 * When this and hasExternalTexture variable is enabled,
	 * creates a texture file with highresPostfix and a lowres file with lowresPostfix, regardless of whether hasLowresTexture is enabled.
	 */
	useMultiResTexture: bool; // TODO

	/**
	 * Ыpecifies whether file can automatically use lowres file.
	 */
	useLowresTexture: bool; // TODO

    /**
	 * Postfix for uncammon texture.
	 */
	multiResTexturePostfix: string;

	/**
	 * Postfix for uncammon lowres texture.
	 */
	lowResTexturePostfix: string;

    /**
	 * Loads content of .sc file.
	 *
	 * @param filepath Path to .sc file
	 */
    load(filepath: String): void;
}