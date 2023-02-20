import { native } from "../../native/native"

export enum CompressionSignature {
    NONE = 0,
    LZMA,
    LZHAM,
    ZSTD,
}

const SupercellCompression = native.SupercellCompression;

export { SupercellCompression }