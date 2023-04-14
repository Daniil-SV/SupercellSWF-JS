import {
  type Indexable,
  type VectorGetLength,
  type VectorItemGetter,
  type VectorItemRemove,
  type VectorItemSetter,
  type VectorSetLength,
} from "../../../../node/Utils/Vector";

import { DisplayObject } from "./DisplayObject";

export declare class Shape extends DisplayObject {
  constructor(obj?: {
    id?: number;
    commands?: Indexable<ShapeDrawBitmapCommand>;
  });

  protected __get_commands__: VectorItemGetter;
  protected __insert_commands__: VectorItemSetter<ShapeDrawBitmapCommand>;
  protected __remove_commands__: VectorItemRemove;
  protected __get_length_commands__: VectorGetLength;
  protected __set_length_commands__: VectorSetLength;
}

export declare class ShapeDrawBitmapCommand {
  constructor(obj?: {
    textureIndex?: number;
    vertices?: Indexable<ShapeDrawBitmapCommandVertex>;
  });

  textureIndex: number;

  protected __get_vertices__: VectorItemGetter;
  protected __insert_vertices__: VectorItemSetter<ShapeDrawBitmapCommandVertex>;
  protected __remove_vertices__: VectorItemRemove;
  protected __get_length_vertices__: VectorGetLength;
  protected __set_length_vertices__: VectorSetLength;
}

export declare class ShapeDrawBitmapCommandVertex {
  constructor(obj?: { x?: number; y?: number; u?: number; v?: number });
  x: number;
  y: number;
  u: number;
  v: number;
}
