import * as util from "util";

import { NATIVE_MOVIECLIP_MODIFIER } from "../../../native";
import { ModifierType } from "../../../native/types";

export class MovieClipModifier extends NATIVE_MOVIECLIP_MODIFIER {
  [Symbol.toStringTag](): string {
    return "MovieClipModifier";
  }

  [util.inspect.custom](): string {
    return `<${this[Symbol.toStringTag]()} id: ${this.id}, type: ${
      ModifierType[this.type]
    }>`;
  }

  toJSON(): object {
    return {
      id: this.id,
      type: this.type,
    };
  }
}
