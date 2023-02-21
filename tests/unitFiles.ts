import { readFileSync } from "fs";
import { join } from "path";

export const unitFilePath = join(__dirname, "../resources/assets/debug.sc");
export const commonUnitFilePath = join(
  __dirname,
  "../resources/assets/testing.csv"
);

export const unitFileBuffer = readFileSync(unitFilePath);
export const commonUnitFileBuffer = readFileSync(commonUnitFilePath);

export const unitFilePathD = join(
  __dirname,
  "../resources/assets/Decompressed/debug.sc"
);
export const commonUnitFilePathD = join(
  __dirname,
  "../resources/assets/Decompressed/debug.sc"
);

export const unitFileBufferD = readFileSync(unitFilePathD);
export const commonUnitFileBufferD = readFileSync(commonUnitFilePathD);
