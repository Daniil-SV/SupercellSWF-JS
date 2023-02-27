import { expect, test } from "@jest/globals";
import { log } from "console";
import { inspect } from "util";

import { ColorTransform } from "../../";
import { checkValues, setValues } from "../Utils";

const propertyObject = {
  alpha: 0.5,
  redAdd: 255,
  greenAdd: 127,
  blueAdd: 64,
  redMul: 0.1,
  greenMul: 0.5,
  blueMul: 0.7,
};

function createInstance(setProperty: boolean = false): ColorTransform {
  return new ColorTransform(setProperty ? propertyObject : {});
}

describe("ColorTransform object tests", () => {
  test("it should create new ColorTransform object", () => {
    const obj = createInstance();
    expect(obj).toBeTruthy();
    expect(obj).toBeInstanceOf(ColorTransform);
  });
  test("it should create new ColorTransform object with property object in costructor", () => {
    const obj = createInstance(true);
    checkValues(obj, propertyObject);
  });
  test("it should set and correctly return values in ColorTransform object", () => {
    const obj = createInstance();
    setValues<ColorTransform>(obj, propertyObject);
    checkValues(obj, propertyObject);
  });
  test("it should return JSON object with ColorTransform object values", () => {
    const obj = createInstance(true);
    const json = obj.toJSON();
    expect(Object.keys(json).length >= 1).toBeTruthy();
  });
  test("it should return describe about ColorTransform object", () => {
    const obj = createInstance(true);
    const str = inspect(obj, false, 5);
    log(
      `Representation of ColorTransform object in a string looks like: ${str}`
    );
    expect(str).toBeTruthy();
  });
});
