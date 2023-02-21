import * as util from "util";

import {
  type NATIVE_EXPORT,
  type NATIVE_MOVIECLIP_MODIFIER,
  type NATIVE_SHAPE,
  NATIVE_SUPERCELL_SWF,
  type NATIVE_SWFTEXTURE,
  type NATIVE_TEXTFIELD,
} from "../../native";
import { assert_item } from "../Utils/utils";
import { Vector } from "../Utils/Vector";

import { Export } from "./common/Export";
import { MovieClipModifier } from "./tag/MovieClipModifier";
import { Shape } from "./tag/Shape";
import { SWFTexture } from "./tag/SWFTexture";
import { TextField } from "./tag/TextField";

export class SupercellSWF extends NATIVE_SUPERCELL_SWF {
  exports = new Vector<SupercellSWF, Export>(
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

  shapes = new Vector<SupercellSWF, Shape>(
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

  textures = new Vector<SupercellSWF, SWFTexture>(
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

  textFields = new Vector<SupercellSWF, TextField>(
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

  movieClipModifiers = new Vector<SupercellSWF, MovieClipModifier>(
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

  [Symbol.toStringTag](): string {
    return "SupercellSWF";
  }

  [util.inspect.custom](): string {
    return `<${this[Symbol.toStringTag]()} >`;
  }

  toJSON(): object {
    return {
      useExternalTexture: this.useExternalTexture,
      useMultiResTexture: this.useMultiResTexture,
      useLowResTexture: this.useLowResTexture,
      multiResSuffix: this.multiResTextureSuffix,
      lowResSuffix: this.lowResTextureSuffix,
      shapes: this.shapes,
    };
  }
}
