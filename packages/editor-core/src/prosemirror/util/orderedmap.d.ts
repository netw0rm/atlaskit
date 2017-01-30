export class OrderedMap<T> {
  get(key: string): any | null;
  update(key: string, value: any, newKey?: string): this;
  remove(key: string): this;
  addToStart(key: string, value: any): this;
  addToEnd(key: string, value: any): this;
  addBefore(place: string, key: string, value: any): this;
  forEach(f: (key: string, value: any) => void): void;
  prepend(map: { [key: string]: any } | OrderedMap<T>): this;
  append(map: { [key: string]: any } | OrderedMap<T>): this;
  subtract(map: { [key: string]: any } | OrderedMap<T>): this;
  size: number;

  static from<T>(value?: { [key: string]: T } | OrderedMap<T>): OrderedMap<T>;
}
