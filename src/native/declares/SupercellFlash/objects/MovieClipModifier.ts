import { DisplayObject } from "./DisplayObject";

export declare enum ModifierType {
  Mask = 38,
  Masked = 39,
  Unmasked = 40,
}

export declare class MovieClipModifier extends DisplayObject {
  constructor(obj?: { id?: number; type?: ModifierType });

  type: ModifierType;
}
