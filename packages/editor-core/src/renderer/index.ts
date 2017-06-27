import {
  MarkSpec,
  NodeSpec,
  Schema,
} from '../prosemirror';

import {
  getValidDocument,
} from './validator';

import { Serializer } from './serializer';

export { default as ReactSerializer } from './react';
export { default as TextSerializer } from './text';
export { default as JSONSerializer } from './json';
export { MarkdownSerializer } from './markdown';

export const renderDocument = <T>(doc: any, serializer: Serializer<T>, schema: Schema<NodeSpec, MarkSpec>): T | null => {
  const validDoc = getValidDocument(doc);

  if (!validDoc) {
    return null;
  }

  const node = schema.nodeFromJSON(validDoc);
  return serializer.serializeFragment(node.content);
};

export { Serializer };
