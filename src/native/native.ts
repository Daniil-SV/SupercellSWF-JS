import * as path from "path";

import {
  type ColorTransform,
  type DisplayObjectInstance,
  type ExportName,
  type Matrix2x3,
  type MatrixBank,
  type MovieClip,
  type MovieClipFrame,
  type MovieClipFrameElement,
  type MovieClipModifier,
  type Shape,
  type ShapeDrawBitmapCommand,
  type ShapeDrawBitmapCommandVertex,
  type SupercellCompression,
  type SupercellSWF,
  type SWFTexture,
  type TextField,
} from "./declares";

declare interface NativeInterface {
  SupercellCompression: SupercellCompression;
  SupercellSWF: typeof SupercellSWF;
  /* Sub-classes */
  ExportName: typeof ExportName;

  SWFTexture: typeof SWFTexture;

  MovieClipModifier: typeof MovieClipModifier;

  Shape: typeof Shape;
  ShapeDrawBitmapCommand: typeof ShapeDrawBitmapCommand;
  ShapeDrawBitmapCommandVertex: typeof ShapeDrawBitmapCommandVertex;

  TextField: typeof TextField;

  MatrixBank: typeof MatrixBank;
  Matrix2x3: typeof Matrix2x3;
  ColorTransform: typeof ColorTransform;

  MovieClip: typeof MovieClip;
  MovieClipFrame: typeof MovieClipFrame;
  MovieClipFrameElement: typeof MovieClipFrameElement;
  DisplayObjectInstance: typeof DisplayObjectInstance;
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const native: NativeInterface = require("node-gyp-build")(
  path.resolve(__dirname, "../../")
);
