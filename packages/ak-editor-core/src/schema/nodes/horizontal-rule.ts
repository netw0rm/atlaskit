import { HorizontalRule, Node, Schema } from '../../prosemirror';

export class HorizontalRuleNodeType extends HorizontalRule {
  constructor(name: string, schema: Schema) {
    super(name, schema);
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
