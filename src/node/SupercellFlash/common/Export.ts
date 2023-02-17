import { NativeExport } from "../../../native";
import * as util from "util";

export class Export extends NativeExport {
    [Symbol.toStringTag]() {
        return "ExportName"
    };

    [util.inspect.custom]() {
        return `<${this[Symbol.toStringTag]()} Id: ${this.id} Name: ${this.name}>`
    };

    toJSON() {
        return {
            id: this.id,
            name: this.name
        }
    }
}
