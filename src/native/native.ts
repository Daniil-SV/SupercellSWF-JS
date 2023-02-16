
import * as path from 'path';
import {SupercellCompression, SupercellSWF, Export} from "../../native_types"

declare interface native_interface {
    SupercellCompression: typeof SupercellCompression
    SupercellSWF: typeof SupercellSWF
    /* Sub-classes */
    Export: typeof Export
};

export const native: native_interface = require('node-gyp-build')(path.resolve(__dirname, "../../"));