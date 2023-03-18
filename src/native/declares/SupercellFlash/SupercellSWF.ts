import {
  type Indexable,
  type VectorGetLength,
  type VectorItemGetter,
  type VectorItemRemove,
  type VectorItemSetter,
  type VectorSetLength,
} from "../../../node/Utils/Vector";
import { type CompressionSignature } from "../SupercellCompression";

import { type ExportName } from "./objects/ExportName";
import { type MovieClip } from "./objects/MovieClip";
import { type MovieClipModifier } from "./objects/MovieClipModifier";
import { type Shape } from "./objects/Shape";
import { type SWFTexture } from "./objects/SWFTexture";
import { type TextField } from "./objects/TextField";
import { type MatrixBank } from "./transformation/MatrixBank";

export declare class SupercellSWF {
  constructor(obj?: {
    useExternalTexture?: boolean;
    useMultiResTexture?: boolean;
    useLowResTexture?: boolean;
    multiResTextureSuffix?: string;
    lowResTextureSuffix?: string;
    exports?: Indexable<ExportName>;
    textures?: Indexable<SWFTexture>;
    shapes?: Indexable<Shape>;
    textFields?: Indexable<TextField>;
    movieClipModifiers?: Indexable<MovieClipModifier>;
    matrixBanks?: Indexable<MatrixBank>;
    movieClips?: Indexable<MovieClip>;
  });

  /**
   * Loads content of .sc file.
   *
   * @param filepath Path to .sc file
   * @returns Current SupercellSWF instance
   */
  load(filepath: string): this;
  /**
   * Loads content of .sc file, without texture data.
   *
   * @param filepath Path to .sc file
   * @returns Current SupercellSWF instance
   */
  loadAsset(filepath: string): this;

  /**
   * Loads texture data from _tex.sc file.
   *
   * @param filepath Path to .sc file
   * @returns Current SupercellSWF instance
   */
  loadTexture(filepath: string): this;

  /**
   * Saves all data to .sc file
   *
   * @param filepath Path to .sc file
   * @param signature Compression method
   * @returns Current SupercellSWF instance
   */
  save(filepath: string, signature: CompressionSignature): this;

  /**
   * Saves all data to .sc file without texture
   *
   * @param filepath Path to .sc file
   * @param signature Compression method
   * @returns Current SupercellSWF instance
   */
  saveAsset(filepath: string, signature: CompressionSignature): this;

  /**
   * Saves texture data to _tex.sc
   *
   * @param filepath Path to .sc file
   * @param isLowres If enabled, writes texture in lower resolution
   * @param signature Compression method
   * @returns Current SupercellSWF instance
   */
  saveTexture(
    filepath: string,
    isLowres: boolean,
    signature: CompressionSignature
  ): this;

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

  protected __get_export_item__: VectorItemGetter;
  protected __insert_export_item__: VectorItemSetter<ExportName>;
  protected __remove_export_item__: VectorItemRemove;
  protected __get_exports_length__: VectorGetLength;
  protected __set_exports_length__: VectorSetLength;

  protected __get_shape__: VectorItemGetter;
  protected __insert_shape__: VectorItemSetter<Shape>;
  protected __remove_shape__: VectorItemRemove;
  protected __get_shapes_length__: VectorGetLength;
  protected __set_shapes_length__: VectorSetLength;

  protected __get_texture__: VectorItemGetter;
  protected __insert_texture__: VectorItemSetter<SWFTexture>;
  protected __remove_texture__: VectorItemRemove;
  protected __get_texture_length__: VectorGetLength;
  protected __set_texture_length__: VectorSetLength;

  protected __get_textfield__: VectorItemGetter;
  protected __insert_textfield__: VectorItemSetter<TextField>;
  protected __remove_textfield__: VectorItemRemove;
  protected __get_textfields_length__: VectorGetLength;
  protected __set_textfields_length__: VectorSetLength;

  protected __get_modifier__: VectorItemGetter;
  protected __insert_modifier__: VectorItemSetter<MovieClipModifier>;
  protected __remove_modifier__: VectorItemRemove;
  protected __get_modifiers_length__: VectorGetLength;
  protected __set_modifiers_length__: VectorSetLength;

  protected __get_bank__: VectorItemGetter;
  protected __insert_bank__: VectorItemSetter<MatrixBank>;
  protected __remove_bank__: VectorItemRemove;
  protected __get_banks_length__: VectorGetLength;
  protected __set_banks_length__: VectorSetLength;

  protected __get_movieclip__: VectorItemGetter;
  protected __insert_movieclip__: VectorItemSetter<MovieClip>;
  protected __remove_movieclip__: VectorItemRemove;
  protected __get_movieclips_length__: VectorGetLength;
  protected __set_movieclips_length__: VectorSetLength;
}
