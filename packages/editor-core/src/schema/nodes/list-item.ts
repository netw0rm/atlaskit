import { NodeSpec } from '../../prosemirror';
import { TopLevel } from './doc';

/**
 * @name listItem_node
 * @additionalProperties false
 */
export interface Definition {
  type: 'listItem';
  content: TopLevel;
}

export const listItem: NodeSpec = {
  content: 'paragraph (paragraph | bulletList | orderedList)*',
  parseDOM: [{ tag: 'li' }],
  toDOM() {
    return ['li', 0];
  }
};
