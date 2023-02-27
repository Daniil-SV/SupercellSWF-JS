import { expect, test } from "@jest/globals";
import { log } from "console";
import { inspect } from "util";

import { ColorTransform, Matrix2x3, MatrixBank } from "../../";
import { checkValues, setValues } from "../Utils";

const propertyObject = {
  matrices: [new Matrix2x3({ tx: 10, ty: 50 })],
  colorTransforms: [new ColorTransform({ alpha: 0.5 })],
};

function createInstance(setProperty: boolean = false): MatrixBank {
  return new MatrixBank(setProperty ? propertyObject : {});
}

describe("MatrixBank object tests", () => {
  test("it should create new MatrixBank object", () => {
    const obj = createInstance();
    expect(obj).toBeTruthy();
    expect(obj).toBeInstanceOf(MatrixBank);
  });
  test("it should create new MatrixBank object with property object in costructor", () => {
    const obj = createInstance(true);
    checkValues(obj, propertyObject);
  });
  test("it should set and correctly return values in MatrixBank object", () => {
    const obj = createInstance();
    setValues<MatrixBank>(obj, propertyObject);
    checkValues(obj, propertyObject);
  });
  test("it should return JSON object with MatrixBank object values", () => {
    const obj = createInstance(true);
    const json = obj.toJSON();
    expect(Object.keys(json).length >= 1).toBeTruthy();
  });
  test("it should return describe about MatrixBank object", () => {
    const obj = createInstance(true);
    const str = inspect(obj, false, 5);
    log(`Representation of MatrixBank object in a string looks like: ${str}`);
    expect(str).toBeTruthy();
  });
});
