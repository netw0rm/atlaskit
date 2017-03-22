import { MarkSpec } from '../../prosemirror';

export const strike: MarkSpec = {
  inclusive: true,
  parseDOM: [
    { tag: 'strike' },
    { tag: 's' },
    { style: 'text-decoration', getAttrs: value => value === 'line-through' && null }
  ],
  toDOM(): [string]  { return ['s']; }
};
