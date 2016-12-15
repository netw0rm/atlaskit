import { Mark, MarkType, Schema } from 'ak-editor-prosemirror';

export class MentionQueryMarkType extends MarkType {
  constructor(name: string, rank: number, schema: Schema) {
    if (name !== 'mention_query') {
      throw new Error("MentionQueryMarkType must be named 'mention_query'.");
    }
    super(name, rank, schema);
  }

  get inclusiveRight() {
    return true;
  }

  toDOM() { return ['span', { 'data-mention-query': true, 'class': 'editor-mention-query-mark' }]; }
}

export interface MentionQueryMark extends Mark {
  type: MentionQueryMarkType;
}
