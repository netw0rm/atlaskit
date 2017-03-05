import { akColorB400 } from '@atlaskit/util-shared-styles';
import { style } from 'typestyle';
import { Mark, MarkType, Schema } from '../../prosemirror';

const emojiQueryStyle = style({
  color: akColorB400
});

export class EmojiQueryMarkType extends MarkType {
  constructor(name: string, rank: number, schema: Schema) {
    if (name !== 'emoji_query') {
      throw new Error('EmojiQueryMarkType must be named "emoji_query".');
    }
    super(name, rank, schema);
  }

  get inclusiveRight() {
    return true;
  }

  toDOM(): [string, any] {
    return ['span', {
      'data-emoji-query': true,
      'class': emojiQueryStyle
    }];
  }
}

export interface EmojiQueryMark extends Mark {
  type: EmojiQueryMarkType;
}
