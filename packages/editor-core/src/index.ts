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
  Fragment,
  Node,
  Mark,
  Slice,
  Schema,
  NodeType,
  MarkType,
  browser,
  EditorView,
  Plugin
} from './prosemirror';
