import {
  Mark,
  Schema,
  CodeMark as BaseCodeMark
} from '../../prosemirror';

export class CodeMarkType extends BaseCodeMark {
  constructor(name: string, rank: number, schema: Schema) {
    if (name !== 'code') {
      throw new Error('CodeMarkType must be named "code".');
    }
    super(name, rank, schema);
  }

  get isCode() {
    return true;
  }

  get matchDOMTag() {
    return {
      code: null,
      tt: null
    };
  }

  get matchDOMStyle() {
    return {
      'font-family': (value: string) => value === 'monospace' ? null : false,
      'white-space': (value: string) => value === 'pre' ? null : false
    };
  }

  toDOM(): [string, any] {
    return ['span', {
      style: 'font-family: monospace; white-space: pre-wrap;',
      class: 'code'
    }];
  }
}

export interface CodeMark extends Mark {
  type: CodeMarkType;
}

export function isCodeMark(mark: Mark): mark is CodeMark {
  return mark.type instanceof CodeMarkType;
}
