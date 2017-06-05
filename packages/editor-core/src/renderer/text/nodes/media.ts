import { Node as PMNode } from '../../../prosemirror';

export default function nodeToText(node: PMNode): string {
  return `media attachment (${node.attrs.id} in collection ${node.attrs.collection})`;
}
