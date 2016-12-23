import { Heading, Node, Schema } from '../../prosemirror';

export class HeadingNodeType extends Heading {
  constructor(name: string, schema: Schema) {
    super(name, schema);
    if (name !== 'heading') {
      throw new Error("HeadingNodeType must be named 'heading'.");
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
