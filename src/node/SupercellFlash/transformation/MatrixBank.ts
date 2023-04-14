import * as util from "util";

import { NATIVE_MATRIX_BANK } from "../../../native";
import { Vector } from "../../Utils/Vector";

import { ColorTransform } from "./ColorTransform";
import { Matrix2x3 } from "./Matrix2x3";

export class MatrixBank extends NATIVE_MATRIX_BANK {
  readonly matrices = new Vector<MatrixBank, Matrix2x3>(
    {
      Initializer: Matrix2x3,
      getItem: this.__get_matrices__,
      insertItem: this.__insert_matrices__,
      removeItem: this.__remove_matrices__,
      getLength: this.__get_length_matrices__,
      setLength: this.__set_length_matrices__,
    },
    this
  );

  readonly colorTransforms = new Vector<MatrixBank, ColorTransform>(
    {
      Initializer: ColorTransform,
      getItem: this.__get_colorTransforms__,
      insertItem: this.__insert_colorTransforms__,
      removeItem: this.__remove_colorTransforms__,
      getLength: this.__get_length_colorTransforms__,
      setLength: this.__set_length_colorTransforms__,
    },
    this
  );

  [Symbol.toStringTag](): string {
    return "MatrixBank";
  }

  [util.inspect.custom](): string {
    return `<${this[Symbol.toStringTag]()} matrices: [ ${
      this.matrices.length
    } items ], colors: [ ${this.colorTransforms.length} items ]>`;
  }

  toJSON(): object {
    return {
      matrices: this.matrices,
      colorTransforms: this.colorTransforms,
    };
  }
}
