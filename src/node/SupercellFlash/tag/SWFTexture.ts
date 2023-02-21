import * as util from "util";

import { NATIVE_SWFTEXTURE } from "../../../native";
import { PixelFormat } from "../../../native/types";

export class SWFTexture extends NATIVE_SWFTEXTURE {
  [Symbol.toStringTag](): string {
    return "SWFTexture";
  }

  [util.inspect.custom](): string {
    return `<${this[Symbol.toStringTag]()} width: ${this.width}, height: ${
      this.height
    }, type: ${PixelFormat[this.pixelFormat]} >`;
  }

  toJSON(): object {
    return {
      width: this.width,
      height: this.height,
      pixelFormat: this.pixelFormat,
      linear: this.linear,
      downscaling: this.downscaling,
      magFilter: this.magFilter,
      minFilter: this.minFilter,
    };
  }
}
