import {
  Fragment,
  MarkSpec,
  NodeSpec,
  Schema,
} from '../prosemirror';

import {
  getValidDocument,
} from './validator';

export interface Serializer<T> {
  serializeFragment(fragment: Fragment): T | null;
}

export { default as ReactSerializer } from './react';
export { default as TextSerializer } from './text';

export const renderDocument = <T>(doc: any, serializer: Serializer<T>, schema: Schema<NodeSpec, MarkSpec>): T | null => {
  const validDoc = getValidDocument(doc);

  if (!validDoc) {
    return null;
  }

  const node = schema.nodeFromJSON(validDoc);
  return serializer.serializeFragment(node.content);
};
