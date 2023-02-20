import * as path from "path";

import {
  type Export,
  type Shape,
  type ShapeDrawBitmapCommand,
  type ShapeDrawBitmapCommandVertex,
  type SupercellCompression,
  type SupercellSWF,
} from "./types/";

declare interface NativeInterface {
  SupercellCompression: SupercellCompression;
  SupercellSWF: typeof SupercellSWF;
  /* Sub-classes */
  Export: typeof Export;
  Shape: typeof Shape;
  ShapeDrawBitmapCommand: typeof ShapeDrawBitmapCommand;
  ShapeDrawBitmapCommandVertex: typeof ShapeDrawBitmapCommandVertex;
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const native: NativeInterface = require("node-gyp-build")(
  path.resolve(__dirname, "../../")
);
