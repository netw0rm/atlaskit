interface WeakMap<K, V> {
    delete(key: K): boolean;
    get(key: K): V | undefined;
    has(key: K): boolean;
    set(key: K, value?: V): this;
}

interface WeakMapConstructor {
    new (): WeakMap<any, any>;
    new <K, V>(entries?: [K, V][]): WeakMap<K, V>;
    readonly prototype: WeakMap<any, any>;
}

declare var WeakMap: WeakMapConstructor;
export default WeakMap;

