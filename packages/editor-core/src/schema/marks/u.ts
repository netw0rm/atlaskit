import { MarkSpec } from '../../prosemirror';

export const u: MarkSpec = {
  inclusive: true,
  parseDOM: [
    { tag: 'u' },
    { style: 'text-decoration', getAttrs: value => value === 'underline' && null }
  ],
  toDOM(): [string] { return ['u']; }
};
