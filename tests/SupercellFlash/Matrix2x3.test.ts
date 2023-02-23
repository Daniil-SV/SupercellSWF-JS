import { expect, test } from "@jest/globals";
import { log } from "console";
import { inspect } from "util";

import { Matrix2x3 } from "../../";
import { checkValues, setValues } from "../Utils";

const propertyObject = {
  a: 2,
  b: 0.5,
  c: 0.5,
  d: 2,
  tx: 10,
  ty: 15,
};

function createInstance(setProperty: boolean = false): Matrix2x3 {
  return new Matrix2x3(setProperty ? propertyObject : {});
}

describe("Matrix2x3 object tests", () => {
  test("it should create new Matrix object", () => {
    const obj = createInstance();
    expect(obj).toBeTruthy();
    expect(obj).toBeInstanceOf(Matrix2x3);
  });
  test("it should create new Matrix object with property object in costructor", () => {
    const obj = createInstance(true);
    checkValues(obj, propertyObject);
  });
  test("it should set and correctly return values in Matrix object", () => {
    const obj = createInstance();
    setValues<Matrix2x3>(obj, propertyObject);
    checkValues(obj, propertyObject);
  });
  test("it should return JSON object with Matrix object values", () => {
    const obj = createInstance(true);
    const json = obj.toJSON();
    expect(Object.keys(json).length >= 1).toBeTruthy();
  });
  test("it should return describe about Matrix object", () => {
    const obj = createInstance(true);
    const str = inspect(obj, false, 5);
    log(`Representation of Matrix object in a string looks like: ${str}`);
    expect(str).toBeTruthy();
  });
});
