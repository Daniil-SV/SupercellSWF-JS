import * as util from "util";

import { NATIVE_EXPORT } from "../../../native";

export class ExportName extends NATIVE_EXPORT {
  [Symbol.toStringTag](): string {
    return "ExportName";
  }

  [util.inspect.custom](): string {
    return `<${this[Symbol.toStringTag]()} Id: ${this.id}, Name: "${
      this.name
    }">`;
  }

  toJSON(): object {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
