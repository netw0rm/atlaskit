import { NodeSpec } from '../../prosemirror';

export const listItem: NodeSpec = {
  group: 'block',
  content: 'paragraph block*',
  parseDOM: [{ tag: 'li' }],
  toDOM() {
    return ['li', 0];
  }
};
