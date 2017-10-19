import { Node, NodeSpec } from 'prosemirror-model';
import { uuid } from '../../utils';

/**
 * @name action_node
 */
export interface Definition {
  type: 'action';
  attrs: Attributes;
}

export interface ActionGroupAction {
  text: string;
  target: {
    app?: string;
    key: string;
  };
  parameters?: object;
}

export interface Attributes extends ActionGroupAction {
  localId: string;
}

export const action: NodeSpec = {
  inline: true,
  group: 'inline',
  selectable: false,
  attrs: {
    localId: { compute: uuid.generate },
    text: { default: null },
    target: { default: null },
    parameters: { default: null },
  },
  parseDOM: [{
    tag: 'button[data-action-local-id]',
    getAttrs: (dom: HTMLElement) => ({
      localId: uuid.generate(),
      text: dom.getAttribute('data-action-text')!,
      target: {
        app: dom.getAttribute('data-action-target-app'),
        key: dom.getAttribute('data-action-target-key')!
      }
    })
  }],
  toDOM(node: Node) {
    const { localId, text, target } = node.attrs;
    const attrs = {
      'data-action-local-id': localId || 'local-action',
      'data-action-text': text,
      'data-action-target-app': target && target.app,
      'data-action-target-key': target && target.key
    };
    return ['button', attrs];
  }
};
