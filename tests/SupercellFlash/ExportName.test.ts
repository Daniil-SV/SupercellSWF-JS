import { expect, test } from "@jest/globals";

import { ExportName } from "../../";
import { checkValues, setValues } from "../Utils";

const propertyObject = {
  id: 10,
  name: "test_exportname",
};

function createInstance(setProperty: boolean = false): ExportName {
  return new ExportName(setProperty ? propertyObject : {});
}

describe("ExportName object tests", () => {
  test("it should create new ExportName object", () => {
    const obj = createInstance();
    expect(obj).toBeTruthy();
    expect(obj).toBeInstanceOf(ExportName);
  });
  test("it should create new ExportName object with property object in costructor", () => {
    const obj = createInstance(true);
    checkValues(obj, propertyObject);
  });
  test("it should set and correctly return values in ExportName object", () => {
    const obj = createInstance();
    setValues<ExportName>(obj, propertyObject);
    checkValues(obj, propertyObject);
  });
  test("it should return JSON object with ExportName object values", () => {
    const obj = createInstance(true);
    const json = obj.toJSON();
    expect(Object.keys(json).length >= 1).toBeTruthy();
  });
});
