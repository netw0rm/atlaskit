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
  parseDOM: [{
    tag: 'ol[data-decision-list]',

    // Default priority is 50. We normaly don't change this but since this node type is
    // also used by ordered-list we need to make sure that we run this parser first.
    priority: 100,
  }],
  toDOM() {
    const attrs = {
      'data-decision-list': 'true',
      'style': 'list-style: none; padding-left: 0'
    };

    return ['ol', attrs,  0];
  }
};
