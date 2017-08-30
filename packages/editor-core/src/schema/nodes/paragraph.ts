import { NodeSpec, nodes } from '../../prosemirror';
import { Inline } from './doc';

/**
 * @name paragraph_node
 */
export interface Definition {
  type: 'paragraph';
  content: Array<Inline>;
}

export const paragraph: NodeSpec = nodes.paragraph;
