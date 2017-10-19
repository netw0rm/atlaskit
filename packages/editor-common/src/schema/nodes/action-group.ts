import { NodeSpec, Node } from 'prosemirror-model';
import { Definition as ActionNode } from './action';
import { uuid } from '../../utils';

/**
 * @name actionGroup_node
 */
export interface Definition {
  type: 'actionGroup';
  /**
   * @minItems 1
   */
  content: Array<ActionNode>;
  attrs: Attributes;
}

export interface Attributes {
  localId: string;
}

export const actionGroup: NodeSpec = {
  group: 'block',
  content: 'action+',
  attrs: {
    localId: { compute: uuid.generate },
  },
  parseDOM: [{
    tag: 'p[data-action-group-local-id]',

    // Default priority is 50. We normaly don't change this but since this node type is
    // also used by paragraph we need to make sure that we run this parser first.
    priority: 100,

    getAttrs: (dom: Element) => ({
      localId: uuid.generate(),
    })
  }],
  toDOM(node: Node) {
    const { localId } = node.attrs;
    const attrs = {
      'data-action-group-local-id': localId || 'local-action-group'
    };

    return ['p', attrs,  0];
  }
};
