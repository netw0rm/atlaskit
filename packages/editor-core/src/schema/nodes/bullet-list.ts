import { NodeSpec } from '../../prosemirror';

export const bulletList: NodeSpec = {
  group: 'block',
  content: 'listItem+',
  parseDOM: [{ tag: 'ul' }],
  toDOM() {
    return ['ul', 0];
  }
};
