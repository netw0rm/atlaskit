import { Mark, MarkType, Schema } from '../../prosemirror';
import { MarkSpec } from '../../prosemirror/future';

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
      style: 'font-family: monospace; white-space: pre-wrap;',
      class: 'mono'
    }];
  }
}

export const mono: MarkSpec = {
  parseDOM: [
    { tag: 'code' },
    { tag: 'tt' },
    { style: 'font-family', getAttrs: value => value === 'monospace' && null },
    { style: 'white-space', getAttrs: value => value === 'pre' && null }
  ],
  toDOM() {
    return ['span', {
      style: 'font-family: monospace; white-space: pre-wrap;'
    }];
  }
};

export interface MonoMark extends Mark {
  type: MonoMarkType;
}

export function isMonoMark(mark: Mark): mark is MonoMark {
  return mark.type instanceof MonoMarkType;
}
