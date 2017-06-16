import { NodeSpec } from '../../prosemirror';

export const mention: NodeSpec = {
  inline: true,
  group: 'inline',
  attrs: {
    id: { default: '' },
    text: { default: '' },
    accessLevel: { default: '' }
  },
  parseDOM: [{
    tag: 'span[mention-id]',
    getAttrs: (dom: Element) => ({
      id: dom.getAttribute('mention-id')!,
      text: dom.textContent!,
      accessLevel: dom.getAttribute('access-level')!
    })
  }],
  toDOM(node: any): [string, any, string] {
    const attrs = {
      'mention-id': node.attrs.id,
      'access-level': node.attrs.accessLevel,
      'contenteditable': 'false',
    };
    return ['span', attrs, node.attrs.text];
  }
};
