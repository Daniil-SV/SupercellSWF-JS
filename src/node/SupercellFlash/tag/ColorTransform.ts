import * as util from "util";

import { NATIVE_COLOR_TRANSFORM } from "../../../native";

export class ColorTransform extends NATIVE_COLOR_TRANSFORM {
  [Symbol.toStringTag](): string {
    return "ColorTransform";
  }

  [util.inspect.custom](depth: number): string {
    if (depth === 1) {
      return `<${this[Symbol.toStringTag]()}>`;
    } else {
      return `<${this[Symbol.toStringTag]()} redAdd: ${
        this.redAdd
      }, greenAdd: ${this.greenAdd}, blueAdd: ${this.blueAdd}, alphaMul: ${
        this.alphaMul
      }, redMul: ${this.redMul}, greenMul: ${this.greenMul}, blueMul: ${
        this.blueMul
      } >`;
    }
  }

  toJSON(): object {
    return {
      redAdd: this.redAdd,
      greenAdd: this.greenAdd,
      blueAdd: this.blueAdd,
      alphaMul: this.alphaMul,
      redMul: this.redMul,
      greenMul: this.greenMul,
      blueMul: this.blueMul,
    };
  }
}
