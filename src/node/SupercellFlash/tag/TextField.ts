import * as util from "util";

import { NATIVE_TEXTFIELD } from "../../../native";

export class TextField extends NATIVE_TEXTFIELD {
  [Symbol.toStringTag](): string {
    return "TextField";
  }

  [util.inspect.custom](): string {
    return `<${this[Symbol.toStringTag]()} text: "${this.text}, font: "${
      this.fontName
    }">`;
  }

  toJSON(): object {
    return {};
  }
}
