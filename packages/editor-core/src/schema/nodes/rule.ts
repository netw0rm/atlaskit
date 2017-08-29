import { NodeSpec, nodes } from '../../prosemirror';

/**
 * @name rule_node
 */
export interface Definition {
  type: 'rule';
}

export const rule: NodeSpec = nodes.horizontal_rule;
