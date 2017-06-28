import { akColorB400 } from '@atlaskit/util-shared-styles';
import { MarkSpec } from '../../prosemirror';
import { SEARCH_QUERY } from '../groups';

export const mentionQuery: MarkSpec = {
  inclusive: true,
  group: SEARCH_QUERY,
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
