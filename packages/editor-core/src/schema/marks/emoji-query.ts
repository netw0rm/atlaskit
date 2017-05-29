import { akColorB400 } from '@atlaskit/util-shared-styles';
import { MarkSpec } from '../../prosemirror';

export const emojiQuery: MarkSpec = {
  inclusive: true,
  parseDOM: [
    { tag: 'span[data-emoji-query]' }
  ],
  toDOM(): [string, any] {
    return ['span', {
      'data-emoji-query': true,
      style: `color: ${akColorB400}`
    }];
  }
};
