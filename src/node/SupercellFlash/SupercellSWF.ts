import * as util from "util";

import {
  type NATIVE_EXPORT,
  type NATIVE_MATRIX_BANK,
  type NATIVE_MOVIECLIP,
  type NATIVE_MOVIECLIP_MODIFIER,
  type NATIVE_SHAPE,
  NATIVE_SUPERCELL_SWF,
  type NATIVE_SWFTEXTURE,
  type NATIVE_TEXTFIELD,
} from "../../native";
import { assert_item } from "../Utils/utils";
import { Vector } from "../Utils/Vector";

import { Export } from "./common/Export";
import { MatrixBank } from "./tag/MatrixBank";
import { MovieClip } from "./tag/MovieClip";
import { MovieClipModifier } from "./tag/MovieClipModifier";
import { Shape } from "./tag/Shape";
import { SWFTexture } from "./tag/SWFTexture";
import { TextField } from "./tag/TextField";

export class SupercellSWF extends NATIVE_SUPERCELL_SWF {
  readonly exports = new Vector<SupercellSWF, Export>(
    {
      getItem: function (index: number) {
        return assert_item<typeof NATIVE_EXPORT, Export>(
          this["__get_export_item__"](index),
          Export
        );
      },
      insertItem: this.__insert_export_item__,
      removeItem: this.__remove_export_item__,
      getLength: this.__get_exports_length__,
      setLength: this.__set_exports_length__,
    },
    this
  );

  readonly shapes = new Vector<SupercellSWF, Shape>(
    {
      getItem: function (index: number) {
        return assert_item<typeof NATIVE_SHAPE, Shape>(
          this["__get_shape__"](index),
          Shape
        );
      },
      insertItem: this.__insert_shape__,
      removeItem: this.__remove_shape__,
      getLength: this.__get_shapes_length__,
      setLength: this.__set_shapes_length__,
    },
    this
  );

  readonly textures = new Vector<SupercellSWF, SWFTexture>(
    {
      getItem: function (index: number) {
        return assert_item<typeof NATIVE_SWFTEXTURE, SWFTexture>(
          this["__get_texture__"](index),
          SWFTexture
        );
      },
      insertItem: this.__insert_texture__,
      removeItem: this.__remove_texture__,
      getLength: this.__get_texture_length__,
      setLength: this.__set_texture_length__,
    },
    this
  );

  readonly textFields = new Vector<SupercellSWF, TextField>(
    {
      getItem: function (index: number) {
        return assert_item<typeof NATIVE_TEXTFIELD, TextField>(
          this["__get_textfield__"](index),
          TextField
        );
      },
      insertItem: this.__insert_textfield__,
      removeItem: this.__remove_textfield__,
      getLength: this.__get_textfields_length__,
      setLength: this.__set_textfields_length__,
    },
    this
  );

  readonly movieClipModifiers = new Vector<SupercellSWF, MovieClipModifier>(
    {
      getItem: function (index: number) {
        return assert_item<typeof NATIVE_MOVIECLIP_MODIFIER, MovieClipModifier>(
          this["__get_modifier__"](index),
          MovieClipModifier
        );
      },
      insertItem: this.__insert_modifier__,
      removeItem: this.__remove_modifier__,
      getLength: this.__get_modifiers_length__,
      setLength: this.__set_modifiers_length__,
    },
    this
  );

  readonly matrixBanks = new Vector<SupercellSWF, MatrixBank>(
    {
      getItem: function (index: number) {
        return assert_item<typeof NATIVE_MATRIX_BANK, MatrixBank>(
          this["__get_bank__"](index),
          MatrixBank
        );
      },
      insertItem: this.__insert_bank__,
      removeItem: this.__remove_bank__,
      getLength: this.__get_banks_length__,
      setLength: this.__set_banks_length__,
    },
    this
  );

  readonly movieClips = new Vector<SupercellSWF, MovieClip>(
    {
      getItem: function (index: number) {
        return assert_item<typeof NATIVE_MOVIECLIP, MovieClip>(
          this["__get_movieclip__"](index),
          MovieClip
        );
      },
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
