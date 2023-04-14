/* eslint-disable @typescript-eslint/naming-convention */
export enum Filters {
  LINEAR_NEAREST = 0,
  NEAREST_NEAREST = 1,
  LINEAR_MIPMAP_NEAREST = 2,
}

export enum PixelFormat {
  RGBA8 = 0,
  RGBA4 = 2,
  RGB5_A1 = 3,
  RGB565 = 4,
  LUMINANCE8_ALPHA8 = 6,
  LUMINANCE8 = 10,
}

export declare class SWFTexture {
  constructor(obj?: {
    pixelFormat?: PixelFormat;
    magFilter?: Filters;
    minFilter?: Filters;
    width?: number;
    height?: number;
    linear?: boolean;
    downscaling?: boolean;
    data?: Buffer;
  });

  static getLinearData(texture: SWFTexture, toLinear: boolean): Buffer;

  static getPixelFormatData(texture: SWFTexture, dstType: PixelFormat): Buffer;
  static getPixelFormatData(
    data: Buffer,
    width: number,
    height: number,
    srcType: PixelFormat,
    dstType: PixelFormat
  ): Buffer;

  pixelFormat: PixelFormat;

  textureFilter: Filters;

  width: number;

  height: number;

  linear: boolean;

  downscaling: boolean;

  data: Buffer;
}
