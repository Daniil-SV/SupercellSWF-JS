import { NativeShape, NativeShapeDrawCommand } from "../../../native";
import { Vector } from "../../Utils/Vector";
import { ShapeDrawCommand } from "./ShapeDrawCommand";
import { assert_item } from "../../Utils/utils";
import * as util from "util";

export class Shape extends NativeShape {
    commands = new Vector<Shape, ShapeDrawCommand>({
        get_item: function (index: number) {
            return assert_item<typeof NativeShapeDrawCommand, ShapeDrawCommand>(this["__get_command__"](index), ShapeDrawCommand)
        },
        insert_item: this.__insert_command__,
        remove_item: this.__remove_command__,
        get_length: this.__get_commands_length__,
        set_length: this.__set_commands_length__
    }, this);

    [Symbol.toStringTag]() {
        return "Shape";
    };

    [util.inspect.custom](depth: number) {
        const depthLength = 2 * depth;
        const length = depthLength > this.commands.length ? this.commands.length : depthLength;

        let commands = ''
        for (let i = 0; length > i; i++) {
            commands += `${util.inspect(this.commands[i], false, depth - 1)} `
        }

        return `<${this[Symbol.toStringTag]()} commands: [ ${commands}]>`
    };

    toJSON() {
        return {
            id: this.id,
            commands: this.commands
        }
    }
}