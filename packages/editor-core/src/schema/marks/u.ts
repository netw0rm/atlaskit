import { MarkSpec } from '../../prosemirror';

export const u: MarkSpec = {
  inclusive: false,
  parseDOM: [
    { tag: 'u' },
    { style: 'text-decoration', getAttrs: value => value === 'underline' && null }
  ],
  toDOM(): [string] { return ['u']; }
};
