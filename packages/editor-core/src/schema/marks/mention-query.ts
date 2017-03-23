import { akColorB400 } from '@atlaskit/util-shared-styles';
import { style } from 'typestyle';
import { Mark, MarkType, Schema } from '../../prosemirror';

const mentionQueryStyle = style({
  color: akColorB400
});

export class MentionQueryMarkType extends MarkType {
  constructor(name: string, rank: number, schema: Schema) {
    if (name !== 'mention_query') {
      throw new Error('MentionQueryMarkType must be named "mention_query".');
    }
    super(name, rank, schema);
  }

  get inclusiveRight() {
    return true;
  }

  get matchDOMTag() {
    return {
      'span[data-mention-query]': () => ({})
    };
  }

  toDOM(): [string, any] {
    return ['span', {
      'data-mention-query': true,
      'class': mentionQueryStyle
    }];
  }
}

export interface MentionQueryMark extends Mark {
  type: MentionQueryMarkType;
}
