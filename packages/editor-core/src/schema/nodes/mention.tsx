import { NodeSpec } from '../../prosemirror';

/**
 * @name mention_node
 */
export interface Definition {
  type: 'mention';
  attrs: {
    id: string;
    text?: string;
    type?: 'DEFAULT' | 'SPECIAL' | 'APP' | 'SYSTEM';
  };
}

export const mention: NodeSpec = {
  inline: true,
  group: 'inline',
  attrs: {
    id: { default: '' },
    text: { default: '' },
    accessLevel: { default: '' }
  },
  parseDOM: [{
    tag: 'span[data-mention-id]',
    getAttrs: (dom: Element) => ({
      id: dom.getAttribute('data-mention-id')!,
      text: dom.textContent!,
      accessLevel: dom.getAttribute('data-access-level')!,
      type: dom.getAttribute('data-mention-type'),
    })
  }],
  toDOM(node: any): [string, any, string] {
    const { id, accessLevel, text, type } = node.attrs;
    const attrs = {
      'data-mention-id': id,
      'data-access-level': accessLevel,
      'data-mention-type': type,
      'contenteditable': 'false',
    };
    return ['span', attrs, text];
  }
};
