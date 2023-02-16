/* Sub-classes */
import { Export } from "./common/exports";

import { vector_get_length, vector_items_push_back, vector_item_getter, vector_set_length } from "../../src/node/Vector";
import { CompressionSignature } from "../SupercellCompression";

export declare class SupercellSWF {
	/* 
	* Functions
	*/

	/**
	 * Loads content of .sc file.
	 *
	 * @param filepath Path to .sc file
	 * @returns Current SupercellSWF instance
	 */
	load(filepath: String): void;


	/* 
	& Simple members
	*/
	/**
	 * Specifies which compression method the file will use. Please note that there is no compression by default, and the file may crash.
	*/
	compression: CompressionSignature;

	/**
	 * When enabled, uses second file for textures, otherwise writes everything to one file.
	 */
	useExternalTexture: boolean;

	/**
	 * When this and hasExternalTexture variable is enabled,
	 * creates a texture file with highresPostfix and a lowres file with lowresPostfix, regardless of whether hasLowresTexture is enabled.
	 */
	useMultiResTexture: boolean;

	/**
	 * Ыpecifies whether file can automatically use lowres file.
	 */
	useLowResTexture: boolean;

	/**
	 * Suffix for uncammon texture.
	 */
	multiResTextureSuffix: string;

	/**
	 * Suffix for uncammon lowres texture.
	 */
	lowResTextureSuffix: string;

	/* 
	! Arrays getters
	*/

	/* 
	! Exports array
	*/

	protected get_export_item: vector_item_getter<Export>;
	protected push_export_items: vector_items_push_back<Export>;
	protected get_exports_length: vector_get_length;
	protected set_exports_length: vector_set_length;

}