/* Sub-classes */
import { Export } from "./common/export";
import { Shape } from "./tag/shape";

import { vector_get_length, vector_item_getter, vector_item_remove, vector_item_setter, vector_set_length } from "../../src/node/Utils/Vector";
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
	load(filepath: String): this;


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

	protected __get_export_item__: vector_item_getter<Export>;
	protected __insert_export_item__: vector_item_setter<Export>;
	protected __remove_export_item__: vector_item_remove;
	protected __get_exports_length__: vector_get_length;
	protected __set_exports_length__: vector_set_length;

	/* 
	! Shapes array
	*/

	protected __get_shape__: vector_item_getter<Shape>;
	protected __insert_shape__: vector_item_setter<Shape>;
	protected __remove_shape__: vector_item_remove;
	protected __get_shapes_length__: vector_get_length;
	protected __set_shapes_length__: vector_set_length;

}