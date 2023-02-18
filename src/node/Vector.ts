import * as util from 'util';
import { Iterable } from './utils';

export type vector_item_getter<T> = (index: number) => T | undefined;
export type vector_item_setter<T> = (item: T, position: number) => boolean;
export type vector_item_remove = (index: number) => boolean;
export type vector_get_length = () => number;
export type vector_set_length = (num: number) => void;

export type vector_callback_type<Parent, T, R> = (element: T, index?: number, array?: ThisType<Vector<Parent, T>>) => R;
//export type vector_callback_type<Parent, T, R> = (callback: vector_callback_function_type<Parent, T>, thisArg?: any) => R;

interface VectorGetters<Parent, T> {
    [x: string]: any;
    context?: Parent,
    get_item: vector_item_getter<T>;
    insert_item: vector_item_setter<T>;
    remove_item: vector_item_remove;
    get_length: vector_get_length;
    set_length: vector_set_length;
}

export class Vector<Parent, T> {
    /* Definition for proxy */
    private static proxy: ProxyHandler<Vector<any, any>> = {
        get(target, property, receiver): any {
            let value = Reflect.get(target, property, receiver);
            if (typeof (target as any)[property] !== "undefined") {
                return value;
            } else {
                return target.at(Number(property));
            }
        },
        set(target, property, value): boolean {
            const index = Number(property);
            if (Number.isNaN(index)) {
                return false;
            }

            if (target.length > index) {
                target.splice(Number(property), 1, value);
            } else {
                return target.push(value) == 1;
            }

            return true;
        }
    }

    /* Object with setters and getters */
    protected readonly data: VectorGetters<Parent, T>;

    /*
     ! Object constructor !
    */
    constructor(
        data: VectorGetters<Parent, T>,
        context?: Parent,
    ) {
        this.data = data;
        if (context) {
            this.data.context = context;
        }

        return new Proxy(this, Vector.proxy);
    }

    /* Defintion as indexable */
    [object: number]: T;

    get [Symbol.toStringTag]() {
        return "Vector";
    }

    /* View in console */
    [util.inspect.custom](depth: number) {
        let result = "[ "

        let elements = [];
        for (let i = 0; this.length > i && elements.length < 3 * depth; i++) {
            elements.push(util.inspect(this[i], false, depth - 1))
        }
        result += elements.join(", ")
        if (elements.length < this.length) {
            result += ` ...and ${this.length - elements.length} more`
        }
        result += " ]"
        return result;
    };

