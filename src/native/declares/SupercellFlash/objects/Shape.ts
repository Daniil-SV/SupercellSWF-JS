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

  protected __get_command__: VectorItemGetter;
  protected __insert_command__: VectorItemSetter<ShapeDrawBitmapCommand>;
  protected __remove_command__: VectorItemRemove;
  protected __get_commands_length__: VectorGetLength;
  protected __set_commands_length__: VectorSetLength;
}

export declare class ShapeDrawBitmapCommand {
  constructor(obj?: {
    textureIndex?: number;
    vertices?: Indexable<ShapeDrawBitmapCommandVertex>;
  });

  textureIndex: number;

  protected __get_vertex__: VectorItemGetter;
  protected __insert_vertex__: VectorItemSetter<ShapeDrawBitmapCommandVertex>;
  protected __remove_vertex__: VectorItemRemove;
  protected __get_vertices_length__: VectorGetLength;
  protected __set_vertices_length__: VectorSetLength;
}

export declare class ShapeDrawBitmapCommandVertex {
  constructor(obj?: { x?: number; y?: number; u?: number; v?: number });
  x: number;
  y: number;
  u: number;
  v: number;
}
