import {
  type Indexable,
  type VectorGetLength,
  type VectorItemGetter,
  type VectorItemRemove,
  type VectorItemSetter,
  type VectorSetLength,
} from "../../../../node/Utils/Vector";

import { DisplayObject } from "./DisplayObject";

export interface ScalingGrid {
  x: number;
  y: number;
  width: number;
  height: number;
}

export declare class MovieClipFrame {
  constructor(obj?: { elementsCount?: number; label?: string });
  elementsCount: number;
  label: string;
}

export declare class MovieClipFrameElement {
  constructor(obj?: {
    instanceIndex?: number;
    matrixIndex?: number;
    colorTransformIndex?: number;
  });
  instanceIndex: number;
  matrixIndex: number;
  colorTransformIndex: number;
}

export declare class DisplayObjectInstance {
  constructor(obj?: { id?: number; blend?: number; name?: string });
  id: number;
  blend: number;
  name: string;
}

export declare class MovieClip extends DisplayObject {
  constructor(obj?: {
    id?: number;
    frameRate?: number;
    scalingGrid?: ScalingGrid;
    matrixBankIndex?: number;
    instances?: Indexable<DisplayObjectInstance>;
    frames?: Indexable<MovieClipFrame>;
    frameElements?: Indexable<MovieClipFrameElement>;
  });

  frameRate: number;

  scalingGrid: ScalingGrid;

  matrixBankIndex: number;

  protected __get_instance__: VectorItemGetter;
  protected __insert_instance__: VectorItemSetter<DisplayObjectInstance>;
  protected __remove_instance__: VectorItemRemove;
  protected __get_instances_length__: VectorGetLength;
  protected __set_instances_length__: VectorSetLength;

  protected __get_frame__: VectorItemGetter;
  protected __insert_frame__: VectorItemSetter<MovieClipFrame>;
  protected __remove_frame__: VectorItemRemove;
  protected __get_frames_length__: VectorGetLength;
  protected __set_frames_length__: VectorSetLength;

  protected __get_element__: VectorItemGetter;
  protected __insert_element__: VectorItemSetter<MovieClipFrameElement>;
  protected __remove_element__: VectorItemRemove;
  protected __get_elements_length__: VectorGetLength;
  protected __set_elements_length__: VectorSetLength;
}
