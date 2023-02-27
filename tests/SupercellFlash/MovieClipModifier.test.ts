import { expect, test } from "@jest/globals";
import { log } from "console";
import { inspect } from "util";

import { ModifierType, MovieClipModifier } from "../../";
import { checkValues, setValues } from "../Utils";

const propertyObject = {
  id: 20,
  type: ModifierType.Masked,
};

function createInstance(setProperty: boolean = false): MovieClipModifier {
  return new MovieClipModifier(setProperty ? propertyObject : {});
}

describe("MovieClipModifier object tests", () => {
  test("it should create new Matrix object", () => {
    const obj = createInstance();
    expect(obj).toBeTruthy();
    expect(obj).toBeInstanceOf(MovieClipModifier);
  });
  test("it should create new MovieClipModifier object with property object in costructor", () => {
    const obj = createInstance(true);
    checkValues(obj, propertyObject);
  });
  test("it should set and correctly return values in MovieClipModifier object", () => {
    const obj = createInstance();
    setValues<MovieClipModifier>(obj, propertyObject);
    checkValues(obj, propertyObject);
  });
  test("it should return JSON object with MovieClipModifier object values", () => {
    const obj = createInstance(true);
    const json = obj.toJSON();
    expect(Object.keys(json).length >= 1).toBeTruthy();
  });
  test("it should return describe about MovieClipModifier object", () => {
    const obj = createInstance(true);
    const str = inspect(obj, false, 5);
    log(
      `Representation of MovieClipModifier object in a string looks like: ${str}`
    );
    expect(str).toBeTruthy();
  });
});
