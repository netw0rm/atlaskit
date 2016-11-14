import { CodeMark as CodeMarkType, Mark } from 'ak-editor-prosemirror';

export { CodeMarkType };

export interface CodeMark extends Mark {
  type: CodeMarkType;
}

export function isCodeMark(mark: Mark): mark is CodeMark {
  return mark.type instanceof CodeMarkType;
}
