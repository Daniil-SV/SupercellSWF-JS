import * as util from "util";

import { NATIVE_MATRIX2X3 } from "../../../native";

export class Matrix2x3 extends NATIVE_MATRIX2X3 {
  [Symbol.toStringTag](): string {
    return "Matrix2x3";
  }

  [util.inspect.custom](depth: number): string {
    return `<${this[Symbol.toStringTag]()} ${
      depth < 2
        ? ""
        : `a: ${this.a}, b: ${this.b}, c: ${this.c}, d: ${this.d}, tx: ${this.tx}, ty: ${this.ty}`
    }>`;
  }

  toJSON(): object {
    return {
      a: this.a,
      b: this.b,
      c: this.c,
      d: this.d,
      tx: this.tx,
      ty: this.ty,
    };
  }
}
