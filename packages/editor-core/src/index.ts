export { version, name } from './version';
export { default as Keymap } from 'browserkeymap';
export * from './config';
export * from './media';
export * from './plugins';
export * from './prosemirror';
export * from './schema';
// Override the exports from ProseMirror that already use these names.
export { EmMark, LinkMark, StrongMark } from './schema';
export * from './ui';
export * from './analytics';

export type ContextName = 'default';
