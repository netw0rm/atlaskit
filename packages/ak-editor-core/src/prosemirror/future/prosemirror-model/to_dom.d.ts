import { ContentMatch, Fragment, Mark, MarkType, Node, NodeType, ResolvedPos, Schema, Slice } from './';
import * as dom from '../../dom';

export class DOMSerializer {
  constructor(nodes: { [key: string]: (node: Node) => DOMOutputSpec }, marks: { [key: string]: (mark: Mark) => DOMOutputSpec });

  nodes: { [key: string]: (node: Node) => DOMOutputSpec };
  marks: { [key: string]: (mark: Mark) => DOMOutputSpec };
  serializeFragment(fragment: Fragment, options?: { [key: string]: any }): dom.DocumentFragment;
  serializeNode(node: Node, options?: { [key: string]: any }): dom.Node;

  static renderSpec(doc: dom.Document, structure: DOMOutputSpec): { dom: dom.Node, contentDOM?: dom.Node };
  static fromSchema(schema: Schema<any, any>): DOMSerializer;
  static nodesFromSchema(schema: Schema<any, any>): { [key: string]: (node: Node) => DOMOutputSpec };
  static marksFromSchema(schema: Schema<any, any>): { [key: string]: (mark: Mark) => DOMOutputSpec };
}

export type DOMOutputSpec = string
  | dom.Node
  // These could go indefinitely, but for the sake of typing we restrict it to four siblings.
  | [string]
  | [string, any]
  | [string, any, any]
  | [string, any, any, any]
  | [string, any, any, any, any];
