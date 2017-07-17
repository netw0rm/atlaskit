import { NodeSpec } from '../../prosemirror';
import { Definition as DecisionItemNode } from './decision-item';

/**
 * @name decisionList_node
 * @additionalProperties false
 */
export interface Definition {
  type: 'decisionList';
  /**
   * @minItems 1
   */
  content: Array<DecisionItemNode>;
}

export const decisionList: NodeSpec = {
  group: 'block',
  content: 'decisionItem+',
  parseDOM: [{ tag: 'ol' }],
  toDOM() {
    return ['ol', { 'style': 'list-style: none; padding-left: 0;' },  0];
  }
};
