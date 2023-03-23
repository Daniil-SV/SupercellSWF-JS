import { expect, test } from "@jest/globals";
import { readdirSync, readFileSync } from "fs";
import { join, resolve } from "path";

import { version } from "../package.json";

const prebuildFolder = join(resolve(__dirname, "../"), "prebuilds");

describe("Native module tests", () => {
  test("Versions of all native modules must be as in package", () => {
    const prebuildContent = readdirSync(prebuildFolder);
    for (const prebuildPlatformName of prebuildContent) {
      const prebuildPlatformPath = join(prebuildFolder, prebuildPlatformName);
      const moduleVersion = readFileSync(join(prebuildPlatformPath, "version"));
      expect(String(moduleVersion)).toBe(version);
    }
  });
});
