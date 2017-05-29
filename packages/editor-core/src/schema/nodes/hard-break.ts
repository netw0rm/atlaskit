import { NodeSpec } from '../../prosemirror';

export const hardBreak: NodeSpec = {
  inline: true,
  group: 'inline',
  selectable: false,
  parseDOM: [{ tag: 'br' }],
  toDOM() { return ['br']; }
};
