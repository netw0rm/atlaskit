import * as dom from '../dom';
import { ContentMatch, Fragment, Mark, MarkType, Node, NodeType, ResolvedPos, Schema, Slice } from './';

export class DOMSerializer {
  constructor(nodes: { [key: string]: (node: Node) => {} }, marks: { [key: string]: (mark: Mark) => {} });

  nodes: { [key: string]: (node: Node) => {} };
  marks: { [key: string]: (mark: Mark) => {} };
  serializeFragment(fragment: Fragment, options?: { [key: string]: any }): dom.DocumentFragment;
  serializeNode(node: Node, options?: { [key: string]: any }): dom.Node;

  static renderSpec(doc: dom.Document, structure: {}): { dom: dom.Node, contentDOM?: dom.Node };
  static fromSchema(schema: Schema<any, any>): DOMSerializer;
  static nodesFromSchema(schema: Schema<any, any>): { [key: string]: (node: Node) => {} };
  static marksFromSchema(schema: Schema<any, any>): { [key: string]: (mark: Mark) => {} };
}

