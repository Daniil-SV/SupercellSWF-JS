import * as util from "util";

import { NATIVE_SUPERCELL_SWF } from "../../native";
import { Vector } from "../Utils/Vector";

import { ExportName } from "./objects/ExportName";
import { MovieClip } from "./objects/MovieClip";
import { MovieClipModifier } from "./objects/MovieClipModifier";
import { Shape } from "./objects/Shape";
import { SWFTexture } from "./objects/SWFTexture";
import { TextField } from "./objects/TextField";
import { MatrixBank } from "./transformation/MatrixBank";

export class SupercellSWF extends NATIVE_SUPERCELL_SWF {
  readonly exports = new Vector<SupercellSWF, ExportName>(
    {
      Initializer: ExportName,
      getItem: this.__get_export_item__,
      insertItem: this.__insert_export_item__,
      removeItem: this.__remove_export_item__,
      getLength: this.__get_exports_length__,
      setLength: this.__set_exports_length__,
    },
    this
  );

  readonly shapes = new Vector<SupercellSWF, Shape>(
    {
      Initializer: Shape,
      getItem: this.__get_shape__,
      insertItem: this.__insert_shape__,
      removeItem: this.__remove_shape__,
      getLength: this.__get_shapes_length__,
      setLength: this.__set_shapes_length__,
    },
    this
  );

  readonly textures = new Vector<SupercellSWF, SWFTexture>(
    {
      Initializer: SWFTexture,
      getItem: this.__get_texture__,
      insertItem: this.__insert_texture__,
      removeItem: this.__remove_texture__,
      getLength: this.__get_texture_length__,
      setLength: this.__set_texture_length__,
    },
    this
  );

  readonly textFields = new Vector<SupercellSWF, TextField>(
    {
      Initializer: TextField,
      getItem: this.__get_textfield__,
      insertItem: this.__insert_textfield__,
      removeItem: this.__remove_textfield__,
      getLength: this.__get_textfields_length__,
      setLength: this.__set_textfields_length__,
    },
    this
  );

  readonly movieClipModifiers = new Vector<SupercellSWF, MovieClipModifier>(
    {
      Initializer: MovieClipModifier,
      getItem: this.__get_modifier__,
      insertItem: this.__insert_modifier__,
      removeItem: this.__remove_modifier__,
      getLength: this.__get_modifiers_length__,
      setLength: this.__set_modifiers_length__,
    },
    this
  );

  readonly matrixBanks = new Vector<SupercellSWF, MatrixBank>(
    {
      Initializer: MatrixBank,
      getItem: this.__get_bank__,
      insertItem: this.__insert_bank__,
      removeItem: this.__remove_bank__,
      getLength: this.__get_banks_length__,
      setLength: this.__set_banks_length__,
    },
    this
  );

  readonly movieClips = new Vector<SupercellSWF, MovieClip>(
    {
      Initializer: MovieClip,
      getItem: this.__get_movieclip__,
      insertItem: this.__insert_movieclip__,
      removeItem: this.__remove_bank__,
      getLength: this.__get_movieclips_length__,
      setLength: this.__set_movieclips_length__,
    },
    this
  );

  [Symbol.toStringTag](): string {
    return "SupercellSWF";
  }

  [util.inspect.custom](): string {
    return `<${this[Symbol.toStringTag]()} exports: [ ${
      this.exports.length
    } items ], textures: [ ${this.textures.length} items ], shapes: [ ${
      this.shapes.length
    } items ] textFields; [ ${this.textFields.length} items ], modifiers: [${
      this.movieClipModifiers.length
    } items ], banks: [ ${this.matrixBanks.length} items ], movieClips: [ ${
      this.textFields.length
    } items ] >`;
  }

  toJSON(): object {
    return {
      useExternalTexture: this.useExternalTexture,
      useMultiResTexture: this.useMultiResTexture,
      useLowResTexture: this.useLowResTexture,
      multiResSuffix: this.multiResTextureSuffix,
      lowResSuffix: this.lowResTextureSuffix,
      exports: this.exports,
      textures: this.textures,
      movieClipModifiers: this.movieClipModifiers,
      shapes: this.shapes,
      textFields: this.textFields,
      movieClips: this.movieClips,
      matrixBanks: this.matrixBanks,
    };
  }
}
