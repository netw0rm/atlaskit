import { NodeSpec } from '../../prosemirror';

export const panelText: NodeSpec = {
  content: 'block+',
  group: 'block',
  defining: true,
  selectable: false,
  parseDOM: [{ tag: 'span' }],
  toDOM() { return ['span', 0]; }
};
