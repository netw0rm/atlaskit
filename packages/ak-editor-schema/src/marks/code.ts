import { CodeMark as CodeMarkType, Mark } from 'ak-editor-prosemirror';

export { CodeMarkType };

export interface CodeMark extends Mark {
  type: CodeMarkType;
}