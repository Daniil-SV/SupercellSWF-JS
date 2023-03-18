import * as util from "util";

import { NATIVE_SWFTEXTURE } from "../../../native";
import { Filters, PixelFormat } from "../../../native/declares";

export class SWFTexture extends NATIVE_SWFTEXTURE {
  [Symbol.toStringTag](): string {
    return "SWFTexture";
  }

  [util.inspect.custom](depth: number): string {
    return `<${this[Symbol.toStringTag]()} width: ${this.width}, height: ${
      this.height
    }, type: ${PixelFormat[this.pixelFormat]} ${
      depth < 2
        ? ""
        : `linear: ${String(this.linear)}, downscaling: ${String(
            this.downscaling
          )}, filters: [${Filters[this.magFilter]}, ${Filters[this.minFilter]}]`
    }>`;
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
