export { version, name } from './version';
export { default as Keymap } from 'browserkeymap';
export * from './config';
export * from './media';
export * from './plugins';
export * from './schema';
export * from './ui';
export * from './analytics';
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
  NodeType,
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
