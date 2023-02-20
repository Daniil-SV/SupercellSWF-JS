import { NativeSupercellSWF } from "../../native";
import { assert_item } from "../Utils/utils";
import { Vector } from "../Utils/Vector";
import * as util from "util";

import { Export } from "./common/Export";
import { Shape } from "./tag/Shape";

import { NativeExport } from "../../native";
import { NativeShape } from "../../native";


export class SupercellSWF extends NativeSupercellSWF {
    exports = new Vector<SupercellSWF, Export>({
        get_item: function (index: number) {
            return assert_item<typeof NativeExport, Export>(this["__get_export_item__"](index), Export);
        },
        insert_item: this.__insert_export_item__,
        remove_item: this.__remove_export_item__,
        get_length: this.__get_exports_length__,
        set_length: this.__set_exports_length__
    }, this);

    shapes = new Vector<SupercellSWF, Shape>({
        get_item: function (index: number) {
            return assert_item<typeof NativeShape, Shape>(this["__get_shape__"](index), Shape);
        },
        insert_item: this.__insert_shape__,
        remove_item: this.__remove_shape__,
        get_length: this.__get_shapes_length__,
        set_length: this.__set_shapes_length__
    }, this);

    [Symbol.toStringTag]() {
        return "SupercellSWF";
    };

    [util.inspect.custom]() {
        return `<${this[Symbol.toStringTag]()} >`
    };

    toJSON() {
        return {
            "useExternalTexture": this.useExternalTexture,
            "shapes": this.shapes
        };
    }
}
