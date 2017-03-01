import { NodeSpec } from '../../prosemirror';

export const bulletList: NodeSpec = {
  group: 'block',
  content: 'list_item+',
  parseDOM: [{ tag: 'ul' }],
  toDOM() {
    return ['ul', 0];
  }
};
