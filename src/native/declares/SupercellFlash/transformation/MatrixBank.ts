import {
  type Indexable,
  type VectorGetLength,
  type VectorItemGetter,
  type VectorItemRemove,
  type VectorItemSetter,
  type VectorSetLength,
} from "../../../../node/Utils/Vector";

import { type ColorTransform } from "./ColorTransform";
import { type Matrix2x3 } from "./Matrix2x3";

export declare class MatrixBank {
  constructor(obj?: {
    matrices?: Indexable<Matrix2x3>;
    colorTransforms?: Indexable<ColorTransform>;
  });

  getMatrixIndex: (matrix: Matrix2x3) => number | undefined;
  getColorTransformIndex: (color: ColorTransform) => number | undefined;

  protected __get_matrices__: VectorItemGetter;
  protected __insert_matrices__: VectorItemSetter<Matrix2x3>;
  protected __remove_matrices__: VectorItemRemove;
  protected __get_length_matrices__: VectorGetLength;
  protected __set_length_matrices__: VectorSetLength;

  protected __get_colorTransforms__: VectorItemGetter;
  protected __insert_colorTransforms__: VectorItemSetter<ColorTransform>;
  protected __remove_colorTransforms__: VectorItemRemove;
  protected __get_length_colorTransforms__: VectorGetLength;
  protected __set_length_colorTransforms__: VectorSetLength;
}
