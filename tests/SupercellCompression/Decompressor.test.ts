import { expect, test } from "@jest/globals";
import { log } from "console";
import { existsSync } from "fs";

import { CompressionSignature, SupercellCompression } from "../../";
import {
  commonUnitFileBuffer,
  unitFileBuffer,
  unitFilePath,
} from "../unitFiles";

const decompressor = SupercellCompression.Decompressor;

describe("SC-Compression decompressor tests", () => {
  test("it should decompress file into cache folder", () => {
    const path = decompressor.decompressFile(unitFilePath);
    expect(existsSync(path)).toBeTruthy();
  });

  test("it should decompress file into Buffer object", () => {
    const buffer = decompressor.decompress(unitFileBuffer);
    expect(buffer).toBeTruthy();
  });

  test("it should decompress CSV file into Buffer object", () => {
    const buffer = decompressor.commonDecompress(commonUnitFileBuffer);
    expect(buffer).toBeTruthy();
  });

  test("it should get props from header in compressed file", () => {
    const header = decompressor.getProps(unitFileBuffer);
    log(
      `${unitFilePath} header props. id: ${
        header.id === undefined ? "None" : header.id.toString("hex")
      } compression: ${
        CompressionSignature[header.signature]
      }, has metadata: ${String(
        header.metadata === undefined ? false : header.metadata.length > 0
      )}`
    );
    expect(header.id !== undefined && header.id.length > 0).toBeTruthy(); // If id length == 0, then .sc file or its read is corrupted
  });
});
