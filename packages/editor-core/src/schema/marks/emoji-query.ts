import { akColorB400 } from '@atlaskit/util-shared-styles';
import { style } from 'typestyle';
import { MarkSpec } from '../../prosemirror';

const emojiQueryStyle = style({
  color: akColorB400
});

export const emojiQuery: MarkSpec = {
  inclusiveRight: false,
  inclusiveLeft: false,
  parseDOM: [
    {tag: 'span[data-emoji-id]', getAttrs: (dom: Element) => {
      return {id: dom.getAttribute('data-emoji-id')!};
    }}
  ],
  toDOM(): [string, any] {
    return ['span', {
      'data-emoji-query': true,
      'class': emojiQueryStyle
    }];
  }
};
