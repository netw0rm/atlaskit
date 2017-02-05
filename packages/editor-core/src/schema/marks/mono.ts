import { Mark, MarkType, Schema } from '../../prosemirror';

export class MonoMarkType extends MarkType {
  constructor(name: string, rank: number, schema: Schema) {
    if (name !== 'mono') {
      throw new Error('MonoMarkType must be named "mono".');
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
      style: 'font-family: monospace; white-space: pre-wrap; background: #f5f5f5; border: 1px solid #ccc; border-radius: 3px; padding: 1px 3px;'
    }];
  }
}

export interface MonoMark extends Mark {
  type: MonoMarkType;
}

export function isMonoMark(mark: Mark): mark is MonoMark {
  return mark.type instanceof MonoMarkType;
}
