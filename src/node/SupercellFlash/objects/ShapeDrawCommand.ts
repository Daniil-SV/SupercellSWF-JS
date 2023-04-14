import * as util from "util";

import {
  NATIVE_SHAPE_DRAW_COMMAND,
  NATIVE_SHAPE_DRAW_COMMAND_VERTEX,
} from "../../../native";
import { Vector } from "../../Utils/Vector";

export class ShapeDrawBitmapCommand extends NATIVE_SHAPE_DRAW_COMMAND {
  readonly vertices = new Vector<
    ShapeDrawBitmapCommand,
    ShapeDrawCommandVertex
  >(
    {
      Initializer: ShapeDrawCommandVertex,
      getItem: this.__get_vertices__,
      insertItem: this.__insert_vertices__,
      removeItem: this.__remove_vertices__,
      getLength: this.__get_length_vertices__,
      setLength: this.__set_length_vertices__,
    },
    this
  );

  [Symbol.toStringTag](): string {
    return "ShapeDrawBitmapCommand";
  }

  [util.inspect.custom](depth: number): string {
    const depthLength = 2 * depth;
    const length =
      depthLength > this.vertices.length ? this.vertices.length : depthLength;

    let vertices = "";
    for (let i = 0; length > i; i++) {
      vertices += `${util.inspect(this.vertices[i], false, depth - 1)} `;
    }

    return `<${this[Symbol.toStringTag]()} textureIndex: ${
      this.textureIndex
    }, vertices: [ ${vertices}]>`;
  }

  toJSON(): object {
    return {
      vertices: this.vertices,
    };
  }
}

export class ShapeDrawCommandVertex extends NATIVE_SHAPE_DRAW_COMMAND_VERTEX {
  [Symbol.toStringTag](): string {
    return "ShapeDrawCommandVertex";
  }

  [util.inspect.custom](depth: number): string {
    return `<${this[Symbol.toStringTag]()} [ ${
      depth >= 2 ? `[[${this.x}, ${this.y}], [${this.u}, ${this.v}]]` : "Points"
    } ]>`;
  }

  toJSON(): object {
    return {
      xy: [this.x, this.y],
      uv: [this.u, this.v],
    };
  }
}
