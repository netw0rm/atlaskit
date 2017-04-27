import { Node, NodeSpec } from '../prosemirror';

export interface NodeDesc extends NodeSpec{
  toText(node: Node): string;
}
