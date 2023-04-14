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
    unknownFlag?: boolean;
  });

  frameRate: number;

  scalingGrid: ScalingGrid;

  matrixBankIndex: number;

  unknownFlag: boolean;

  protected __get_instances__: VectorItemGetter;
  protected __insert_instances__: VectorItemSetter<DisplayObjectInstance>;
  protected __remove_instances__: VectorItemRemove;
  protected __get_length_instances__: VectorGetLength;
  protected __set_length_instances__: VectorSetLength;

  protected __get_frames__: VectorItemGetter;
  protected __insert_frames__: VectorItemSetter<MovieClipFrame>;
  protected __remove_frames__: VectorItemRemove;
  protected __get_length_frames__: VectorGetLength;
  protected __set_length_frames__: VectorSetLength;

  protected __get_frameElements__: VectorItemGetter;
  protected __insert_frameElements__: VectorItemSetter<MovieClipFrameElement>;
  protected __remove_frameElements__: VectorItemRemove;
  protected __get_length_frameElements__: VectorGetLength;
  protected __set_length_frameElements__: VectorSetLength;
}
