export function extend_to<NATIVE, NODE>(item: NATIVE, prototype: any): NODE {
    return Object.setPrototypeOf(
        item,
        Object.getPrototypeOf(new prototype())
    )
}

export type IteratorType<T> = () => {
    value: T,
    done: boolean
}

export class Iterable<T> {
    constructor(iterator: IteratorType<T>) {
        this.next = iterator;
        return this;
    }
    
    readonly next: IteratorType<T>;
    // next() { return { value: undefined, done: true } }

    [Symbol.iterator]() {
        return {
            next: this.next
        };
    }
}