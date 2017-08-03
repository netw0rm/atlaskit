import { Node } from '../prosemirror';

export interface Transformer<T> {
  encode(node: Node): T;
  parse(content: T): Node;
}
