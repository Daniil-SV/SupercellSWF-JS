import { expect, test } from "@jest/globals";
import { log } from "console";
import { inspect } from "util";

import { Shape, ShapeDrawCommand, ShapeDrawCommandVertex } from "../../";
import { checkValues, setValues } from "../Utils";

const vertexPropertyObject = {
  x: 10,
  y: 5,
  u: 15,
  v: 20,
};

function createVertexInstance(
  setProperty: boolean = false
): ShapeDrawCommandVertex {
  return new ShapeDrawCommandVertex(setProperty ? vertexPropertyObject : {});
}

const commandPropertyObject = {
  textureIndex: 1,
  vertices: [createVertexInstance(true)],
};

function createCommandInstance(setProperty: boolean = false): ShapeDrawCommand {
  return new ShapeDrawCommand(setProperty ? commandPropertyObject : {});
}

const propertyObject = {
  commands: [createCommandInstance(true)],
};

function createInstance(setProperty: boolean = false): Shape {
  return new Shape(setProperty ? propertyObject : {});
}

describe("ShapeDrawCommandVertex object tests", () => {
  test("it should create new ShapeDrawCommandVertex object", () => {
    const obj = createVertexInstance();
    expect(obj).toBeTruthy();
    expect(obj).toBeInstanceOf(ShapeDrawCommandVertex);
  });
  test("it should create new ShapeDrawCommandVertex object with property object in costructor", () => {
    const obj = createVertexInstance(true);
    checkValues(obj, vertexPropertyObject);
  });
  test("it should set and correctly return values in ShapeDrawCommandVertex object", () => {
    const obj = createVertexInstance();
    setValues<ShapeDrawCommandVertex>(obj, vertexPropertyObject);
    checkValues(obj, vertexPropertyObject);
  });
  test("it should return JSON object with ShapeDrawCommandVertex object values", () => {
    const obj = createVertexInstance(true);
    const json = obj.toJSON();
    expect(Object.keys(json).length >= 1).toBeTruthy();
  });
  test("it should return describe about ShapeDrawCommandVertex object", () => {
    const obj = createVertexInstance(true);
    const str = inspect(obj, false, 5);
    log(
      `Representation of ShapeDrawCommandVertex object in a string looks like: ${str}`
    );
    expect(str).toBeTruthy();
  });
});

describe("ShapeDrawCommand object tests", () => {
  test("it should create new ShapeDrawCommand object", () => {
    const obj = createCommandInstance();
    expect(obj).toBeTruthy();
    expect(obj).toBeInstanceOf(ShapeDrawCommand);
  });
  test("it should create new ShapeDrawCommand object with property object in costructor", () => {
    const obj = createCommandInstance(true);
    checkValues(obj, commandPropertyObject);
  });
  test("it should set and correctly return values in ShapeDrawCommand object", () => {
    const obj = createCommandInstance();
    setValues<ShapeDrawCommand>(obj, commandPropertyObject);
    checkValues(obj, commandPropertyObject);
  });
  test("it should return JSON object with ShapeDrawCommand object values", () => {
    const obj = createCommandInstance(true);
    const json = obj.toJSON();
    expect(Object.keys(json).length >= 1).toBeTruthy();
  });
  test("it should return describe about ShapeDrawCommand object", () => {
    const obj = createCommandInstance(true);
    const str = inspect(obj, false, 5);
    log(
      `Representation of ShapeDrawCommand object in a string looks like: ${str}`
    );
    expect(str).toBeTruthy();
  });
});

describe("Shape object tests", () => {
  test("it should create new Shape object", () => {
    const obj = createInstance();
    expect(obj).toBeTruthy();
    expect(obj).toBeInstanceOf(Shape);
  });
  test("it should create new Shape object with property object in costructor", () => {
    const obj = createInstance(true);
    checkValues(obj, propertyObject);
  });
  test("it should set and correctly return values in Shape object", () => {
    const obj = createInstance();
    setValues<Shape>(obj, propertyObject);
    checkValues(obj, propertyObject);
  });
  test("it should return JSON object with Shape object values", () => {
    const obj = createInstance(true);
    const json = obj.toJSON();
    expect(Object.keys(json).length >= 1).toBeTruthy();
  });
  test("it should return describe about Shape object", () => {
    const obj = createInstance(true);
    const str = inspect(obj, false, 5);
    log(`Representation of Shape object in a string looks like: ${str}`);
    expect(str).toBeTruthy();
  });
});
