export function assert_item<T, R>(item: T, proto: any): undefined | R {
    return item ? new proto(item) : item
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