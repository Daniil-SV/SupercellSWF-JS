import { NativeShapeDrawCommand, NativeShapeDrawCommandVertex } from "../../../native";
import * as util from "util";
import { assert_item } from "../../Utils/utils";
import { Vector } from "../../Utils/Vector";

export class ShapeDrawCommand extends NativeShapeDrawCommand {
    vertices = new Vector<ShapeDrawCommand, ShapeDrawCommandVertex>({
        get_item: function (index: number) {
            return assert_item<typeof NativeShapeDrawCommandVertex, ShapeDrawCommandVertex>(this["__get_vertex__"](index), ShapeDrawCommandVertex)
        },
        insert_item: this.__insert_vertex__,
        remove_item: this.__remove_vertex__,
        get_length: this.__get_vertices_length__,
        set_length: this.__set_vertices_length__
    }, this);

    [Symbol.toStringTag]() {
        return "ShapeDrawCommand";
    };

    [util.inspect.custom](depth: number) {
        const depthLength = 2 * depth;
        const length = depthLength > this.vertices.length ? this.vertices.length : depthLength;

        let vertices = ''
        for (let i = 0; length > i; i++) {
            vertices += `${util.inspect(this.vertices[i], false, depth - 1)} `
        }

        return `<${this[Symbol.toStringTag]()} textureIndex: ${this.textureIndex}. vertices: [ ${vertices}]>`
    };

    toJSON() {
        return {
            vertices: this.vertices
        }
    }

}

export class ShapeDrawCommandVertex extends NativeShapeDrawCommandVertex {
    [Symbol.toStringTag]() {
        return "ShapeDrawCommandVertex";
    };

    [util.inspect.custom](depth: number) {
        return `<${this[Symbol.toStringTag]()} [ ${depth >= 2 ? `[${this.x}, ${this.y}], [${this.u}, ${this.v}]` : "Points"} ]>`
    };

    toJSON() {
        return {
            xy: [this.x, this.y],
            uv: [this.u, this.v]
        }
    }
}