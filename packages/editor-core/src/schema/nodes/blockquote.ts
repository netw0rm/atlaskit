import { NodeSpec } from '../../prosemirror';

export const blockquote: NodeSpec = {
  content: 'block+',
  group: 'block',
  defining: true,
  selectable: false,
  parseDOM: [{ tag: 'blockquote' }],
  toDOM() { return ['blockquote', 0]; }
};
