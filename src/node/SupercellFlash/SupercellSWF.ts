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
      getItem: this.__get_exports__,
      insertItem: this.__insert_exports__,
      removeItem: this.__remove_exports__,
      getLength: this.__get_length_exports__,
      setLength: this.__set_length_exports__,
    },
    this
  );

  readonly shapes = new Vector<SupercellSWF, Shape>(
    {
      Initializer: Shape,
      getItem: this.__get_shapes__,
      insertItem: this.__insert_shapes__,
      removeItem: this.__remove_shapes__,
      getLength: this.__get_length_shapes__,
      setLength: this.__set_length_shapes__,
    },
    this
  );

  readonly textures = new Vector<SupercellSWF, SWFTexture>(
    {
      Initializer: SWFTexture,
      getItem: this.__get_textures__,
      insertItem: this.__insert_textures__,
      removeItem: this.__remove_textures__,
      getLength: this.__get_length_textures__,
      setLength: this.__set_length_textures__,
    },
    this
  );

  readonly textFields = new Vector<SupercellSWF, TextField>(
    {
      Initializer: TextField,
      getItem: this.__get_textFields__,
      insertItem: this.__insert_textFields__,
      removeItem: this.__remove_textFields__,
      getLength: this.__get_length_textFields__,
      setLength: this.__set_length_textFields__,
    },
    this
  );

  readonly movieClipModifiers = new Vector<SupercellSWF, MovieClipModifier>(
    {
      Initializer: MovieClipModifier,
      getItem: this.__get_movieClipModifiers__,
      insertItem: this.__insert_movieClipModifiers__,
      removeItem: this.__remove_movieClipModifiers__,
      getLength: this.__get_length_movieClipModifiers__,
      setLength: this.__set_length_movieClipModifiers__,
    },
    this
  );

  readonly matrixBanks = new Vector<SupercellSWF, MatrixBank>(
    {
      Initializer: MatrixBank,
      getItem: this.__get_matrixBanks__,
      insertItem: this.__insert_matrixBanks__,
      removeItem: this.__remove_matrixBanks__,
      getLength: this.__get_length_matrixBanks__,
      setLength: this.__set_length_matrixBanks__,
    },
    this
  );

  readonly movieClips = new Vector<SupercellSWF, MovieClip>(
    {
      Initializer: MovieClip,
      getItem: this.__get_movieClips__,
      insertItem: this.__insert_movieClips__,
      removeItem: this.__remove_movieClips__,
      getLength: this.__get_length_movieClips__,
      setLength: this.__set_length_movieClips__,
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
      this.movieClips.length
    } items ] >`;
  }

  toJSON(): object {
    return {
      useExternalTexture: this.useExternalTexture,
      useMultiResTexture: this.useMultiResTexture,
      useLowResTexture: this.useLowResTexture,
      multiResFileSuffix: this.multiResFileSuffix,
      lowResFileSuffix: this.lowResFileSuffix,
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
