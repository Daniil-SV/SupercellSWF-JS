import * as util from "util";

import { Iterable, IterableEntries, IterableRange } from "./Util";

export type VectorItemGetter = (index: number) => External | undefined;
export type VectorItemSetter<T> = (item: T, position: number) => boolean;
export type VectorItemRemove = (index: number) => boolean;
export type VectorGetLength = () => number;
export type VectorSetLength = (num: number) => void;

export type VectorCallbackType<Parent, T, R> = (
  element: T,
  index?: number,
  array?: ThisType<Vector<Parent, T>>
) => R;

interface VectorGetters<T> {
  Initializer: any;
  getItem: VectorItemGetter;
  insertItem: VectorItemSetter<T>;
  removeItem: VectorItemRemove;
  getLength: VectorGetLength;
  setLength: VectorSetLength;
}

export interface Indexable<T> {
  [object: number]: T;
  [Symbol.iterator]: () => IterableIterator<T>;
}

export class Vector<Parent, T> implements Indexable<T> {
  /* Definition for proxy */
  private static readonly _proxy: ProxyHandler<Vector<any, any>> = {
    get(target, property, receiver): any {
      const value = Reflect.get(target, property, receiver);
      if (typeof (target as any)[property] !== "undefined") {
        return value;
      } else {
        return target.at(Number(property));
      }
    },
    set(target, property, value): boolean {
      if (typeof (target as any)[property] !== "undefined") {
        target[property as any] = value;
      } else {
        const index = Number(value);

        if (target.length > index) {
          target.splice(Number(property), 1, value);
        } else {
          return target.push(value) === 1;
        }
      }

      return true;
    },
  };

  /* Object with setters and getters */
  protected readonly data: {
    Initializer: any;
    context: Parent;
    cached: Array<T | null>;
    getItem: VectorItemGetter;
    insertItem: VectorItemSetter<T>;
    removeItem: VectorItemRemove;
    getLength: VectorGetLength;
    setLength: VectorSetLength;
  };

  /*
     ! Object constructor !
    */
  constructor(data: VectorGetters<T>, context: Parent) {
    this.data = {
      context,
      cached: [],
      Initializer: data.Initializer,
      getItem: data.getItem,
      insertItem: data.insertItem,
      removeItem: data.removeItem,
      getLength: data.getLength,
      setLength: data.setLength,
    };

    return new Proxy(this, Vector._proxy);
  }

  /* Defintion as indexable */
  [object: number]: T;

  readonly [Symbol.toStringTag] = "Vector";

  /* View in console */
  [util.inspect.custom](depth: number): string {
    if (this.data === undefined || this.length <= 0) {
      return "[]";
    }

    let result = "[ ";

    const elements = [];
    for (let i = 0; this.length > i && elements.length < 3 * depth; i++) {
      elements.push(util.inspect(this[i], false, depth - 1));
    }
    result += elements.join(", ");
    if (elements.length < this.length) {
      result += ` ...and ${this.length - elements.length} more`;
    }
    result += " ]";
    return result;
  }

  /* Iterator */
  [Symbol.iterator](): IterableIterator<T> {
    return new Iterable<Parent, T>(this);
  }

  /*
   * Function to update cache array with objects. Don't use this if you don't know what you're doing.
   */
  update(): void {
    const len = this.data.getLength.call(this.data.context);
    if (len === this.data.cached.length) {
      return;
    }

    this.data.cached.length = len;
    this.data.cached.fill(null);
  }

  /* 
    ! Functions !
    */

  /*
   * The at() method takes an integer value and returns the item at that index,
   * allowing for positive and negative integers.
   * Negative integers count back from the last item in the array.
   */
  at(index: number): T | undefined {
    let idx = index;
    if (index < 0) {
      idx =
        this.length -
        (Math.abs(index) -
          Math.abs(Math.trunc(index / this.length)) * this.length);
    }

    this.update();

    if (this.data.cached[idx] === null) {
      const nativeItem = this.data.getItem.call(this.data.context, idx);
      if (nativeItem === undefined) {
        return undefined;
      }
      this.data.cached[idx] = new this.data.Initializer(nativeItem);
    }

    const obj = this.data.cached[idx];

    return obj === null ? undefined : obj;
  }

