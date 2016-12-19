import { HorizontalRule as HorizontalRuleNodeType, Node } from '../../prosemirror';

export { HorizontalRuleNodeType };

export interface HorizontalRuleNode extends Node {
  type: HorizontalRuleNodeType;
}

export function isHorizontalRuleNode(node: Node): node is HorizontalRuleNode {
  return node.type instanceof HorizontalRuleNodeType;
}
