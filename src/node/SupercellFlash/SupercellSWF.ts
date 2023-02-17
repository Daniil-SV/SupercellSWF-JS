import { NativeSupercellSWF } from "../../native";
import { extend_to } from "../utils";

import { Vector } from "../Vector";

import { Export } from "./common/Export";
import { NativeExport } from "../../native";

export class SupercellSWF extends NativeSupercellSWF {
    exports = new Vector<SupercellSWF, Export>({
        get_item: function(index: number) {
            const item = this["__get_export_item__"](index);
            return item ? extend_to<typeof NativeExport, Export>(item, (Export as any)) : item;},
        insert_item: this.__insert_export_item__,
        remove_item: this.__remove_export_item__,
        get_length: this.__get_exports_length__,
        set_length: this.__set_exports_length__
    }, this)
}
