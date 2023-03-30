/* eslint-disable @typescript-eslint/naming-convention */
export enum Filters {
  LINEAR = 0,
  NEAREST = 1,
  LINEAR_MIPMAP_NEAREST = 2,
}

export enum PixelFormat {
  RGBA8 = 0,
  RGBA4 = 1,
  RGB5_A1 = 2,
  RGB565 = 3,
  LUMINANCE8_ALPHA8 = 4,
  LUMINANCE8 = 5,
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

  static processLinearData(texture: SWFTexture): Buffer;

  pixelFormat: PixelFormat;

  magFilter: Filters;

  minFilter: Filters;

  width: number;

  height: number;

  linear: boolean;

  downscaling: boolean;

  data: Buffer;

  pixelByteSize(): number;
}
