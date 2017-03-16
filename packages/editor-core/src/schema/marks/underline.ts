import { MarkSpec } from '../../prosemirror';

export const underline: MarkSpec = {
  inclusiveRight: false,
  inclusiveLeft: false,
  parseDOM: [
    { tag: 'u' },
    { style: 'text-decoration', getAttrs: value => value === 'underline' && null }
  ],
  toDOM(): [string] { return ['u']; }
};
