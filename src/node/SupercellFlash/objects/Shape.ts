import * as util from "util";

import { NATIVE_SHAPE } from "../../../native";
import { Vector } from "../../Utils/Vector";

import { ShapeDrawBitmapCommand } from "./ShapeDrawCommand";

export class Shape extends NATIVE_SHAPE {
  readonly commands = new Vector<Shape, ShapeDrawBitmapCommand>(
    {
      Initializer: ShapeDrawBitmapCommand,
      getItem: this.__get_commands__,
      insertItem: this.__insert_commands__,
      removeItem: this.__remove_commands__,
      getLength: this.__get_length_commands__,
      setLength: this.__set_length_commands__,
    },
    this
  );

  [Symbol.toStringTag](): string {
    return "Shape";
  }

  [util.inspect.custom](depth: number): string {
    const depthLength = 2 * depth;
    const length =
      depthLength > this.commands.length ? this.commands.length : depthLength;

    let commands = "";
    for (let i = 0; length > i; i++) {
      commands += `${util.inspect(this.commands[i], false, depth - 1)} `;
    }

    if (length !== this.commands.length) {
      commands += `and ${this.commands.length - length} items..`;
    }

    return `<${this[Symbol.toStringTag]()} id: ${
      this.id
    }, commands: [ ${commands}]>`;
  }

  toJSON(): object {
    return {
      id: this.id,
      commands: this.commands,
    };
  }
}
