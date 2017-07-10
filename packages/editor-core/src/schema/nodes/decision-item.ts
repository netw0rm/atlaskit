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
    getAttrs: (dom: Element) => ({
      id: dom.getAttribute('data-decision-local-id')!,
      state: dom.getAttribute('data-decision-state')!,
    })
  }],
  toDOM(node: Node): [string, any, number] {
    const { id, state } = node.attrs;
    const attrs = {
      'data-decision-local-id': id,
      'data-decision-state': state,
    };
    return ['li', attrs, 0];
  }
};
