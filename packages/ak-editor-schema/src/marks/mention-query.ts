import { Mark, MarkType } from 'ak-editor-prosemirror';

export class MentionQueryMarkType extends MarkType {
  get inclusiveRight() {
    return true;
  }

  toDOM() { return ['span', { style: /*'background: #e8eaed; border-radius: 20px; padding: 0 5px; */'color: #165ecc', 'data-mention-query': true }]; }
}

export interface MentionQueryMark extends Mark {
  type: MentionQueryMarkType;
}
