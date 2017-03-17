import { akColorB400 } from '@atlaskit/util-shared-styles';
import { style } from 'typestyle';
import { MarkSpec } from '../../prosemirror';

const mentionQueryStyle = style({
  color: akColorB400
});

export const mentionQuery: MarkSpec = {
  inclusiveRight: false,
  inclusiveLeft: false,
  parseDOM: [
    {tag: 'span[data-mention-query]'}
  ],
  toDOM(): [string, any] {
    return ['span', {
      'data-mention-query': true,
      'class': mentionQueryStyle
    }];
  }
};
