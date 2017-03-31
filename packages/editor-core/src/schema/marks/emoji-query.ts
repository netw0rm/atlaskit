import { akColorB400 } from '@atlaskit/util-shared-styles';
import { style } from 'typestyle';
import { MarkSpec } from '../../prosemirror';

const emojiQueryStyle = style({
  color: akColorB400
});

export const emojiQuery: MarkSpec = {
  inclusive: true,
  parseDOM: [
    { tag: 'span[data-emoji-id]' }
  ],
  toDOM(): [string, any] {
    return ['span', {
      'data-emoji-query': true,
      'class': emojiQueryStyle
    }];
  }
};
