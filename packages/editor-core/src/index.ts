export {
  EmojiProvider,
  EmojiResource,
} from '@atlaskit/emoji';

export {
  DefaultMediaStateManager,
  MediaProvider,
  MediaState,
} from '@atlaskit/media-core';

export {
  AbstractMentionResource,
  MentionProvider,
  MentionResource,
  PresenceProvider,
  PresenceResource,
} from '@atlaskit/mention';

import ProviderFactory from './providerFactory';
export { version, name } from './version';
export * from './config';
export * from './plugins';
export * from './schema';
export * from './ui';
export * from './analytics';
export * from './nodeviews';
export * from './renderer';
export { ProviderFactory };
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
  tableNodes,
  CellSelection,
  tableEditing,
  Selection,
  undo,
  redo,
  PluginKey,
} from './prosemirror';
export {
  ErrorReporter,
  ErrorReportingHandler,
  toJSON,
} from './utils';
export { colorPalette } from './schema/marks/text-color';
