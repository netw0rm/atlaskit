import { Node } from '../prosemirror';

export interface Serializer<T> {
  serializeNode(node: Node): T | null;
}
