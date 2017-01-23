import { NodeSpec } from '../../prosemirror/future';

export const text: NodeSpec = {
  group: 'inline',
  toDOM(node) {
    return node.text!;
  }
};
