import { NodeSpec } from '../../prosemirror';

export const listItem: NodeSpec = {
  content: 'block+',
  parseDOM: [{ tag: 'li' }],
  toDOM() {
    return ['li', 0];
  }
};
