import { Fragment, Mark, Node } from './';
import { OrderedMap } from '../util/orderedmap';
import { DOMOutputSpec } from './to_dom';
import { ParseSpec } from './from_dom';
import { DOMNode } from '../dom';

export class NodeType {
  constructor(name: string, schema: Schema);

  name: string;
  schema: Schema;
  isBlock: boolean;
  attrs: Attributes;
  isTextblock: boolean;
  isInline: boolean;
  isText: boolean;
  isLeaf: boolean;
  selectable: boolean;
  draggable: boolean;
  create(attrs?: { [key: string]: any }, content?: Fragment | Node | Node[] | string, marks?: Mark[]): Node;
  createChecked(attrs?: { [key: string]: any }, content?: Fragment | Node | Node[], marks?: Mark[]): Node;
  createAndFill(attrs?: { [key: string]: any }, content?: Fragment | Node | Node[], marks?: Mark[]): Node | null;
  validContent(content: Fragment, attrs?: { [key: string]: any }): boolean;
  toDOM(_: Node): DOMOutputSpec;
  matchDOMTag: { [key: string]: ParseSpec | ((_0: DOMNode) => boolean | ParseSpec) };
}

export class Block extends NodeType {}

export class Inline extends NodeType {}

export class Text extends Inline {}

export interface Attributes {
  [key: string]: Attribute;
}

export class Attribute {
  constructor(options?: { [key: string]: any });
}

export class MarkType {
  constructor(name: string, rank: number, schema: Schema); // private
  isCode?: boolean; // private
  name: string;
  schema: Schema;
  inclusiveRight: boolean;
  create(attrs?: { [key: string]: any }): Mark;
  removeFromSet(set: Mark[]): Mark[];
  isInSet(set: Mark[]): Mark | null;
  toDOM(mark: Mark): DOMOutputSpec;
  matchDOMTag: { [key: string]: ParseSpec | ((_0: DOMNode) => boolean | ParseSpec) };
  matchDOMStyle: { [key: string]: { [key: string]: any } | null | ((_0: string) => boolean | { [key: string]: any } | null) };
}

export class Schema {
  constructor(spec: SchemaSpec, data?: any);

  nodeSpec: OrderedMap<NodeSpec>;
  markSpec: OrderedMap<{ new (...args: any[]): MarkType }>;
  data: any;
  nodes: any; // { [key: string]: NodeType };
  marks: any; // { [key: string]: MarkType };
  cached: { [key: string]: any };
  node(type: string | NodeType, attrs?: { [key: string]: any }, content?: Fragment | Node | Node[], marks?: Mark[]): Node;
  text(text: string, marks?: Mark[]): Node;
  mark(name: string, attrs?: { [key: string]: any }): Mark;
  nodeFromJSON(json: { [key: string]: any }): Node;
  markFromJSON(json: { [key: string]: any }): Mark;
  nodeType(name: string): NodeType;
  parseDOM(dom: DOMNode, options?: { [key: string]: any }): Node;
}

export interface SchemaSpec {
  nodes: { [key: string]: NodeSpec } | OrderedMap<NodeSpec>;
  marks?: { [key: string]: { new (...args: any[]): MarkType } } | OrderedMap<{ new (...args: any[]): MarkType }>;
}

export interface NodeSpec {
  type: { new (...args: any[]): NodeType };
  content?: string;
  group?: string;
}
