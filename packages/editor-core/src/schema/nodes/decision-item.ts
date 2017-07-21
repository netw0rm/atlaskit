import { Node, NodeSpec } from '../../prosemirror';
import { Inline } from './doc';

/**
 * @name decisionItem_node
 * @additionalProperties false
 */
export interface Definition {
  type: 'decisionItem';
  content: Array<Inline>;
  /**
   * @additionalProperties false
   */
  attrs: {
    localId: string;
    state: string;
  };
}

export const decisionItem: NodeSpec = {
  content: 'inline<_>*',
  attrs: {
    localId: { default: '' },
    state: { default: 'DECIDED' },
  },
  parseDOM: [{
    tag: 'li[data-decision-local-id]',

    // Default priority is 50. We normaly don't change this but since this node type is
    // also used by list-item we need to make sure that we run this parser first.
    priority: 100,

    getAttrs: (dom: Element) => ({
      id: dom.getAttribute('data-decision-local-id')!,
      state: dom.getAttribute('data-decision-state')!,
    })
  }],
  toDOM(node: Node): [string, any, number] {
    const { id, state } = node.attrs;
    const attrs = {
      'data-decision-local-id': id || 'local-decision',
      'data-decision-state': state,
    };
    return ['li', attrs, 0];
  }
};
