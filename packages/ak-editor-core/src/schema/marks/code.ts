import { CodeMark as BaseCodeMark, Mark } from '../../prosemirror';

export class CodeMarkType extends BaseCodeMark {
  get inclusiveRight() {
    return false;
  }
}

export interface CodeMark extends Mark {
  type: CodeMarkType;
}

export function isCodeMark(mark: Mark): mark is CodeMark {
  return mark.type instanceof CodeMarkType;
}
