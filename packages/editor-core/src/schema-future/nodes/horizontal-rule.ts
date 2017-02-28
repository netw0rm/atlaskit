import { NodeSpec, HorizontalRule, Node, Schema } from '../../prosemirror/future';

export class HorizontalRuleNodeType extends HorizontalRule {
  constructor(name: string, schema: Schema) {
    super(name, schema, horizontalRule);
    if (name !== 'horizontal_rule') {
      throw new Error('HorizontalRuleNodeType must be named "horizontal_rule".');
    }
  }
}

export interface HorizontalRuleNode extends Node {
  type: HorizontalRuleNodeType;
}

export function isHorizontalRuleNode(node: Node): node is HorizontalRuleNode {
  return node.type instanceof HorizontalRuleNodeType;
}

export const horizontalRule: NodeSpec = {
  group: 'block',
  parseDOM: [{ tag: 'hr' }],
  toDOM() { return ['hr']; }
};