  /*
   * The concat() method is used to merge array.
   * This method change the existing array.
   */
  concat(items: T[] | Vector<Parent, T>): ThisType<Vector<Parent, T>> {
    for (const item of items) {
      if (typeof item !== "undefined") {
        this.push(item);
      }
    }
    return this;
  }

  /*
   * The entries() method returns a new Array Iterator object
   * that contains the key/value pairs for each index in the array.
   */
  entries(): IterableIterator<[number, T]> {
    return new IterableEntries(this);
  }

  /*
   * The fill() method changes all elements in an array to a static value,
   * from a start index (default 0) to an end index (default vector.length)
   */
  fill(value: T, start?: number, end?: number): ThisType<Vector<Parent, T>> {
    for (
      let i = start === undefined ? 0 : start;
      (end === undefined ? this.length : end) > i;
      i++
    ) {
      this[i] = value;
    }
    return this;
  }

  /*
   * The filter() method removes elements from array by callback result
   */
  filter(
    callback: VectorCallbackType<Parent, T, boolean>,
    thisArg: any
  ): ThisType<Vector<Parent, T>> {
    let elementIndex = 0;
    while (this.length > elementIndex) {
      const result = callback.call(
        thisArg !== undefined ? thisArg : this,
        this[elementIndex],
        elementIndex,
        this
      );

      if (typeof result !== "boolean") {
        break;
      }

      if (result) {
        elementIndex++;
      } else {
        this.data.cached.splice(elementIndex, 1);
        this.data.removeItem.call(this.data.context, elementIndex);
      }
    }

    return this;
  }

  /*
   * The find() method returns the first element in the provided array that satisfies the provided testing function.
   * If no values satisfy the testing function, undefined is returned.
   */
  find(
    callback: VectorCallbackType<Parent, T, boolean>,
    thisArg: any
  ): T | undefined {
    for (let i = 0; this.length > i; i++) {
      if (
        callback.call(thisArg !== undefined ? thisArg : this, this[i], i, this)
      ) {
        return this[i];
      }
    }
    return undefined;
  }

  /*
   * The findIndex() method returns the index of the first element in an array that satisfies the provided testing function.
   * If no elements satisfy the testing function, -1 is returned.
   */
  findIndex(
    callback: VectorCallbackType<Parent, T, boolean>,
    thisArg: any
  ): number {
    for (let i = 0; this.length > i; i++) {
      if (
        callback.call(thisArg !== undefined ? thisArg : this, this[i], i, this)
      ) {
        return i;
      }
    }
    return -1;
  }

  /*
   * The findLast() method iterates the array in reverse order and returns the value of the first element that satisfies the provided testing function.
   * If no elements satisfy the testing function, undefined is returned.
   */
  findLast(
    callback: VectorCallbackType<Parent, T, boolean>,
    thisArg: any
  ): T | undefined {
    for (let i = this.length; i > 0; i--) {
      if (
        callback.call(thisArg !== undefined ? thisArg : this, this[i], i, this)
      ) {
        return this[i];
      }
    }
    return undefined;
  }

  /*
   * The findLastIndex() method iterates the array in reverse order and returns the index of the first element that satisfies the provided testing function.
   * If no elements satisfy the testing function, -1 is returned.
   */
  findlastIndex(
    callback: VectorCallbackType<Parent, T, boolean>,
    thisArg: any
  ): number {
    for (let i = this.length; i > 0; i--) {
      if (
        callback.call(thisArg !== undefined ? thisArg : this, this[i], i, this)
      ) {
        return i;
      }
    }
    return -1;
  }

  /*
   * The forEach() method executes a provided function once for each array element.
   */
  forEach(
    callback: VectorCallbackType<Parent, T, undefined>,
    thisArg: any
  ): void {
    for (let i = 0; this.length > i; i++) {
      callback.call(thisArg !== undefined ? thisArg : this, this[i], i, this);
    }
  }

