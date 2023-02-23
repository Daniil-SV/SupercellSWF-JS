import { expect, test } from "@jest/globals";
import { log } from "console";
import { randomBytes } from "crypto";
import { inspect } from "util";

import { Filters, PixelFormat, SWFTexture } from "../../";
import { checkValues, setValues } from "../Utils";

const propertyObject = {
  width: 2,
  height: 2,
  pixelFormat: PixelFormat.RGBA8,
  linear: false,
  downscaling: true,
  magFilter: Filters.NEAREST,
  minFilter: Filters.NEAREST,
  data: randomBytes(2 * 4 * 2),
};

function createInstance(setProperty: boolean = false): SWFTexture {
  return new SWFTexture(setProperty ? propertyObject : {});
}

describe("SWFTexture object tests", () => {
  test("it should create new SWFTexture object", () => {
    const obj = createInstance();
    expect(obj).toBeTruthy();
    expect(obj).toBeInstanceOf(SWFTexture);
  });
  test("it should create new SWFTexture object with property object in costructor", () => {
    const obj = createInstance(true);
    checkValues(obj, propertyObject);
  });
  test("it should set and correctly return values in SWFTexture object", () => {
    const obj = createInstance();
    setValues<SWFTexture>(obj, propertyObject);
    checkValues(obj, propertyObject);
  });
  test("it should return JSON object with SWFTexture object values", () => {
    const obj = createInstance(true);
    const json = obj.toJSON();
    expect(Object.keys(json).length >= 1).toBeTruthy();
  });
  test("it should return describe about SWFTexture object", () => {
    const obj = createInstance(true);
    const str = inspect(obj, false, 5);
    log(`Representation of SWFTexture object in a string looks like: ${str}`);
    expect(str).toBeTruthy();
  });
});
