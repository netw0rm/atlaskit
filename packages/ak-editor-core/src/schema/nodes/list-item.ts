import { NodeSpec } from '../../prosemirror/future';

// tslint:disable-next-line:variable-name
export const list_item: NodeSpec = {
  content: 'paragraph block+',
  parseDOM: [
    {
      tag: 'li'
    }
  ],
  toDOM() {
    return ['li', 0];
  },
  defining: true
};