  /*
   * The includes() method determines whether an array includes a certain value among its entries,
   * returning true or false as appropriate.
   */
  includes(item: T): boolean {
    for (const secondItem of this) {
      if (item === secondItem) {
        return true;
      }
    }
    return false;
  }

  /*
   * The join() method creates and returns a new string by concatenating all of the elements in an array,
   * separated by commas or a specified separator string. If the array has only one item,
   * then that item will be returned without using the separator.
   */
  join(separator?: string): string {
    const sep = separator !== undefined ? separator : ",";
    let result = "";
    for (let i = 0; this.length > i; i++) {
      result += String(this[i]) + (i === this.length - 1 ? "" : sep);
    }
    return result;
  }

  /*
   * The keys() method returns a new Array Iterator object that contains the keys for each index in the array.
   */
  keys(): IterableIterator<number> {
    return new IterableRange(this);
  }

  /*
   * The pop() method removes the last element from an array and returns that element.
   * This method changes the length of the array.
   */
  pop(): T | undefined {
    if (this.length <= 0) {
      return undefined;
    }
    const item = this[-1];
    this.data.cached.splice(this.length - 1, 1);
    this.data.removeItem.call(this.data.context, this.length - 1);
    return item;
  }

  /*
   * The push() method adds one or more elements to the end of an array and returns the new length of the array.
   */
  push(...items: T[]): number {
    let itemCount = 0;
    for (const item of items) {
      if (
        this.data.insertItem.call(
          this.data.context,
          item instanceof this.data.Initializer
            ? item
            : new this.data.Initializer(item),
          this.data.getLength.call(this.data.context)
        )
      ) {
        this.data.cached.push(item);
        itemCount++;
      }
    }
    return itemCount;
  }

  /*
   * The shift() method removes the first element from an array and returns that removed element.
   * This method changes the length of the array.
   */
  shift(): T | undefined {
    if (this.length <= 0) {
      return undefined;
    }
    const item = this[0];
    this.data.cached.splice(0, 1);
    this.data.removeItem.call(this.data.context, 0);
    return item;
  }

  some(
    callback: VectorCallbackType<Parent, T, boolean>,
    thisArg: any
  ): boolean {
    for (let i = 0; this.length > i; i++) {
      if (
        callback.call(thisArg !== undefined ? thisArg : this, this[i], i, this)
      ) {
        return true;
      }
    }
    return false;
  }

  /*
   * The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place
   */
  splice(
    start: number,
    deleteCount?: number,
    ...args: T[]
  ): ThisType<Vector<Parent, T>> {
    if (deleteCount !== undefined) {
      for (let d = 0; deleteCount > d; d++) {
        const target = start + deleteCount;
        if (this.length >= target) {
          this.data.cached.splice(target - 1, 1);
          this.data.removeItem.call(this.data.context, target - 1);
        }
      }
    }
    for (const item of args) {
      this.data.cached.splice(start, 0, item);
      this.data.insertItem.call(this.data.context, item, start);
    }
    return this;
  }

  /*
   * The toString() method returns a string representing the specified array and its elements.
   */
  toString(): string {
    return this.join();
  }

  /*
   * The unshift() method adds one or more elements to the beginning of an array and returns the new length of the array.
   */
  unshift(...args: T[]): number {
    for (const item of args) {
      this.data.cached.splice(0, 0, item);
      this.data.insertItem.call(this.data.context, item, 0);
    }
    return this.length;
  }

  values(): IterableIterator<T> {
    return new Iterable<Parent, T>(this);
  }

  indexOf(item: T): number {
    for (let i = 0; this.length > i; i++) {
      if (this.data.cached[i] === null) {
        const nativeItem = this.data.getItem.call(this.data.context, i);
        if (nativeItem !== undefined) {
          this.data.cached[i] = new this.data.Initializer(nativeItem);
        }
      }

      if (this.data.cached[i] === item) {
        return i;
      }
    }

    return -1;
  }

  get length(): number {
    return this.data.getLength.call(this.data.context);
  }

  set length(num: number) {
    this.data.setLength.call(this.data.context, num);
  }

  toJSON(): object {
    const arrayObject = [];
    for (const item of this) {
      arrayObject.push(item);
    }
    return arrayObject;
  }
}
