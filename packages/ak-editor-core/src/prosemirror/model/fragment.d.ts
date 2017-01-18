import { Node, Schema } from '../';
import { DOMFragment } from '../dom';

export class Fragment {
  toString(): string;
  textBetween(from: number, to: number, separator: string): string;
  cut(from: number, to?: number): Fragment;
  append(other: Fragment): Fragment;
  replaceChild(index: number, node: Node): Fragment;
  toJSON(): { [key: string]: any } | null;
  eq(other: Fragment | Node): boolean;
  firstChild?: Node;
  lastChild?: Node;
  childCount: number;
  child(index: number): Node;
  maybeChild(index: number): Node | null;
  forEach(f: (node: Node, offset: number, index: number) => void): void;
  findDiffStart(other: Fragment): number | null;
  findDiffEnd(other: Node): { a: number, b: number } | null;
  findIndex(pos: number, round?: number): { index: number, offset: number };
  toDOM(options?: { [key: string]: any }): DOMFragment;

  static fromJSON(schema: Schema, value?: { [key: string]: any }): Fragment;
  static fromArray(array: Node[]): Fragment;
  static from(nodes?: Fragment | Node | Node[]): Fragment;
  static empty: Fragment;
}
