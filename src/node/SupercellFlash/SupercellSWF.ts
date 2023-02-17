import { NativeSupercellSWF } from "../../native";

import { Vector } from "../Vector";

import { Export } from "../../../native_types";

export class SupercellSWF extends NativeSupercellSWF {
    constructor() {
        super();


    }

    exports = new Vector<SupercellSWF, Export>({
        get_item: this.get_export_item,
        push_back: this.push_export_items,
        get_length: this.get_exports_length,
        set_length: this.set_exports_length
    }, this)
}
