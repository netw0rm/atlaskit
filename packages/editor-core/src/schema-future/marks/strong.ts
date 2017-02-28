import {
  Mark,
  Schema,
  StrongMark as BaseStrongMark,
  MarkSpec
} from '../../prosemirror/future';

export class StrongMarkType extends BaseStrongMark {
  constructor(name: string, rank: number, schema: Schema) {
    if (name !== 'strong') {
      throw new Error('StrongMarkType must be named "strong".');
    }
    super(name, rank, schema, strong);
  }
}

export const strong: MarkSpec = {
  parseDOM: [
    { tag: 'strong' },
    { tag: 'b', getAttrs: node => (node as any).style.fontWeight !== 'normal' && null },
    { style: 'font-weight', getAttrs: value => /^(bold(er)?|[5-9]\d{2,})$/.test(value as string) && null }
  ],
  toDOM() { return ['strong']; }
};

export interface StrongMark extends Mark {
  type: StrongMarkType;
}

export function isStrongMark(mark: Mark): mark is StrongMark {
  return mark.type instanceof StrongMarkType;
}
