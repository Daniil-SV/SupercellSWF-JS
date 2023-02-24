import * as util from "util";

import {
  type NATIVE_COLOR_TRANSFORM,
  NATIVE_MATRIX_BANK,
  type NATIVE_MATRIX2X3,
} from "../../../native";
import { assert_item } from "../../Utils/utils";
import { Vector } from "../../Utils/Vector";

import { ColorTransform } from "./ColorTransform";
import { Matrix2x3 } from "./Matrix2x3";

export class MatrixBank extends NATIVE_MATRIX_BANK {
  readonly matrices = new Vector<MatrixBank, Matrix2x3>(
    {
      getItem: function (index: number) {
        return assert_item<typeof NATIVE_MATRIX2X3, Matrix2x3>(
          this["__get_matrix__"](index),
          Matrix2x3
        );
      },
      insertItem: this.__insert_matrix__,
      removeItem: this.__remove_matrix__,
      getLength: this.__get_matrices_length__,
      setLength: this.__set_matrices_length__,
    },
    this
  );

  readonly colorTransforms = new Vector<MatrixBank, ColorTransform>(
    {
      getItem: function (index: number) {
        return assert_item<typeof NATIVE_COLOR_TRANSFORM, ColorTransform>(
          this["__get_color__"](index),
          ColorTransform
        );
      },
      insertItem: this.__insert_color__,
      removeItem: this.__remove_color__,
      getLength: this.__get_colors_length__,
      setLength: this.__set_colors_length__,
    },
    this
  );

  [Symbol.toStringTag](): string {
    return "MatrixBank";
  }

  [util.inspect.custom](): string {
    return `<${this[Symbol.toStringTag]()} matrices: [ ${
      this.colorTransforms.length
    } items ], colors: [ ${this.matrices.length} items ]>`;
  }

  toJSON(): object {
    return {
      matrices: this.matrices,
      colorTransforms: this.colorTransforms,
    };
  }
}
