import * as util from "util";

import {
  NATIVE_SHAPE_DRAW_COMMAND,
  NATIVE_SHAPE_DRAW_COMMAND_VERTEX,
} from "../../../native";
import { assert_item } from "../../Utils/utils";
import { Vector } from "../../Utils/Vector";

export class ShapeDrawCommand extends NATIVE_SHAPE_DRAW_COMMAND {
  vertices = new Vector<ShapeDrawCommand, ShapeDrawCommandVertex>(
    {
      getItem: function (index: number) {
        return assert_item<
          typeof NATIVE_SHAPE_DRAW_COMMAND_VERTEX,
          ShapeDrawCommandVertex
        >(this["__get_vertex__"](index), ShapeDrawCommandVertex);
      },
      insertItem: this.__insert_vertex__,
      removeItem: this.__remove_vertex__,
      getLength: this.__get_vertices_length__,
      setLength: this.__set_vertices_length__,
    },
    this
  );

  [Symbol.toStringTag](): string {
    return "ShapeDrawCommand";
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
      depth >= 2 ? `[${this.x}, ${this.y}], [${this.u}, ${this.v}]` : "Points"
    } ]>`;
  }

  toJSON(): object {
    return {
      xy: [this.x, this.y],
      uv: [this.u, this.v],
    };
  }
}
