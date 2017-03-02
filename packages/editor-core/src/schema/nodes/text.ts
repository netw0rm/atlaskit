import { NodeSpec } from '../../prosemirror';

export const text: NodeSpec = {
  group: 'inline',
  toDOM(node) {
    return node.text!;
  }
};
