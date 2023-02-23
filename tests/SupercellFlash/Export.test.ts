import { expect, test } from "@jest/globals";
import { log } from "console";
import { inspect } from "util";

import { Export } from "../../";
import { checkValues, setValues } from "../Utils";

const propertyObject = {
  id: 10,
  name: "test_exportname",
};

function createInstance(setProperty: boolean = false): Export {
  return new Export(setProperty ? propertyObject : {});
}

describe("Export object tests", () => {
  test("it should create new Export object", () => {
    const obj = createInstance();
    expect(obj).toBeTruthy();
    expect(obj).toBeInstanceOf(Export);
  });
  test("it should create new Export object with property object in costructor", () => {
    const obj = createInstance(true);
    checkValues(obj, propertyObject);
  });
  test("it should set and correctly return values in Export object", () => {
    const obj = createInstance();
    setValues<Export>(obj, propertyObject);
    checkValues(obj, propertyObject);
  });
  test("it should return JSON object with Export object values", () => {
    const obj = createInstance(true);
    const json = obj.toJSON();
    expect(Object.keys(json).length >= 1).toBeTruthy();
  });
  test("it should return describe about Export object", () => {
    const obj = createInstance(true);
    const str = inspect(obj);
    log(`Representation of Export object in a string looks like: ${str}`);
    expect(str).toBeTruthy();
  });
});
