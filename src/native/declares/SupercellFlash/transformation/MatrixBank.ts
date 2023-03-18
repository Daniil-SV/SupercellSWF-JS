import {
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
    matrices?: Matrix2x3[];
    colorTransforms?: ColorTransform[];
  });

  protected __get_matrix__: VectorItemGetter;
  protected __insert_matrix__: VectorItemSetter<Matrix2x3>;
  protected __remove_matrix__: VectorItemRemove;
  protected __get_matrices_length__: VectorGetLength;
  protected __set_matrices_length__: VectorSetLength;

  protected __get_color__: VectorItemGetter;
  protected __insert_color__: VectorItemSetter<ColorTransform>;
  protected __remove_color__: VectorItemRemove;
  protected __get_colors_length__: VectorGetLength;
  protected __set_colors_length__: VectorSetLength;
}
