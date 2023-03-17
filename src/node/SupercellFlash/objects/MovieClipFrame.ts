import * as util from "util";

import { NATIVE_MOVIECLIP_FRAME } from "../../../native";

export class MovieClipFrame extends NATIVE_MOVIECLIP_FRAME {
  [Symbol.toStringTag](): string {
    return "MovieClipFrame";
  }

  [util.inspect.custom](): string {
    return `<${this[Symbol.toStringTag]()} label: "${
      this.label
    }", elementsCount: ${this.elementsCount} >`;
  }

  toJSON(): object {
    return {
      label: this.label,
      elementsCount: this.elementsCount,
    };
  }
}
