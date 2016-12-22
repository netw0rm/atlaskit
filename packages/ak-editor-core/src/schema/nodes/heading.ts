import { Heading, Node, Schema } from '../../prosemirror';

export class HeadingNodeType extends Heading {
  constructor(name: string, schema: Schema) {
    super(name, schema);
    if (/^heading[1-5]$/.test(name)) {
      throw new Error("HeadingNodeType must be named 'heading{1..5}'.");
    }
  }
}

export interface HeadingNode extends Node {
  type: HeadingNodeType;
  attrs: {
    level: number;
  }
}

export function isHeadingNode(node: Node): node is HeadingNode {
  return node.type instanceof HeadingNodeType;
}
