import { OrderedMap } from '../orderedmap';
import { Fragment, Mark, Node, ParseRule } from './';

export class NodeType {
  constructor(name: string, schema: Schema, spec: NodeSpec);
  
  name: string;
  schema: Schema;
  spec: NodeSpec;
  isBlock: boolean;
  isText: boolean;
  isInline: boolean;
  isTextblock: boolean;
  isLeaf: boolean;
  create(attrs?: { [key: string]: any }, content?: Fragment | Node | Node[], marks?: Mark[]): Node;
  createChecked(attrs?: { [key: string]: any }, content?: Fragment | Node | Node[], marks?: Mark[]): Node;
  createAndFill(attrs?: { [key: string]: any }, content?: Fragment | Node | Node[], marks?: Mark[]): Node | null;
  validContent(content: Fragment, attrs?: { [key: string]: any }): boolean;
  compatibleContent(other: NodeType): boolean;
}

export class Block extends NodeType {}

export class Inline extends NodeType {}

export class Text extends Inline {}

export interface Attributes {
  [key: string]: AttributeSpec;
}

export class Attribute {
  constructor(options?: { [key: string]: any });
}

export class MarkType {
  constructor(name: string, rank: number, schema: Schema, spec: MarkSpec); // private

  name: string;
  schema: Schema;
  spec: MarkSpec;
  create(attrs?: { [key: string]: any }): Mark;
  removeFromSet(set: Mark[]): Mark[];
  isInSet(set: Mark[]): Mark | null;
}

export class Schema {
  constructor(spec: SchemaSpec);

  nodeSpec: OrderedMap<NodeSpec>;
  markSpec: OrderedMap<MarkSpec>;
  nodes: any; // { [key: string]: NodeType };
  marks: any; // { [key: string]: MarkType };
  cached: { [key: string]: any };
  node(type: string | NodeType, attrs?: { [key: string]: any }, content?: Fragment | Node | Node[], marks?: Mark[]): Node;
  text(text: string, marks?: Mark[]): Node;
  mark(type: string | MarkType, attrs?: { [key: string]: any }): Mark;
  nodeFromJSON(json: { [key: string]: any }): Node;
  markFromJSON(json: { [key: string]: any }): Mark;
}

export interface AttributeSpec {
  default?: any;
  compute?: () => any;
}

export interface MarkSpec {
  attrs?: { [key: string]: AttributeSpec };
  inclusiveRight?: boolean;
  toDOM?: (mark: Mark) => {};
  parseDOM?: ParseRule[];
}

export interface NodeSpec {
  content?: string;
  group?: string;
  inline?: boolean;
  attrs?: { [key: string]: AttributeSpec };
  selectable?: boolean;
  draggable?: boolean;
  code?: boolean;
  defining?: boolean;
  toDOM?: (_0: Node) => {};
  parseDOM?: ParseRule[];
}

export interface SchemaSpec {
  nodes: { [key: string]: NodeSpec } | OrderedMap<NodeSpec>;
  marks?: { [key: string]: MarkSpec } | OrderedMap<MarkSpec>;
}
