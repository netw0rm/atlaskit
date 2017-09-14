import {
  MarkSpec,
  NodeSpec,
  Schema,
} from '../prosemirror';

import {
  getValidDocument,
} from './validator';

import { Serializer } from './serializer';
import { defaultSchema } from '../schema';

export { default as ReactSerializer } from './react';
export { default as TextSerializer } from './text';
export { default as JSONSerializer } from './json';
export { default as ReactRenderer } from '../ui/Renderer';
export { RendererContext } from './react';

export interface RenderOutput<T> {
  result: T;
  stat: RenderOutputStat;
}

export interface RenderOutputStat {
  buildTreeTime?: number;
  sanitizeTime: number;
  serializeTime?: number;
}

export const renderDocument = <T>(doc: any, serializer: Serializer<T>, schema: Schema<NodeSpec, MarkSpec> = defaultSchema): RenderOutput<T | null> => {
  const stat: RenderOutputStat = { sanitizeTime: 0 };

  let startTime = Date.now();
  const validDoc = getValidDocument(doc, schema);
  stat.sanitizeTime = Date.now() - startTime;

  if (!validDoc) {
    return { stat, result: null };
  }

  startTime = Date.now();
  const node = schema.nodeFromJSON(validDoc);
  stat.buildTreeTime = Date.now() - startTime;

  startTime = Date.now();
  const result = serializer.serializeFragment(node.content);
  stat.serializeTime = Date.now() - startTime;

  return { result, stat };
};

export { Serializer };
