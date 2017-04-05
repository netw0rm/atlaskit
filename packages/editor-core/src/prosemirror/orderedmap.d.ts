export class OrderedMap<T> {
  get(key: string): T | undefined;
  update(key: string, value: T, newKey?: string): this;
  remove(key: string): this;
  addToStart(key: string, value: T): this;
  addToEnd(key: string, value: T): this;
  addBefore(place: string, key: string, value: T): this;
  forEach(f: (key: string, value: T) => void): void;
  prepend(map: { [key: string]: T } | OrderedMap<T>): this;
  append(map: { [key: string]: T } | OrderedMap<T>): this;
  subtract(map: { [key: string]: T } | OrderedMap<T>): this;
  readonly size: number;

  static from<T>(value?: { [key: string]: T } | OrderedMap<T>): OrderedMap<T>;
}
