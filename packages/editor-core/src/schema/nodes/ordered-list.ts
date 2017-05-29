import { NodeSpec } from '../../prosemirror';

export const orderedList: NodeSpec = {
  group: 'block',
  content: 'listItem+',
  parseDOM: [{ tag: 'ol' }],
  toDOM() {
    return ['ol', 0];
  }
};
