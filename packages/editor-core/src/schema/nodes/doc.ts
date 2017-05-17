import { NodeSpec, nodes } from '../../prosemirror';

export const doc: NodeSpec = nodes.doc;

export const docCompact: NodeSpec = {
  ...nodes.doc,
  content: 'paragraph mediaGroup?'
};
