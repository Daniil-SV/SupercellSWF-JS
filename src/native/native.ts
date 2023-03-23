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

export let native: NativeInterface;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  native = require("node-gyp-build")(path.resolve(__dirname, "../../"));
} catch (err) {
  console.error(err);
  throw new Error(
    "Failed to load SupercellSWF native side. Most likely there is no binary prebuild for your platform. Try to make a build yourself. Details can be found at https://github.com/scwmake/SupercellSWF-JS"
  );
}
