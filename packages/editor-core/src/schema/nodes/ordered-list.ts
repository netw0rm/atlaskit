import { NodeSpec } from '../../prosemirror';

export const orderedList: NodeSpec = {
  group: 'block',
  content: 'list_item+',
  parseDOM: [{ tag: 'ol' }],
  toDOM() {
    return ['ol', 0];
  }
};
