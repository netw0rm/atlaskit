import { NodeSpec } from '../../prosemirror';
import { TopLevel } from './doc';

/**
 * @name blockquote_node
 */
export interface Definition {
  type: 'blockquote';
  content: TopLevel;
}

export const blockquote: NodeSpec = {
  content: 'paragraph+',
  group: 'block',
  defining: true,
  selectable: false,
  parseDOM: [{ tag: 'blockquote' }],
  toDOM() { return ['blockquote', 0]; }
};
