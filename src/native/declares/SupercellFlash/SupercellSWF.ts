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
   * Saves texture data to _tex.sc
   *
   * @param filepath Path to .sc file
   * @param signature Compression method
   * @returns Current SupercellSWF instance
   */
  saveTexture(filepath: string, signature: CompressionSignature): this;

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

  protected __get_exports__: VectorItemGetter;
  protected __insert_exports__: VectorItemSetter<ExportName>;
  protected __remove_exports__: VectorItemRemove;
  protected __get_length_exports__: VectorGetLength;
  protected __set_length_exports__: VectorSetLength;

  protected __get_shapes__: VectorItemGetter;
  protected __insert_shapes__: VectorItemSetter<Shape>;
  protected __remove_shapes__: VectorItemRemove;
  protected __get_length_shapes__: VectorGetLength;
  protected __set_length_shapes__: VectorSetLength;

  protected __get_textures__: VectorItemGetter;
  protected __insert_textures__: VectorItemSetter<SWFTexture>;
  protected __remove_textures__: VectorItemRemove;
  protected __get_length_textures__: VectorGetLength;
  protected __set_length_textures__: VectorSetLength;

  protected __get_textFields__: VectorItemGetter;
  protected __insert_textFields__: VectorItemSetter<TextField>;
  protected __remove_textFields__: VectorItemRemove;
  protected __get_length_textFields__: VectorGetLength;
  protected __set_length_textFields__: VectorSetLength;

  protected __get_movieClipModifiers__: VectorItemGetter;
  protected __insert_movieClipModifiers__: VectorItemSetter<MovieClipModifier>;
  protected __remove_movieClipModifiers__: VectorItemRemove;
  protected __get_length_movieClipModifiers__: VectorGetLength;
  protected __set_length_movieClipModifiers__: VectorSetLength;

  protected __get_matrixBanks__: VectorItemGetter;
  protected __insert_matrixBanks__: VectorItemSetter<MatrixBank>;
  protected __remove_matrixBanks__: VectorItemRemove;
  protected __get_length_matrixBanks__: VectorGetLength;
  protected __set_length_matrixBanks__: VectorSetLength;

  protected __get_movieClips__: VectorItemGetter;
  protected __insert_movieClips__: VectorItemSetter<MovieClip>;
  protected __remove_movieClips__: VectorItemRemove;
  protected __get_length_movieClips__: VectorGetLength;
  protected __set_length_movieClips__: VectorSetLength;
}
