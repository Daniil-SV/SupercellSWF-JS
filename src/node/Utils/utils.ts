import { type Vector } from "./Vector";

// eslint-disable-next-line @typescript-eslint/naming-convention
export function assert_item<T, R>(item: T, Constuctor: any): R | undefined {
  return item === undefined ? undefined : new Constuctor(item);
}

export class Iterable<Parent, T> {
  private _index = 0;
  private readonly _context: Vector<Parent, T>;
  constructor(cntx: Vector<Parent, T>) {
    this._context = cntx;
  }

  next(): IteratorResult<T> {
    if (this._index < this._context.length) {
      return {
        value: this._context.at(this._index++) as T,
        done: false,
      };
    } else {
      return {
        value: undefined,
        done: true,
      };
    }
  }
}

export class IterableEntries<Parent, T> implements Iterator<[number, T]> {
  private _index = 0;
  private readonly _context: Vector<Parent, T>;
  constructor(cntx: Vector<Parent, T>) {
    this._context = cntx;
  }

  next(): IteratorResult<[number, T]> {
    if (this._index < this._context.length) {
      return {
        value: [this._index, this._context.at(this._index++) as T],
        done: false,
      };
    } else {
      return {
        value: undefined,
        done: true,
      };
    }
  }
}

export class IterableRange<Parent, T> implements Iterator<number> {
  private _index = 0;
  private readonly _context: Vector<Parent, T>;
  constructor(cntx: Vector<Parent, T>) {
    this._context = cntx;
  }

  next(): IteratorResult<number> {
    if (this._index < this._context.length) {
      return {
        value: this._index++,
        done: false,
      };
    } else {
      return {
        value: undefined,
        done: true,
      };
    }
  }
}
