import {
  akColorN30,
  akColorN50,
  akColorN500
} from '@atlaskit/util-shared-styles';
import { style } from 'typestyle';
import { NodeSpec } from '../../prosemirror';

const mentionStyle = style({
  background: akColorN30,
  borderRadius: '20px',
  color: akColorN500,
  padding: '0 4px 2px 3px',
  userSelect: 'all',
  whiteSpace: 'nowrap',

  $nest: {
    '&.ProseMirror-selectednode': {
      background: akColorN50,
      outline: 'none'
    }
  }
});

export const mention: NodeSpec = {
  inline: true,
  group: 'inline',
  attrs: {
    id: { default: '' },
    text: { default: '' }
  },
  parseDOM: [{
    tag: 'span[mention-id]',
    getAttrs: (dom: Element) => ({
      id: dom.getAttribute('mention-id')!,
      text: dom.textContent!
    })
  }],
  toDOM(node: any): [string, any, string] {
    const attrs = {
      'class': mentionStyle,
      'mention-id': node.attrs.id,
      'contenteditable': 'false',
    };
    return ['span', attrs, node.attrs.text];
  }
};
