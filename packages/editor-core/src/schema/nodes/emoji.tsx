import { akColorN50 } from '@atlaskit/util-shared-styles';
import { style } from 'typestyle';
import { NodeSpec } from '../../prosemirror';

const emojiStyle = style({
  display: 'inline-block',
  userSelect: 'all',

  $nest: {
    '&.ProseMirror-selectednode': {
      backgroundColor: akColorN50,
      outline: 'none'
    },
  }
});

export const emoji: NodeSpec = {
  inline: true,
  group: 'inline',
  attrs: {
    shortName: { default: '' },
    id: { default: '' },
    text: { default: '' },
  },
  parseDOM: [{
    tag: 'span[data-emoji-short-name]',
    getAttrs: (dom: Element) => ({
      shortName: dom.getAttribute('data-emoji-short-name')!,
      id: dom.getAttribute('data-emoji-id')!,
      text: dom.getAttribute('data-emoji-text')!,
    })
  }],
  toDOM(node: any): [string, any, string] {
    const { shortName, id, text } = node.attrs;
    const attrs = {
      'class': emojiStyle,
      'data-emoji-short-name': shortName,
      'data-emoji-id': id,
      'data-emoji-text': text,
      'contenteditable': 'false',
    };
    // Don't render any text as it will be replaced quite quickly by
    // the placeholder in ResourcedEmoji
    return ['span', attrs, ' '];
  }
};
