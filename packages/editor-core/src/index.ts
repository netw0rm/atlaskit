export {
  DefaultMediaStateManager,
  MediaProvider,
  MediaState,
} from '@atlaskit/media-core';

import ProviderFactory from './providerFactory';
export { version, name } from './version';
export { default as Keymap } from 'browserkeymap';
export * from './config';
export * from './plugins';
export * from './schema';
export * from './ui';
export * from './analytics';
export { ProviderFactory };
export type ContextName = 'default';
export {
  dom,
  NodeSpec,
  MarkSpec,
  DOMSerializer,
  DOMParser,
  MarkdownSerializer,
  MarkdownSerializerState,
  Fragment,
  Node,
  Mark,
  Slice,
  Schema,
  NodeSelection,
  NodeType,
  NodeView,
  MarkType,
  browser,
  EditorView,
  EditorState,
  TextSelection,
  Plugin,
  history,
  baseKeymap,
  keymap,
} from './prosemirror';
export { nodeViewFactory, toJSON } from './utils';
