import * as util from "util";

import { NATIVE_TEXTFIELD } from "../../../native";

export class TextField extends NATIVE_TEXTFIELD {
  [Symbol.toStringTag](): string {
    return "TextField";
  }

  [util.inspect.custom](depth: number): string {
    let output = `<${this[Symbol.toStringTag]()} text: "${this.text}, font: "${
      this.fontName
    }" `;

    if (depth >= 2) {
      output += `fontColor: ${Number(this.fontColor).toString(
        16
      )}, fontAlign: ${this.fontAlign} `;
    }

    if (depth >= 3) {
      output += `isBold: ${String(this.isBold)}, isItalic: ${String(
        this.isItalic
      )}, isMultiline: ${String(this.isMultiline)}, isOutlined: ${String(
        this.isOutlined
      )} `;
    }

    if (depth >= 4) {
      output += `left: ${this.left}, top: ${this.top}, right: ${
        this.right
      }, bottom: ${this.bottom}, useDeviceFont: ${String(
        this.useDeviceFont
      )}, adjustFontBounds: ${String(this.autoAdjustFontBounds)} `;
    }

    output += ">";
    return output;
  }

  toJSON(): object {
    return {
      text: this.text,
      fontName: this.fontName,
      fontColor: this.fontColor,
      fontAlign: this.fontAlign,
      left: this.left,
      top: this.top,
      right: this.right,
      bottom: this.bottom,
      isBold: this.isBold,
      isItalic: this.isItalic,
      isMultiline: this.isMultiline,
      isOutlined: this.isOutlined,
      outlineColor: this.outlineColor,
      useDeviceFont: this.useDeviceFont,
      autoAdjustFontBounds: this.autoAdjustFontBounds,
    };
  }
}
