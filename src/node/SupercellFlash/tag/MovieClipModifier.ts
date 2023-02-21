import * as util from "util";

import { NATIVE_MOVIECLIP_MODIFIER } from "../../../native";
import { ModifierType } from "../../../native/types";

export class MovieClipModifier extends NATIVE_MOVIECLIP_MODIFIER {
  [Symbol.toStringTag](): string {
    return "MovieClipModifier";
  }

  [util.inspect.custom](): string {
    return `<${this[Symbol.toStringTag]()} type: ${ModifierType[this.type]}>`;
  }

  toJSON(): object {
    return {
      type: this.type,
    };
  }
}