    /* Iterator */
    [Symbol.iterator]() {
        let nextIndex = 0;
        const iter_length = this.length;
        const iter_at = this.data.get_item;
        const iter_context = this.data.context;

        return new Iterable(function () {
            return nextIndex < iter_length
                ? {
                    value: iter_at.call(iter_context, nextIndex++),
                    done: false,
                }
                : {
                    value: undefined,
                    done: true
                };
        });
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
            idx = this.length - (Math.abs(index) - (Math.abs(Math.trunc(index / this.length)) * this.length))
        }
        return this.data.get_item.call(this.data.context, idx);
    }

    /* 
    * The concat() method is used to merge array. 
    * This method change the existing array.
    */
    concat(items: Array<T> | Vector<Parent, T>) {
        for (const item of items) {
            if (typeof item != 'undefined') {
                this.push(item);
            }
        }
        return this;
    }

    /* 
    * The entries() method returns a new Array Iterator object
    * that contains the key/value pairs for each index in the array.
    */
    entries() {
        let nextIndex = 0;
        const iter_length = this.length;
        const iter_at = this.data.get_item;
        const iter_context = this.data.context;
        return new Iterable(function () {
            {
                return nextIndex < iter_length
                    ? {
                        value: [nextIndex, iter_at.call(iter_context, nextIndex++)],
                        done: false,
                    }
                    : {
                        value: undefined,
                        done: true
                    };
            }
        });
    }

    /* 
    * The fill() method changes all elements in an array to a static value,
    * from a start index (default 0) to an end index (default vector.length)
    */
    fill(value: T, start?: number, end?: number) {
        for (let i = start ? start : 0; end ? end : this.length > i; i++) {
            this[i] = value;
        }
        return this
    }

    /* 
    * The filter() method removes elements from array by callback result
    */
    filter(callback: vector_callback_type<Parent, T, Boolean>, thisArg: any) {
        let element_index = 0;
        while (this.length > element_index) {
            let result = callback.call(thisArg ? thisArg : this, this[element_index], element_index, this);

            if (typeof result != 'boolean') {
                break;
            }

            if (result) {
                element_index++;
            } else {
                this.data.remove_item(element_index);
            }

        }

        return this;
    }

    /* 
    * The find() method returns the first element in the provided array that satisfies the provided testing function.
    * If no values satisfy the testing function, undefined is returned.
    */
    find(callback: vector_callback_type<Parent, T, Boolean>, thisArg: any) {
        for (let i = 0; this.length > i; i++) {
            if (callback.call(thisArg ? thisArg : this, this[i], i, this)) {
                return this[i];
            }
        }
        return undefined;
    }

    /* 
    * The findIndex() method returns the index of the first element in an array that satisfies the provided testing function.
    * If no elements satisfy the testing function, -1 is returned.
    */
    findIndex(callback: vector_callback_type<Parent, T, Boolean>, thisArg: any) {
        for (let i = 0; this.length > i; i++) {
            if (callback.call(thisArg ? thisArg : this, this[i], i, this)) {
                return i;
            }
        }
        return -1;
    }

    /* 
    * The findLast() method iterates the array in reverse order and returns the value of the first element that satisfies the provided testing function. 
    * If no elements satisfy the testing function, undefined is returned.
    */
    findLast(callback: vector_callback_type<Parent, T, Boolean>, thisArg: any) {
        for (let i = this.length; i > 0; i--) {
            if (callback.call(thisArg ? thisArg : this, this[i], i, this)) {
                return this[i];
            }
        }
        return undefined;
    }

    /* 
    * The findLastIndex() method iterates the array in reverse order and returns the index of the first element that satisfies the provided testing function. 
    * If no elements satisfy the testing function, -1 is returned.
    */
    findlastIndex(callback: vector_callback_type<Parent, T, Boolean>, thisArg: any) {
        for (let i = this.length; i > 0; i--) {
            if (callback.call(thisArg ? thisArg : this, this[i], i, this)) {
                return i;
            }
        }
        return -1;
    }

    /* 
    * The forEach() method executes a provided function once for each array element.
    */
    forEach(callback: vector_callback_type<Parent, T, undefined>, thisArg: any) {
        for (let i = 0; this.length > i; i++) {
            callback.call(thisArg ? thisArg : this, this[i], i, this);
        }
    }

    /* 
    * The includes() method determines whether an array includes a certain value among its entries,
    * returning true or false as appropriate.
    */
    includes(item: T): boolean {
        for (const second_item of this) {
            if (item == second_item) {
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
    join(separator?: string) {
        const sep = separator != undefined ? separator : ",";
        let result = ""
        for (let i = 0; this.length > i; i++) {
            result += String(this[i]) + (i == this.length - 1 ? "" : sep);
        }
        return result;
    }

    /* 
    * The keys() method returns a new Array Iterator object that contains the keys for each index in the array.
    */
    keys() {
        let nextIndex = 0;
        const iter_length = this.length;
        return new Iterable(function () {
            {
                return nextIndex < iter_length
                    ? {
                        value: nextIndex++,
                        done: false,
                    }
                    : {
                        value: undefined,
                        done: true
                    };
            }
        });
    }

    /* 
    * The pop() method removes the last element from an array and returns that element.
    * This method changes the length of the array.
    */
    pop() {
        if (this.length <= 0) {
            return undefined;
        }
        const item = this[-1];
        this.data.remove_item.call(this.data.context, this.length - 1);
        return item;
    }

    /* 
    * The push() method adds one or more elements to the end of an array and returns the new length of the array.
    */
    push(...items: T[]): number {
        let item_count = 0;
        for (const item of items) {
            if (this.data.insert_item.call(
                this.data.context,
                item,
                this.data.get_length.call(this.data.context))) {
                item_count++;
            }
        }
        return item_count;
    }

    /* 
    * The shift() method removes the first element from an array and returns that removed element.
    * This method changes the length of the array.
    */
    shift() {
        if (this.length <= 0) {
            return undefined;
        }
        const item = this[0];
        this.data.remove_item.call(this.data.context, 0);
        return item;
    }

    some(callback: vector_callback_type<Parent, T, Boolean>, thisArg: any) {
        for (let i = 0; this.length > i; i++) {
            if (callback.call(thisArg ? thisArg : this, this[i], i, this)) {
                return true;
            }
        }
        return false;
    }

    /* 
    * The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place
    */
    splice(start: number, deleteCount?: number, ...args: T[]) {
        if (deleteCount != undefined) {
            for (let d = 0; deleteCount > d; d++) {
                const target = start + deleteCount;
                if (this.length >= target) {
                    this.data.remove_item.call(this.data.context, target - 1);
                }
            }
        }
        for (const item of args) {
            this.data.insert_item.call(this.data.context, item, start);
        }
        return this;
    }

    /* 
    * The toString() method returns a string representing the specified array and its elements.
    */
    toString() {
        return this.join();
    }

    /* 
    * The unshift() method adds one or more elements to the beginning of an array and returns the new length of the array.
    */
    unshift(...args: T[]) {
        for (const item of args) {
            this.data.insert_item.call(this.data.context, item, 0);
        }
        return this.length
    }

    values() {
        let nextIndex = 0;
        const iter_length = this.length;
        const iter_at = this.data.get_item;
        const iter_context = this.data.context;
        return new Iterable(function () {
            {
                return nextIndex < iter_length
                    ? {
                        value: iter_at.call(iter_context, nextIndex++),
                        done: false,
                    }
                    : {
                        value: undefined,
                        done: true
                    };
            }
        });
    }

    get length(): number {
        return this.data.get_length.call(this.data.context);
    }

    set length(num: number) {
        this.data.set_length.call(this.data.context, num);
    }
}