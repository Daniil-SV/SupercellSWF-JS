import { expect } from "@jest/globals";

export function assert_buffer(buff: Buffer | undefined): boolean {
  if (buff === undefined) {
    return false;
  }

  return buff.length !== 0;
}

export class ClassIterator {
  private _index = 0;
  private readonly _object: object;
  private readonly _propertyList: string[];
  constructor(obj: object, propertyList: string[]) {
    this._object = obj;
    this._propertyList = propertyList;
  }

  next(): IteratorResult<[string, any]> {
    if (this._index < this._propertyList.length) {
      const key = this._propertyList[this._index++];
      return {
        value: [key, this._object[key as keyof typeof this._object]],
        done: false,
      };
    } else {
      return {
        value: undefined,
        done: true,
      };
    }
  }

  [Symbol.iterator](): Iterator<[string, any]> {
    return new ClassIterator(this._object, this._propertyList);
  }
}

export function setProperty<T, K extends keyof T>(
  obj: T,
  key: K,
  value: any
): void {
  obj[key] = value;
}

export function setValues<T>(obj: T, propertyObject: object): void {
  for (const [key] of new ClassIterator(
    obj as unknown as object,
    Object.keys(propertyObject)
  )) {
    setProperty<T, any>(
      obj,
      key,
      propertyObject[key as keyof typeof propertyObject]
    );
  }
}

export function checkValues(obj: object, propertyObject: object): void {
  for (const [key, value] of new ClassIterator(
    obj,
    Object.keys(propertyObject)
  )) {
    const secondValue = propertyObject[
      key as keyof typeof propertyObject
    ] as any;

    switch (typeof value) {
      case "number":
      case "bigint":
        expect(value).toBeCloseTo(secondValue);
        break;
      case "object":
        if (Buffer.isBuffer(value)) {
          expect(value.toString("hex")).toBe(
            (secondValue as Buffer).toString("hex")
          );
        } else if (
          typeof value[Symbol.iterator] === "function" &&
          typeof secondValue[Symbol.iterator] === "function" // If Arrays
        ) {
          const iter: Iterator<any> = value[Symbol.iterator]();
          const secondIter = secondValue[Symbol.iterator]();

          if (
            value["length"] !== undefined &&
            secondValue["length"] !== undefined
          ) {
            if (value["length"] !== secondValue["length"]) {
              throw new Error(`${key} has different length`);
            }
          }

          while (true) {
            const iterValues = iter.next();
            const secondIterValues = secondIter.next();

            expect(iterValues.done).toStrictEqual(secondIterValues.done);
            expect(JSON.stringify(iterValues.value)).toStrictEqual(
              JSON.stringify(secondIterValues.value)
            );

            if (iterValues.done === false && secondIterValues.done === false) {
              break;
            }
          }
        }

        break;
      case "string":
      case "boolean":
      default:
        expect(value).toStrictEqual(secondValue);
    }
  }
}
