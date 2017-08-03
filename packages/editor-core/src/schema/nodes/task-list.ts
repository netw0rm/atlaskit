import { Node, NodeSpec } from '../../prosemirror';
import { Definition as TaskItemNode } from './task-item';
import uuid from '../../plugins/tasks-and-decisions/uuid';

/**
 * @name taskList_node
 * @additionalProperties false
 */
export interface Definition {
  type: 'taskList';
  /**
   * @minItems 1
   */
  content: Array<TaskItemNode>;
  /**
   * @additionalProperties false
   */
  attrs: {
    localId: string;
  };
}

export const taskList: NodeSpec = {
  group: 'block',
  content: 'taskItem+',
  attrs: {
    localId: { compute: uuid.generate },
  },
  parseDOM: [{
    tag: 'ol[data-task-list-local-id]',

    // Default priority is 50. We normaly don't change this but since this node type is
    // also used by ordered-list we need to make sure that we run this parser first.
    priority: 100,

    getAttrs: (dom: Element) => ({
      localId: uuid.generate(),
    })
  }],
  toDOM(node: Node) {
    const { localId } = node.attrs;
    const attrs = {
      'data-task-list-local-id': localId || 'local-task-list',
      'style': 'list-style: none; padding-left: 0'
    };

    return ['ol', attrs,  0];
  }
};
