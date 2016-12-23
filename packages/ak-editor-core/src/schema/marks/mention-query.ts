import { style } from 'typestyle';
import { akColorB400 } from 'akutil-shared-styles';
import { Mark, MarkType, Schema } from '../../prosemirror';

const mentionQuery = style({
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

  toDOM() { return ['span', { 'data-mention-query': true, 'class': `${mentionQuery}` }]; }
}

export interface MentionQueryMark extends Mark {
  type: MentionQueryMarkType;
}
