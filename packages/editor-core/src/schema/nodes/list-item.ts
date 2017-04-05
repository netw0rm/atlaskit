import { NodeSpec } from '../../prosemirror';
import { style } from 'typestyle';

const listStyle = style({
  $nest: {
    '> p:not(:first-child)': {
      margin: '4px 0 0 0',
    },
  }
});

export const listItem: NodeSpec = {
  content: 'paragraph block*',
  parseDOM: [{ tag: 'li' }],
  toDOM() {
    return ['li', { class: listStyle }, 0];
  }
};
