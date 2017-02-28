import { Heading, Node, Schema, NodeSpec } from '../../prosemirror/future';

export class HeadingNodeType extends Heading {
  constructor(name: string, schema: Schema) {
    super(name, schema, heading);
    if (name !== 'heading') {
      throw new Error('HeadingNodeType must be named "heading".');
    }
  }
}

export interface HeadingNode extends Node {
  type: HeadingNodeType;
  attrs: {
    level: number;
  };
}

export function isHeadingNode(node: Node): node is HeadingNode {
  return node.type instanceof HeadingNodeType;
}

export const heading: NodeSpec = {
  attrs: { level: { default: 1 } },
  content: 'inline<_>*',
  group: 'block',
  defining: true,
  parseDOM: [
    { tag: 'h1', attrs: { level: 1 } },
    { tag: 'h2', attrs: { level: 2 } },
    { tag: 'h3', attrs: { level: 3 } },
    { tag: 'h4', attrs: { level: 4 } },
    { tag: 'h5', attrs: { level: 5 } }
  ],
  toDOM(node) { return ['h' + node.attrs['level'], 0]; }
};
