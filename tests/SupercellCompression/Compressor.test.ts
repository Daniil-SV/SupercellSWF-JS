import { expect, test } from "@jest/globals";
import { existsSync, rmSync } from "fs";

import { CompressionSignature, SupercellCompression } from "../../src";
import {
  commonUnitFileBufferD,
  unitFileBufferD,
  unitFilePathD,
} from "../unitFiles";
import { assert_buffer } from "../Utils";

const compressor = SupercellCompression.Compressor;
const output = "file.sc";

describe("SC-Compression compressor tests", () => {
  test("it should compress file into file with LZMA Compression", () => {
    compressor.compressFile(unitFilePathD, output, CompressionSignature.LZHAM);
    expect(existsSync(output)).toBeTruthy();
    rmSync(output);
  });

  test("it should compress file into file with LZHAM Compression", () => {
    compressor.compressFile(unitFilePathD, output, CompressionSignature.ZSTD);
    expect(existsSync(output)).toBeTruthy();
    rmSync(output);
  });

  test("it should compress file into file with ZSTD Compression", () => {
    compressor.compressFile(unitFilePathD, output, CompressionSignature.ZSTD);
    expect(existsSync(output)).toBeTruthy();
    rmSync(output);
  });

  test("it should compress file buffer", () => {
    const buffer = compressor.compress(
      unitFileBufferD,
      CompressionSignature.LZMA
    );
    expect(assert_buffer(buffer)).toBeTruthy();
  });

  test("it should compress CSV file buffer", () => {
    const buffer = compressor.compress(
      commonUnitFileBufferD,
      CompressionSignature.LZMA
    );
    expect(assert_buffer(buffer)).toBeTruthy();
  });
});
