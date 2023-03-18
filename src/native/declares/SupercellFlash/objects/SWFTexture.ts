export declare enum Filters {
  Linear = 0,
  Nearest = 1,
  LinearMipmapNearest = 2,
}
export declare enum PixelFormat {
  RGBA8 = 0,
  RGBA4 = 1,
  RGB5A1 = 2,
  RGB565 = 3,
  LUMINANCE8A8 = 4,
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

  pixelIndex(): number;
  pixelByteSize(): number;
}
