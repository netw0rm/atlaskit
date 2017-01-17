import { Fragment, NodeType, Mark, MarkType, ResolvedPos, Slice } from '../';
import { DOMNode } from '../dom';
import { ContentMatch } from './content';

export class Node {
  type: NodeType;
  attrs: { [key: string]: any };
  content: Fragment;
  marks: Mark[];
  nodeSize: number;
  text?: string;
  childCount: number;
  child(index: number): Node;
  maybeChild(index: number): Node | null;
  forEach(f: (node: Node, offset: number, index: number) => void): void;
  textContent: string;
  textBetween(from: number, to: number, separator?: string): string;
  firstChild?: Node;
  lastChild?: Node;
  eq(other: Fragment | Node): boolean;
  sameMarkup(other: Node): boolean;
  hasMarkup(type: NodeType, attrs?: { [key: string]: any }, marks?: Mark[]): boolean;
  copy(content?: Fragment): Node;
  mark(marks: Mark[]): Node;
  cut(from: number, to?: number): Node;
  slice(from: number, to?: number): Slice;
  replace(from: number, to: number, slice: Slice): Node;
  nodeAt(pos: number): Node | null;
  childAfter(pos: number): { node?: Node, index: number, offset: number };
  childBefore(pos: number): { node?: Node, index: number, offset: number };
  nodesBetween(from?: number, to?: number, f: (node: Node, pos: number, parent: Node, index: number) => void): void;
  descendants(f: (node: Node, pos: number, parent: Node) => void): void;
  resolve(pos: number): ResolvedPos;
  marksAt(pos: number): Mark[];
  rangeHasMark(from?: number, to?: number, type: MarkType): boolean;
  isBlock: boolean;
  isTextblock: boolean;
  isInline: boolean;
  isText: boolean;
  toString(): string;
  contentMatchAt(index: number): ContentMatch;
  canReplace(from: number, to: number, replacement?: Fragment, start?: number, end?: number): boolean;
  canReplaceWith(from: number, to: number, type: NodeType, attrs?: Mark[]): boolean;
  canAppend(other: Node): boolean;
  toJSON(): { [key: string]: any };
  toDOM(options?: { [key: string]: any }): DOMNode;

  static fromJSON(schema: Schema, json: { [key: string]: any }): Node;
}
