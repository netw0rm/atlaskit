import { NodeSpec } from '../../prosemirror';

export const emoji: NodeSpec = {
  inline: true,
  group: 'inline',
  attrs: {
    shortName: { default: '' },
    id: { default: '' },
    text: { default: '' },
  },
  parseDOM: [{
    tag: 'span.emoji-node',
    getAttrs: (dom: Element) => ({
      shortName: dom.getAttribute('data-emoji-short-name'),
      id: dom.getAttribute('data-emoji-id')!,
      text: dom.getAttribute('data-emoji-text'),
    })
  }],
  toDOM(node: any): [string, any, string] {
    const attrs = {
      'class': 'emoji-node',
      'data-emoji-id': node.attrs.id,
      'contenteditable': 'false',
    };

    // If we are representing a natively entered emoji which hasn't yet been resolved then
    // we won't have all the attributes we need for a 'proper' emoji. This is indicated by
    // a missing/null shortName.
    if (node.attrs.shortName) {
      attrs['data-emoji-short-name'] = node.attrs.shortName;
    }

    if (node.attrs.text) {
      attrs['data-emoji-text'] = node.attrs.text;
    }

    // Don't render any content as the EmojiNode NodeView will take care of display
    return ['span', attrs, ' '];
  }
};
