import * as base64fileconverter from './base64fileconverter';
export { base64fileconverter };
// export { default as sendKeyToPm } from './send-key-to-pm';
export { default as chaiPlugin } from './chai';
export { default as createEvent } from './create-event';
export { default as dispatchPasteEvent } from './dispatch-paste-event';
// export { default as SyncPlugin } from './sync-plugin';
export { default as makeEditor } from './make-editor';
export { default as fixtures } from './fixtures';
export {
  doc, p, blockquote, code_block,
  h1, h2, h3, h4, h5, h6,
  li, ul, ol, br, img, hr, em, strong, mono, a,
  strike, text, fragment, slice, mention, emoji,
  nodeFactory, markFactory, BuilderContent, coerce, offsetRefs
} from './schema-builder';
export * from './html-helpers';
export { default as storyDecorator } from './story-decorator';

/**
 * Insert nodes at the current selection.
 *
 * @returns refs from the inserted nodes, made relative to the document
 *   insertion position
 */
/*
export const insert = (pm: ProseMirror, ...content: BuilderContent[]) => {
  const { from, to } = pm.selection;
  const { nodes, refs } = coerce(content, pm.schema);
  pm.tr.replaceWith(from, to, nodes).apply();
  return offsetRefs(refs, from);
};
*/
