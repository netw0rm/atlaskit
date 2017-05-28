import { akColorB400 } from '@atlaskit/util-shared-styles';
import { MarkSpec } from '../../prosemirror';

export const mentionQuery: MarkSpec = {
  inclusive: true,
  parseDOM: [
    { tag: 'span[data-mention-query]' }
  ],
  toDOM(): [string, any] {
    return ['span', {
      'data-mention-query': true,
      style: `color: ${akColorB400}`
    }];
  }
};
