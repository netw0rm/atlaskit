import { NodeSpec, HardBreak, Node, Schema } from '../../prosemirror/future';

export class HardBreakNodeType extends HardBreak {
  constructor(name: string, schema: Schema) {
    super(name, schema, hardBreak);
    if (name !== 'hard_break') {
      throw new Error('HardBreakNodeType must be named "hard_break".');
    }
  }
}

export interface HardBreakNode extends Node {
  type: HardBreakNodeType;
}

export function isHardBreakNode(node: Node): node is HardBreakNode {
  return node.type instanceof HardBreakNodeType;
}

export const hardBreak: NodeSpec = {
  inline: true,
  group: 'inline',
  selectable: false,
  parseDOM: [{ tag: 'br' }],
  toDOM() { return ['br']; }
};
