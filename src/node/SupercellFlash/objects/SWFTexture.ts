import * as util from "util";

import { NATIVE_SWFTEXTURE } from "../../../native";
import { Filters, PixelFormat } from "../../../native/declares";

export class SWFTexture extends NATIVE_SWFTEXTURE {
  [Symbol.toStringTag](): string {
    return "SWFTexture";
  }

  static Filters = Filters;
  static PixelFormat = PixelFormat;

  static pixelFormatTable = [
    PixelFormat.RGBA8,
    PixelFormat.RGBA8,
    PixelFormat.RGBA4,
    PixelFormat.RGB5_A1,
    PixelFormat.RGB565,
    PixelFormat.RGBA8,
    PixelFormat.LUMINANCE8_ALPHA8,
    PixelFormat.RGBA8,
    PixelFormat.RGBA8,
    PixelFormat.RGBA4,
    PixelFormat.LUMINANCE8,
  ];

  static pixelByteSizeTable = [4, 4, 2, 2, 2, 4, 2, 4, 4, 2, 1];
  static channelsCountTable = [4, 4, 4, 4, 3, 4, 2, 4, 4, 4, 1];

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
