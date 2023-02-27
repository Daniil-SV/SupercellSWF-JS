import { expect, test } from "@jest/globals";
import { log } from "console";
import { inspect } from "util";

import {
  DisplayObjectInstance,
  MovieClip,
  MovieClipFrame,
  MovieClipFrameElement,
} from "../../";
import { checkValues, setValues } from "../Utils";

const displayObjectProperty = {
  id: 5,
  blend: 1,
  name: "bindname",
};

function createDisplayObject(
  setProperty: boolean = false
): DisplayObjectInstance {
  return new DisplayObjectInstance(setProperty ? displayObjectProperty : {});
}

const framePropertyObject = {
  label: "framName",
  elementsCount: 1,
};

function createFrameInstance(setProperty: boolean = false): MovieClipFrame {
  return new MovieClipFrame(setProperty ? framePropertyObject : {});
}

const frameElementObject = {
  instanceIndex: 1,
  matrixIndex: 65535,
  colorTransformIndex: 10,
};

function createFrameElementInstance(
  setProperty: boolean = false
): MovieClipFrameElement {
  return new MovieClipFrameElement(setProperty ? frameElementObject : {});
}

const propertyObject = {
  id: 10,
  frameRate: 15,
  scalingGrid: { x: -10, y: -20.5, width: 100, height: 100 },
  matrixBankIndex: 39,
  instances: [createDisplayObject(true)],
  frames: [createFrameInstance(true)],
  frameElements: [createFrameElementInstance(true)],
};

function createInstance(setProperty: boolean = false): MovieClip {
  return new MovieClip(setProperty ? propertyObject : {});
}

describe("DisplayObjectInstance object tests", () => {
  test("it should create new DisplayObjectInstance object", () => {
    const obj = createDisplayObject();
    expect(obj).toBeTruthy();
    expect(obj).toBeInstanceOf(DisplayObjectInstance);
  });
  test("it should create new DisplayObjectInstance object with property object in costructor", () => {
    const obj = createDisplayObject(true);
    checkValues(obj, createDisplayObject);
  });
  test("it should set and correctly return values in DisplayObjectInstance object", () => {
    const obj = createDisplayObject();
    setValues<DisplayObjectInstance>(obj, createDisplayObject);
    checkValues(obj, createDisplayObject);
  });
  test("it should return JSON object with DisplayObjectInstance object values", () => {
    const obj = createDisplayObject(true);
    const json = obj.toJSON();
    expect(Object.keys(json).length >= 1).toBeTruthy();
  });
  test("it should return describe about DisplayObjectInstance object", () => {
    const obj = createDisplayObject(true);
    const str = inspect(obj, false, 5);
    log(
      `Representation of DisplayObjectInstance object in a string looks like: ${str}`
    );
    expect(str).toBeTruthy();
  });
});

describe("MovieClip object tests", () => {
  test("it should create new MovieClip object", () => {
    const obj = createInstance();
    expect(obj).toBeTruthy();
    expect(obj).toBeInstanceOf(MovieClip);
  });
  test("it should create new MovieClip object with property object in costructor", () => {
    const obj = createInstance(true);
    checkValues(obj, propertyObject);
  });
  test("it should set and correctly return values in MovieClip object", () => {
    const obj = createInstance();
    setValues<MovieClip>(obj, propertyObject);
    checkValues(obj, propertyObject);
  });
  test("it should return JSON object with MovieClip object values", () => {
    const obj = createInstance(true);
    const json = obj.toJSON();
    expect(Object.keys(json).length >= 1).toBeTruthy();
  });
  test("it should return describe about MovieClip object", () => {
    const obj = createInstance(true);
    const str = inspect(obj, false, 5);
    log(`Representation of MovieClip object in a string looks like: ${str}`);
    expect(str).toBeTruthy();
  });
  test("it should create new object from MovieClip instance", () => {
    const obj = new MovieClip(createInstance(true));
    checkValues(obj, propertyObject);
  });
});
