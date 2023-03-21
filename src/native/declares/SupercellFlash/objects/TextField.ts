import { DisplayObject } from "./DisplayObject";

export declare class TextField extends DisplayObject {
  constructor(obj?: {
    id?: number;
    text?: string;
    fontName?: string;
    fontColor?: number;
    fontSize?: number;
    fontAlign?: number;
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
    isBold?: boolean;
    isItalic?: boolean;
    isMultiline?: boolean;
    isOutlined?: boolean;
    outlineColor?: number;
    useDeviceFont?: boolean;
    autoAdjustFontBounds?: boolean;
    unknownFlag?: boolean;
    unknownShort?: number;
    unknownShort2?: number;
  });

  text: string;

  fontName: string;

  fontColor: number;

  fontSize: number;

  fontAlign: number;

  left: number;

  top: number;

  right: number;

  bottom: number;

  isBold: boolean;
  isItalic: boolean;
  isMultiline: boolean;
  isOutlined: boolean;
  isDynamic: boolean;

  outlineColor: number;
  useDeviceFont: boolean;
  autoAdjustFontSize: boolean;
  unknownFlag: boolean;
  unknownShort: number;
  unknownShort2: number;
}
