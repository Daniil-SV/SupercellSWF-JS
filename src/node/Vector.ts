
export type vector_item_getter<T> = (index: number) => T | undefined;
export type vector_items_push_back<T> = (...items: Array<T>) => number;
export type vector_get_length = () => number;
export type vector_set_length = (num: number) => void;

interface VectorGetters<P, C> {
    context?: P,
    get_item: vector_item_getter<C>;
    push_back: vector_items_push_back<C>;
    get_length: vector_get_length;
    set_length: vector_set_length;
}

export class Vector<P, C> {
    /* Defintion as indexable */
    [object: number]: C;

    [Symbol.toStringTag]() {
        return "Vector Object";
    }

    /* Proxy */
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
            return true; // TODO
        }
    }

    /* Iterator */
    private make_iterator() {
        let nextIndex = 0;
        let iter_length = this.length;
        let iter_at = this.data.get_item;
        return {
            next() {
                return nextIndex < iter_length
                    ? {
                        value: iter_at(nextIndex++),
                        done: false,
                    }
                    : {
                        done: true,
                    };
            },
        };
    }

    /* Object with setters and getters */
    private readonly data: VectorGetters<P, C>;

    /*
     ! Object constructor !
    */

    constructor(
        data: VectorGetters<P, C>,
        context: P,
    ) {
        if (!data.context) {
            data.context = context
        }
        this.data = data;

        return new Proxy(this, Vector.proxy);
    }

    /* Iterator */
    [Symbol.iterator]() {
        return this.make_iterator();
    }

    /* 
    ! Functions !
    */

    at(index: number): C | undefined {
        return this.data.get_item(index);
    }

    push(...items: C[]): number {
        let item_count = 0;
        for (const item of items) {
            if (this.data.push_back(item)) {
                item_count++;
            }
        }
        return item_count;
    }

    get length(): number {
        return this.data.get_length.bind(this.data.context)();
    }

    set length(num: number) {
        this.data.set_length(num);
    }
}