import { expect, test } from "@jest/globals";
import { log } from "console";
import { inspect } from "util";

import { TextField } from "../../src";
import { checkValues, setValues } from "../Utils";

const propertyObject = {
  id: 10,
  text: "placeholder test",
  fontName: "someName",
  fontColor: 0xffffff,
  fontSize: 70,
  fontAlign: 18,
  left: 10,
  top: 20,
  right: 30,
  bottom: 40,
  isBold: true,
  isItalic: true,
  isMultiline: true,
  isOutlined: true,
  outlineColor: 0xff00ff,
  useDeviceFont: true,
  autoAdjustFontBounds: true,
};

function createInstance(setProperty: boolean): TextField {
  return new TextField(setProperty ? propertyObject : {});
}

describe("TextField object tests", () => {
  test("it should create new TextField object", () => {
    const obj = createInstance(false);
    expect(obj).toBeTruthy();
    expect(obj).toBeInstanceOf(TextField);
  });

  test("it should create new TextField object with property object in costructor", () => {
    const obj = createInstance(true);

    checkValues(obj, propertyObject);
  });

  test("it should set and correctly return values in TextField object", () => {
    const obj = createInstance(false);
    setValues<TextField>(obj, propertyObject);
    checkValues(obj, propertyObject);
  });

  test("it should return JSON object with TextField object values", () => {
    const obj = createInstance(true);
    const json = obj.toJSON();
    expect(Object.keys(json).length >= 1).toBeTruthy();
  });

  test("it should return describe about TextField object", () => {
    const obj = createInstance(true);
    const str = inspect(obj);
    log(`Representation of TextField object in a string looks like: ${str}`);
    expect(str).toBeTruthy();
  });
});
