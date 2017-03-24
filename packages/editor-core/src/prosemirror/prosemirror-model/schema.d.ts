import { OrderedMap } from '../orderedmap';
import { Fragment, Mark, Node, ParseRule } from './';

export class NodeType {
  name: string;
  schema: Schema<any, any>;
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

export class MarkType {
  name: string;
  schema: Schema<any, any>;
  spec: MarkSpec;
  create(attrs?: { [key: string]: any }): Mark;
  removeFromSet(set: Mark[]): Mark[];
  isInSet(set: Mark[]): Mark | null;
  isCode: boolean;
}

export class Schema<N, M> {
  constructor(spec: SchemaSpec<N, M>);

  nodeSpec: OrderedMap<NodeSpec>;
  markSpec: OrderedMap<MarkSpec>;
  nodes: { [K in keyof N]: NodeType };
  marks: { [K in keyof M]: MarkType };
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
  excludes?: string;
  attrs?: { [key: string]: AttributeSpec };
  inclusive?: boolean;
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

export interface SchemaSpec<N, M> {
  nodes: { [K in keyof N]: NodeSpec } | OrderedMap<NodeSpec>;
  marks?: { [K in keyof M]: MarkSpec } | OrderedMap<MarkSpec>;
}
