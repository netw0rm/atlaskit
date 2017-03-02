import { ContentMatch, Fragment, Mark, MarkType, NodeType, ResolvedPos, Schema, Slice } from './';

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
  nodesBetween(from: number | null, to: number | null, f: (node: Node, pos: number, parent: Node, index: number) => void): void;
  descendants(f: (node: Node, pos: number, parent: Node) => void): void;
  textContent: string;
  textBetween(from: number, to: number, blockSeparator?: string, leafText?: string): string;
  firstChild?: Node;
  lastChild?: Node;
  eq(other: Node): boolean;
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
  resolve(pos: number): ResolvedPos;
  resolveNoCache(pos: number): ResolvedPos;
  rangeHasMark(from: number | null, to: number | null, type: MarkType): boolean;
  isBlock: boolean;
  isTextblock: boolean;
  isInline: boolean;
  isText: boolean;
  isLeaf: boolean;
  toString(): string;
  contentMatchAt(index: number): ContentMatch;
  canReplace(from: number, to: number, replacement?: Fragment, start?: number, end?: number): boolean;
  canReplaceWith(from: number, to: number, type: NodeType, attrs?: Mark[]): boolean;
  canAppend(other: Node): boolean;
  toJSON(): { [key: string]: any };
  defaultContentType(at: number);

  static fromJSON(schema: Schema<any, any>, json: { [key: string]: any }): Node;
}
